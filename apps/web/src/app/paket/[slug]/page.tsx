import type { Metadata } from "next";
import "./package-detail.css";
import "@/components/sections/package-card.css";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { packageDetails, packageFrom } from "@/lib/package-details";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return packageDetails.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const item = packageFrom((await params).slug);
  if (!item) return { title: "Paket tidak ditemukan" };
  return {
    title: `${item.name} | Paket Makna`,
    description: item.summary,
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const item = packageFrom((await params).slug);
  if (!item) notFound();

  const others = packageDetails.filter((entry) => entry.slug !== item.slug);

  return (
    <>
      <SiteHeader isHome={false} />
      <main id="konten" tabIndex={-1}>
        <section className="about-hero" aria-labelledby="judul-paket-detail">
          <Image src={item.image.src} alt={item.image.alt} fill preload sizes="100vw" />
          <div className="home-shell">
            <p className="eyebrow">Paket</p>
            <h1 id="judul-paket-detail">{item.name}</h1>
            <p>{item.summary}</p>
          </div>
        </section>

        <article className="home-shell home-section package-article">
          <div className="package-prose">
            {item.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h2>Yang termasuk di {item.name}</h2>
          <ol className="experience-path">
            {item.included.map((section, index) => (
              <li key={section.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2>Yang tidak termasuk</h2>
          <ol className="about-steps">
            {item.excluded.map((section) => (
              <li key={section.title}>
                <h3>{section.title}</h3>
                <p>{section.text}</p>
              </li>
            ))}
          </ol>

          <h2>Sebelum memilih {item.name}</h2>
          <ol className="experience-path">
            {item.checks.map((section, index) => (
              <li key={section.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <Link href="/paket" className="package-back">Semua paket <span aria-hidden>↗</span></Link>
        </article>

        <section className="home-shell home-section" aria-labelledby="paket-lain">
          <p className="eyebrow">Cakupan lain</p>
          <h2 id="paket-lain">Bandingkan dengan paket yang skalanya berbeda</h2>
          <ul className="package-related">
            {others.map((entry) => (
              <li key={entry.slug}>
                <Link href={`/paket/${entry.slug}`}>
                  <h3>{entry.name}</h3>
                  <p>{entry.summary}</p>
                  <span className="package-card-cue">Lihat cakupan <span aria-hidden>→</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="home-shell home-section" aria-labelledby="paket-detail-konsultasi">
          <div className="consultation-banner">
            <h2 id="paket-detail-konsultasi">
              <em>Cocokkan {item.name} dengan skala acara Anda</em>
            </h2>
            <p>Bawa perkiraan tamu, jumlah hari, dan apakah vendor utama sudah ada. Harga belum dicantumkan.</p>
            <div className="about-actions package-detail-actions">
              <Link href="/konsultasi" className="silk-button">
                Mulai Konsultasi <span aria-hidden>→</span>
              </Link>
              <Link href="/paket" className="about-services-link">
                Kembali ke paket <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter isHome={false} currentPath="/paket" />
    </>
  );
}
