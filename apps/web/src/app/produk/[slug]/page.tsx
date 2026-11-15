import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { paxLabel, rupiah } from "@/lib/catalog-format";
import { financeCatalog, financeProduct } from "@/lib/finance-catalog";
import "./produk-detail.css";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { product } = await financeProduct(slug);
  if (!product) return { title: "Produk | Makna Wedding & Event Planner" };
  return {
    title: `${product.name} | Produk Makna`,
    description: product.description ?? `${product.name} dari katalog Makna Wedding.`,
  };
}

export default async function ProdukDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [{ ok, product }, catalog] = await Promise.all([
    financeProduct(slug),
    financeCatalog(),
  ]);
  if (ok && !product) notFound();

  const related = product
    ? catalog.products
        .filter((item) => item.slug !== product.slug)
        .filter((item) => item.category === product.category)
        .slice(0, 3)
    : [];
  const relatedFallback = product && related.length === 0
    ? catalog.products.filter((item) => item.slug !== product.slug).slice(0, 3)
    : related;

  return (
    <>
      <SiteHeader isHome={false} />
      <main id="konten" tabIndex={-1}>
        {product ? (
          <>
            <section className="produk-hero" aria-labelledby="judul-produk-detail">
              {product.image ? (
                <img className="produk-hero-photo" src={product.image} alt="" />
              ) : null}
              <div className="produk-hero-shade" aria-hidden />
              <div className="home-shell produk-hero-inner">
                <nav className="produk-breadcrumb" aria-label="Jalur halaman">
                  <ol>
                    <li><Link href="/">Beranda</Link></li>
                    <li><Link href="/produk">Produk</Link></li>
                    <li aria-current="page"><span>{product.name}</span></li>
                  </ol>
                </nav>

                <p className="eyebrow">{product.category}</p>
                <h1 id="judul-produk-detail">{product.name}</h1>

                <div className="produk-hero-meta">
                  {product.price ? (
                    <div className="produk-price-block">
                      <p className="produk-price">{rupiah(product.price)}</p>
                      <p className="produk-price-note">Harga terbit. Nilai akhir mengikuti kesepakatan konsultasi.</p>
                    </div>
                  ) : null}
                  {product.pax || product.paxAkad ? (
                    <p className="produk-pax">
                      {product.pax ? <span>Resepsi {paxLabel(product.pax)}</span> : null}
                      {product.paxAkad ? <span>Akad {paxLabel(product.paxAkad)}</span> : null}
                    </p>
                  ) : null}
                </div>

                {product.description ? <p className="produk-lede">{product.description}</p> : null}

                <div className="produk-detail-actions">
                  <Link href="/konsultasi" className="silk-button">
                    Tanya paket ini <span aria-hidden>→</span>
                  </Link>
                  <Link href="/produk" className="produk-hero-link">
                    Semua produk <span aria-hidden>↗</span>
                  </Link>
                </div>
              </div>
            </section>

            <section className="home-shell home-section produk-includes" aria-labelledby="produk-termasuk">
              <div className="produk-includes-head">
                <div>
                  <p className="eyebrow">Cakupan</p>
                  <h2 id="produk-termasuk">Yang termasuk</h2>
                </div>
                <p className="section-note">
                  {product.facilities.length > 0
                    ? `${product.facilities.length} fasilitas dari katalog. Semuanya tetap di halaman ini.`
                    : "Daftar fasilitas untuk paket ini belum tersedia."}
                </p>
              </div>

              {product.facilities.length > 0 ? (
                <ul className="produk-facility-grid">
                  {product.facilities.map((facility, index) => (
                    <li key={`${facility.name}-${index}`}>
                      <h3>{facility.name}</h3>
                      {facility.details.length > 0 ? (
                        <ul className="produk-facility-details">
                          {facility.details.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}

              <Link href="/produk" className="produk-back">
                Kembali ke produk <span aria-hidden>↗</span>
              </Link>
            </section>

            {relatedFallback.length > 0 ? (
              <section className="produk-related-section" aria-labelledby="produk-lain">
                <div className="home-shell">
                  <p className="eyebrow">Paket lain</p>
                  <h2 id="produk-lain">Bandingkan skalanya</h2>
                  <ul className="produk-related">
                    {relatedFallback.map((item) => (
                      <li key={item.slug}>
                        <Link href={`/produk/${item.slug}`}>
                          <span className={`produk-related-photo${item.image ? "" : " produk-related-photo-empty"}`}>
                            {item.image ? <img src={item.image} alt="" /> : null}
                          </span>
                          <span className="produk-related-copy">
                            <span className="produk-related-name">{item.name}</span>
                            {item.price ? <span className="produk-related-price">{rupiah(item.price)}</span> : null}
                            <span className="produk-related-cue">Lihat rincian <span aria-hidden>→</span></span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ) : null}

            <section className="home-shell home-section" aria-labelledby="produk-detail-konsultasi">
              <div className="consultation-banner">
                <h2 id="produk-detail-konsultasi">
                  <em>Cocokkan paket ini dengan skala acara Anda</em>
                </h2>
                <p>Bawa perkiraan tamu, tanggal, dan apakah venue sudah dipilih. Tim Makna membantu menyesuaikan cakupannya.</p>
                <div className="about-actions produk-detail-actions">
                  <Link href="/konsultasi" className="silk-button">
                    Mulai Konsultasi <span aria-hidden>→</span>
                  </Link>
                  <Link href="/produk" className="about-services-link">
                    Kembali ke produk <span aria-hidden>↗</span>
                  </Link>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="produk-hero produk-hero-empty" aria-labelledby="judul-produk-detail">
            <div className="produk-hero-shade" aria-hidden />
            <div className="home-shell produk-hero-inner">
              <nav className="produk-breadcrumb" aria-label="Jalur halaman">
                <ol>
                  <li><Link href="/">Beranda</Link></li>
                  <li><Link href="/produk">Produk</Link></li>
                  <li aria-current="page"><span>Detail</span></li>
                </ol>
              </nav>
              <p className="eyebrow">Katalog</p>
              <h1 id="judul-produk-detail">Katalog belum dimuat</h1>
              <p className="produk-lede">Muat ulang halaman ini beberapa saat lagi.</p>
              <Link href="/produk" className="produk-hero-link">
                Kembali ke produk <span aria-hidden>↗</span>
              </Link>
            </div>
          </section>
        )}
      </main>
      <SiteFooter isHome={false} currentPath="/produk" />
    </>
  );
}
