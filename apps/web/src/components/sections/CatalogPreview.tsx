import { financeCatalog } from "@/lib/finance-catalog";
import { CatalogTrack } from "./CatalogTrack";
import "./catalog-preview.css";

export async function CatalogPreview() {
  const catalog = await financeCatalog();
  return <CatalogTrack ok={catalog.ok} items={catalog.products} />;
}
