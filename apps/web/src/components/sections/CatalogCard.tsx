import Image from "next/image";
import type { CatalogPreviewItem } from "@/lib/catalog-preview";

export function CatalogCard({ item }: { item: CatalogPreviewItem }) {
  return (
    <article className="catalog-card">
      <div className="catalog-image">
        <Image src={item.image} alt="" fill sizes="(min-width: 900px) 30vw, 92vw" />
        <span className="catalog-tag">{item.category}</span>
      </div>
      <div className="catalog-body">
        <h3>{item.title}</h3>
        <p className="catalog-price">Harga belum terhubung</p>
        <p className="catalog-pax">
          <span>Resepsi belum terhubung</span>
          <span>Akad belum terhubung</span>
        </p>
        <ul>
          {item.includes.map((line) => <li key={line}>{line}</li>)}
        </ul>
        <p className="catalog-cue">Contoh, belum terhubung</p>
      </div>
    </article>
  );
}
