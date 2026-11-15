import Link from "next/link";
import { displayProductName, paxLabel, rupiah, type CatalogProduct } from "@/lib/catalog-format";

export function CatalogCard({ item }: { item: CatalogProduct }) {
  return (
    <Link href={`/produk/${item.slug}`} className="catalog-card">
      <div className={`catalog-image${item.image ? "" : " catalog-image-empty"}`}>
        {item.image ? (
          <img src={item.image} alt="" />
        ) : null}
        <span className="catalog-tag">{item.category}</span>
      </div>
      <div className="catalog-body">
        <h3>{displayProductName(item.name)}</h3>
        {item.price ? <p className="catalog-price">{rupiah(item.price)}</p> : null}
        {item.pax || item.paxAkad ? (
          <p className="catalog-pax">
            {item.pax ? <span>Resepsi {paxLabel(item.pax)}</span> : null}
            {item.paxAkad ? <span>Akad {paxLabel(item.paxAkad)}</span> : null}
          </p>
        ) : null}
        <p className="catalog-cue">Lihat paket</p>
      </div>
    </Link>
  );
}
