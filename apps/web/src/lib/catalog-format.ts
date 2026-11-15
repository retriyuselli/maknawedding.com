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
