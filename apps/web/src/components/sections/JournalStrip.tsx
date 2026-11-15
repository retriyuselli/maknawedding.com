import Image from "next/image";
import Link from "next/link";
import { journal } from "@/lib/home-content";
import "./journal-card.css";

const previewCount = 3;

export function JournalStrip({ showIntro = true, detailed = false }: { showIntro?: boolean; detailed?: boolean }) {
  const intro = showIntro && !detailed;
  const articles = detailed ? journal : journal.slice(0, previewCount);

  return (
    <section
      className={detailed ? "home-shell home-section jurnal-board" : "home-shell home-section"}
      id={intro ? "jurnal" : undefined}
      tabIndex={intro ? -1 : undefined}
      aria-labelledby={detailed ? "daftar-jurnal" : undefined}
    >
      {detailed ? (
        <>
          <p className="eyebrow">Jurnal</p>
          <h2 id="daftar-jurnal">Enam catatan untuk dibaca pelan-pelan</h2>
          <p className="section-note">Catatan singkat untuk mempersiapkan acara. Nama venue dan cerita pasangan kami tampilkan setelah ada izin.</p>
        </>
      ) : null}
      {intro ? (
        <>
          <h2>Stay Inspired</h2>
          <p className="section-note">Catatan dan inspirasi untuk mempersiapkan perayaan Anda.</p>
        </>
      ) : null}
      <div className="journal-grid">
        {articles.map((article) => (
          <article key={article.slug} className="journal-card">
            <Link href={`/jurnal/${article.slug}`} className="journal-card-link">
              <div className="journal-image">
                <Image
                  src={article.image.src}
                  alt=""
                  fill
                  sizes={detailed ? "(min-width: 760px) 30vw, 92vw" : "(min-width: 900px) 33vw, 95vw"}
                />
                <span className="journal-tag">{article.topic}</span>
              </div>
              <div>
                <h3>{article.title}</h3>
                {detailed ? <p>{article.summary}</p> : null}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
