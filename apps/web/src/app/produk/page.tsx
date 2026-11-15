import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProdukCatalog } from "@/components/sections/ProdukCatalog";
import "@/components/sections/catalog-preview.css";
import { financeCatalog } from "@/lib/finance-catalog";

export async function generateMetadata(): Promise<Metadata> {
  const catalog = await financeCatalog();
  return {
    title: "Produk | Makna Wedding & Event Planner",
      description: catalog.ok
      ? `${catalog.products.length} pilihan paket venue untuk dibandingkan: harga, jumlah tamu, dan isi paket.`
      : "Pilihan paket venue Makna Wedding.",
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
                ? `${count} pilihan paket venue. Bandingkan harga, jumlah tamu, dan apa saja yang termasuk.`
                : "Daftar paket belum siap ditampilkan. Silakan coba lagi sebentar."}
            </p>
          </div>
        </section>

        <section className="home-shell home-section" aria-labelledby="daftar-produk">
          <p className="eyebrow">Katalog</p>
          <h2 id="daftar-produk">{catalog.ok ? "Semua paket" : "Daftar paket belum siap"}</h2>
          <p className="section-note">
            {catalog.ok
              ? "Pilih yang paling dekat dengan jumlah tamu dan suasana yang Anda bayangkan. Di dalamnya ada harga dan daftar isi paket."
              : "Daftar paket belum bisa ditampilkan. Silakan coba lagi sebentar."}
          </p>
          {catalog.products.length > 0 ? (
            <ProdukCatalog products={catalog.products} />
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
