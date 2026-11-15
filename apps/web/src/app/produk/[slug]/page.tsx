import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "@/components/sections/catalog-preview.css";
import { paxLabel, rupiah } from "@/lib/catalog-format";
import { financeProduct } from "@/lib/finance-catalog";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { product } = await financeProduct(slug);
  if (!product) return { title: "Produk | Makna Wedding & Event Planner" };
  return {
    title: `${product.name} | Produk Makna`,
    description: product.description ?? `${product.name} dari katalog maknafinance.`,
  };
}

export default async function ProdukDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { ok, product } = await financeProduct(slug);
  if (ok && !product) notFound();

  return (
    <>
      <SiteHeader isHome={false} />
      <main id="konten" tabIndex={-1}>
        <section className="about-hero" aria-labelledby="judul-produk-detail">
          {product?.image ? (
            <img className="catalog-hero-photo" src={product.image} alt="" />
          ) : null}
          <div className="home-shell">
            <p className="eyebrow">{product?.category ?? "Katalog"}</p>
            <h1 id="judul-produk-detail">{product?.name ?? "Katalog belum dimuat"}</h1>
            <p>
              {product
                ? "Ringkasan dari katalog maknafinance. Rincian fasilitas dan cetak ada di tautan katalog."
                : "Katalog maknafinance belum bisa dimuat. Muat ulang halaman ini beberapa saat lagi."}
            </p>
          </div>
        </section>

        {product ? (
          <article className="home-shell home-section catalog-detail">
            <div className={`catalog-detail-photo${product.image ? "" : " catalog-image-empty"}`}>
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <span className="catalog-tag">{product.category}</span>
              )}
            </div>
            <div className="catalog-detail-copy">
              {product.price ? <p className="catalog-price">{rupiah(product.price)}</p> : null}
              {product.pax || product.paxAkad ? (
                <p className="catalog-pax">
                  {product.pax ? <span>Resepsi {paxLabel(product.pax)}</span> : null}
                  {product.paxAkad ? <span>Akad {paxLabel(product.paxAkad)}</span> : null}
                </p>
              ) : null}
              {product.description ? <p className="catalog-description">{product.description}</p> : null}
              {product.includes.length > 0 ? (
                <>
                  <h2>Yang termasuk</h2>
                  <ul>
                    {product.includes.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </>
              ) : null}
              <div className="catalog-detail-actions">
                <a className="silk-button" href={product.url}>
                  Rincian di maknafinance <span aria-hidden>↗</span>
                </a>
                <Link href="/produk" className="about-services-link">
                  Semua produk <span aria-hidden>↗</span>
                </Link>
              </div>
            </div>
          </article>
        ) : (
          <section className="home-shell home-section">
            <Link href="/produk" className="catalog-back">
              Kembali ke produk <span aria-hidden>↗</span>
            </Link>
          </section>
        )}
      </main>
      <SiteFooter isHome={false} currentPath="/produk" />
    </>
  );
}
