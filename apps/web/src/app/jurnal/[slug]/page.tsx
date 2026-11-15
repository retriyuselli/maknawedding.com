import type { Metadata } from "next";
import "./article.css";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { journal } from "@/lib/home-content";
import { RelatedNotes } from "./RelatedNotes";

type PageProps = { params: Promise<{ slug: string }> };

function articleFrom(slug: string) {
  return journal.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return journal.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = articleFrom((await params).slug);
  if (!article) return { title: "Catatan tidak ditemukan" };
  return {
    title: `${article.title} | Jurnal Makna`,
    description: article.summary,
  };
}

export default async function JurnalArticlePage({ params }: PageProps) {
  const article = articleFrom((await params).slug);
  if (!article) notFound();

  const others = journal.filter((item) => item.slug !== article.slug);

  return (
    <>
      <SiteHeader isHome={false} />
      <main id="konten" tabIndex={-1}>
        <section className="about-hero" aria-labelledby="judul-catatan">
          <Image src={article.image.src} alt={article.image.alt} fill preload sizes="100vw" />
          <div className="home-shell">
            <p className="eyebrow">{article.topic}</p>
            <h1 id="judul-catatan">{article.title}</h1>
            <p>{article.summary}</p>
          </div>
        </section>

        <article className="home-shell home-section journal-article">
          <div className="journal-prose">
            {article.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <h2>Yang dicek di catatan ini</h2>
          <ol className="experience-path">
            {article.sections.map((section, index) => (
              <li key={section.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/jurnal" className="journal-back">Semua catatan <span aria-hidden>↗</span></Link>
        </article>

        <section className="home-shell home-section" aria-labelledby="catatan-lain">
          <RelatedNotes notes={others} />
        </section>

        <section className="home-shell home-section" aria-labelledby="catatan-konsultasi">
          <div className="consultation-banner">
            <h2 id="catatan-konsultasi"><em>Ingin mencocokkan catatan ini dengan acara Anda?</em></h2>
            <p>Ceritakan jam prosesi, perkiraan tamu, dan hal yang ingin dijaga.</p>
            <div className="about-actions">
              <Link href="/konsultasi" className="silk-button">Mulai Konsultasi <span aria-hidden>→</span></Link>
              <Link href="/jurnal" className="about-services-link">Kembali ke jurnal <span aria-hidden>↗</span></Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter isHome={false} currentPath="/jurnal" />
    </>
  );
}
