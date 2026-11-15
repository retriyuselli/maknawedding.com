import type { CatalogFacility, CatalogProduct } from "@/lib/catalog-format";

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
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { ok: true, product: null as CatalogProduct | null };
  }

  const detailed = await financeProductDetail(slug);
  if (detailed) {
    return { ok: true, product: await withFacilityDetails(detailed) };
  }

  const catalog = await financeCatalog();
  const product = catalog.products.find((item) => item.slug === slug) ?? null;
  return {
    ok: catalog.ok,
    product: product ? await withFacilityDetails(product) : null,
  };
}

async function financeProductDetail(slug: string) {
  const endpoint = new URL(`/api/catalog/products/${slug}`, financeOrigin);
  try {
    const response = await fetch(endpoint, {
      headers: { accept: "application/json" },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const body = await response.json() as { product?: unknown };
    return parseProduct(body.product);
  } catch {
    return null;
  }
}

async function withFacilityDetails(product: CatalogProduct) {
  if (product.facilities.some((facility) => facility.details.length > 1)) {
    return product;
  }

  const blocks = await facilityBlocksFromPage(product.slug);
  if (blocks.length === 0) return product;

  const facilities = product.facilities.map((facility) => {
    const match = blocks.find((block) => normalizeName(block.name) === normalizeName(facility.name));
    if (!match || match.details.length === 0) return facility;
    return { ...facility, details: match.details };
  });

  const named = new Set(facilities.map((facility) => normalizeName(facility.name)));
  for (const block of blocks) {
    if (named.has(normalizeName(block.name))) continue;
    facilities.push({ name: block.name, quantity: 1, details: block.details });
  }

  return { ...product, facilities, includes: facilities.map((facility) => facility.name) };
}

async function facilityBlocksFromPage(slug: string) {
  try {
    const response = await fetch(new URL(`/products/${slug}`, financeOrigin), {
      headers: { accept: "text/html" },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return [] as Array<{ name: string; details: string[] }>;
    const html = await response.text();
    return parseFacilityBlocks(html);
  } catch {
    return [] as Array<{ name: string; details: string[] }>;
  }
}

function parseFacilityBlocks(html: string) {
  const blocks: Array<{ name: string; details: string[] }> = [];
  const articles = html.match(/<article\b[^>]*>[\s\S]*?<\/article>/gi) ?? [];

  for (const article of articles) {
    const titleMatch = article.match(/<p\b[^>]*font-bold[^>]*>\s*([\s\S]*?)<\/p>/i);
    const name = titleMatch ? cleanLine(titleMatch[1]) : null;
    if (!name) continue;

    const details: string[] = [];
    const listItems = article.match(/<li\b[^>]*>[\s\S]*?<\/li>/gi) ?? [];
    for (const item of listItems) {
      const line = cleanLine(item);
      if (line) details.push(line);
    }

    blocks.push({ name, details });
  }

  return blocks;
}

function parseProduct(entry: unknown): CatalogProduct | null {
  if (!entry || typeof entry !== "object") return null;
  const row = entry as Record<string, unknown>;
  const slug = text(row.slug, 160);
  const name = text(row.name, 200);
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !name) return null;

  const facilities = parseFacilities(row.facilities);
  const includes = Array.isArray(row.includes)
    ? row.includes.flatMap((line) => {
        const value = text(line, 120);
        return value ? [value] : [];
      })
    : facilities.map((facility) => facility.name);

  return {
    slug,
    name,
    category: text(row.category, 80) || "Paket",
    image: storageUrl(row.image),
    price: money(row.price),
    pax: count(row.pax),
    paxAkad: count(row.pax_akad),
    includes,
    facilities: facilities.length > 0
      ? facilities
      : includes.map((line) => ({ name: line, quantity: 1, details: [] })),
    description: text(row.description, 4000),
  };
}

function parseFacilities(value: unknown): CatalogFacility[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const row = entry as Record<string, unknown>;
    const name = text(row.name, 160);
    if (!name) return [];
    const quantity = count(row.quantity) ?? 1;
    const details = Array.isArray(row.details)
      ? row.details.flatMap((line) => {
          const value = text(line, 300);
          return value ? [value] : [];
        })
      : [];
    return [{ name, quantity, details }];
  });
}

function normalizeName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function cleanLine(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 300) || null;
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
