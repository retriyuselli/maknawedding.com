import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CatalogCard } from "@/components/sections/CatalogCard";
import "@/components/sections/catalog-preview.css";
import { catalogPreview } from "@/lib/catalog-preview";

export const metadata: Metadata = {
  title: "Produk | Makna Wedding & Event Planner",
  description: "Enam contoh paket venue. Harga, jumlah tamu, dan daftar fasilitas belum terhubung.",
};

export default function ProdukPage() {
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
            <p>Enam contoh paket venue. Harga, jumlah tamu, dan daftar fasilitas belum terhubung.</p>
          </div>
        </section>

        <section className="home-shell home-section" aria-labelledby="daftar-produk">
          <p className="eyebrow">Katalog</p>
          <h2 id="daftar-produk">Semua kartu contoh</h2>
          <p className="section-note">
            Keenam paket ditampilkan sekaligus. Angka harga dan jumlah tamu menyusul setelah katalog maknafinance terhubung.
          </p>
          <ul className="catalog-grid" aria-label="Semua kartu katalog">
            {catalogPreview.map((item) => (
              <li key={item.title}>
                <CatalogCard item={item} />
              </li>
            ))}
          </ul>
          <Link href="/paket" className="catalog-back">
            Kembali ke paket <span aria-hidden>↗</span>
          </Link>
        </section>
      </main>
      <SiteFooter isHome={false} currentPath="/produk" />
    </>
  );
}
