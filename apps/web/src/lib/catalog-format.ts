export type CatalogFacility = {
  name: string;
  quantity: number;
  details: string[];
};

export type CatalogProduct = {
  slug: string;
  name: string;
  category: string;
  image: string | null;
  price: number | null;
  pax: number | null;
  paxAkad: number | null;
  includes: string[];
  facilities: CatalogFacility[];
  description: string | null;
};

export function rupiah(value: number) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
}

export function paxLabel(value: number) {
  return `${new Intl.NumberFormat("id-ID").format(value)} pax`;
}

export function titleCase(value: string) {
  return value
    .toLocaleLowerCase("id-ID")
    .replace(/(^|[^\p{L}\p{N}]+)(\p{L})/gu, (_match, prefix: string, letter: string) => {
      return `${prefix}${letter.toLocaleUpperCase("id-ID")}`;
    });
}

/** Sembunyikan tahun di judul tampilan, mis. "… 70 Pax 2026-2027" → "… 70 Pax". */
export function displayProductName(value: string) {
  return value
    .replace(/\s+20\d{2}(?:\s*[-–/]\s*20\d{2})?(?:\s*[-–]\s+\S+)?\s*$/g, "")
    .replace(/\s+20\d{2}(?:\s*[-–/]\s*20\d{2})?\b/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s*[-–]\s*$/g, "")
    .trim();
}
