import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CatalogCard } from "@/components/sections/CatalogCard";
import "@/components/sections/catalog-preview.css";
import { financeCatalog } from "@/lib/finance-catalog";

export async function generateMetadata(): Promise<Metadata> {
  const catalog = await financeCatalog();
  return {
    title: "Produk | Makna Wedding & Event Planner",
    description: catalog.ok
      ? `${catalog.products.length} paket venue dari katalog maknafinance.`
      : "Katalog paket venue dari maknafinance.",
  };
}

export default async function ProdukPage() {
  const catalog = await financeCatalog();
  const count = new Intl.NumberFormat("id-ID").format(catalog.products.length);

  return (
    <>
      <SiteHeader isHome={false} />
      <main id="konten" tabIndex={-1}>
        <section className="about-hero" aria-labelledby="judul-produk">
          <Image
            src="/weddings/placeholders/evening.webp"
            alt="Ruang resepsi dengan cahaya sore dan untaian lampu"
            fill
            preload
            sizes="100vw"
          />
          <div className="home-shell">
            <p className="eyebrow">Makna Wedding &amp; Event Planner</p>
            <h1 id="judul-produk">
              Product <em>Catalog</em>
            </h1>
            <p>
              {catalog.ok
                ? `${count} paket venue dari katalog maknafinance. Harga dan jumlah tamu mengikuti catatan di sana.`
                : "Katalog maknafinance belum bisa dimuat. Daftar paket menyusul setelah sambungan pulih."}
            </p>
          </div>
        </section>

        <section className="home-shell home-section" aria-labelledby="daftar-produk">
          <p className="eyebrow">Katalog</p>
          <h2 id="daftar-produk">{catalog.ok ? "Semua paket" : "Katalog belum dimuat"}</h2>
          <p className="section-note">
            {catalog.ok
              ? "Setiap kartu membuka ringkasan paket. Rincian fasilitas dan cetak tetap ada di katalog maknafinance."
              : "Sambungan ke katalog maknafinance belum menjawab. Muat ulang halaman ini beberapa saat lagi."}
          </p>
          {catalog.products.length > 0 ? (
            <ul className="catalog-grid" aria-label="Semua paket katalog">
              {catalog.products.map((item) => (
                <li key={item.slug}>
                  <CatalogCard item={item} />
                </li>
              ))}
            </ul>
          ) : null}
          <Link href="/paket" className="catalog-back">
            Kembali ke paket <span aria-hidden>↗</span>
          </Link>
        </section>
      </main>
      <SiteFooter isHome={false} currentPath="/produk" />
    </>
  );
}
