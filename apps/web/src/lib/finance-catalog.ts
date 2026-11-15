import type { CatalogProduct } from "@/lib/catalog-format";

export type { CatalogProduct };

export type CatalogLoad = {
  ok: boolean;
  products: CatalogProduct[];
};

const financeOrigin = new URL(process.env.MAKNA_FINANCE_URL ?? "https://maknafinance.id").origin;

export async function financeCatalog(): Promise<CatalogLoad> {
  const endpoint = new URL("/api/catalog/products", financeOrigin);
  try {
    const response = await fetch(endpoint, {
      headers: { accept: "application/json" },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return { ok: false, products: [] };
    const body = await response.json() as { products?: unknown };
    if (!Array.isArray(body.products)) return { ok: false, products: [] };
    const products = body.products.flatMap((entry) => {
      const product = parseProduct(entry);
      return product ? [product] : [];
    }).slice(0, 100);
    if (body.products.length > 0 && products.length === 0) return { ok: false, products: [] };
    return { ok: true, products };
  } catch {
    return { ok: false, products: [] };
  }
}

export async function financeProduct(slug: string) {
  const catalog = await financeCatalog();
  return {
    ok: catalog.ok,
    product: catalog.products.find((item) => item.slug === slug) ?? null,
  };
}

function parseProduct(entry: unknown): CatalogProduct | null {
  if (!entry || typeof entry !== "object") return null;
  const row = entry as Record<string, unknown>;
  const slug = text(row.slug, 160);
  const name = text(row.name, 200);
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !name) return null;

  const includes = Array.isArray(row.includes)
    ? row.includes.flatMap((line) => {
        const value = text(line, 80);
        return value ? [value] : [];
      }).slice(0, 8)
    : [];

  return {
    slug,
    name,
    category: text(row.category, 80) || "Paket",
    image: storageUrl(row.image),
    price: money(row.price),
    pax: count(row.pax),
    paxAkad: count(row.pax_akad),
    includes,
    description: text(row.description, 600),
    url: `${financeOrigin}/products/${slug}`,
  };
}

function text(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  const clean = value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  if (!clean) return null;
  return clean.slice(0, max);
}

function money(value: unknown) {
  if (typeof value !== "number" || !Number.isSafeInteger(value)) return null;
  if (value <= 0 || value > 5_000_000_000) return null;
  return value;
}

function count(value: unknown) {
  if (typeof value !== "number" || !Number.isSafeInteger(value)) return null;
  if (value <= 0 || value > 100_000) return null;
  return value;
}

function storageUrl(value: unknown) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    const financeHost = new URL(financeOrigin).hostname;
    if (url.hostname !== financeHost && url.hostname !== "maknafinance.id" && url.hostname !== "www.maknafinance.id") {
      return null;
    }
    if (url.hostname === "maknafinance.id" || url.hostname === "www.maknafinance.id") {
      url.protocol = "https:";
    }
    if (!url.pathname.startsWith("/storage/")) return null;
    return url.toString();
  } catch {
    return null;
  }
}
