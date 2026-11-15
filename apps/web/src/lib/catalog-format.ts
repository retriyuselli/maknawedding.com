export type CatalogProduct = {
  slug: string;
  name: string;
  category: string;
  image: string | null;
  price: number | null;
  pax: number | null;
  paxAkad: number | null;
  includes: string[];
  description: string | null;
  url: string;
};

export function rupiah(value: number) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
}

export function paxLabel(value: number) {
  return `${new Intl.NumberFormat("id-ID").format(value)} pax`;
}
