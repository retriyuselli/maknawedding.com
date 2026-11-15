import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/home-content";

const media = "/weddings/placeholders/";

const presentation = [
  { label: "Wedding Planner", file: "cerita-unggulan.webp", alt: "Pasangan berjalan di antara cahaya sore di taman" },
  { label: "Event Design", file: "evening.webp", alt: "Meja resepsi pada malam hari dengan cahaya hangat" },
  { label: "Wedding Organizer", file: "ethereal-hero.webp", alt: "Suasana perayaan dengan kain dan cahaya lembut" },
  { label: "Intimate Celebrations", file: "prosesi.webp", alt: "Momen prosesi di bawah naungan taman" },
] as const;

export function ServicesGrid({ consultHref = "/konsultasi", showIntro = true, detailed = false }: { consultHref?: string; showIntro?: boolean; detailed?: boolean }) {
  const intro = showIntro && !detailed;

  return (
    <section className="home-section services" id={intro ? "layanan" : undefined} tabIndex={intro ? -1 : undefined} aria-labelledby={intro ? "layanan-judul" : detailed ? "peran-layanan" : undefined} aria-label={!intro && !detailed ? "Daftar layanan" : undefined}>
      <div className="home-shell">
        {detailed ? (
          <div className="services-intro">
            <div>
              <p className="eyebrow">Layanan</p>
              <h2 id="peran-layanan">Empat peran yang bisa digabung</h2>
            </div>
            <p className="experience-lead">Empat peran yang biasa kami bahas bersama Anda. Jumlah tamu, kota, dan tanggal kami sesuaikan saat konsultasi.</p>
          </div>
        ) : null}
        {intro ? (
          <div className="services-intro">
            <div>
              <p className="eyebrow">Layanan</p>
              <h2 id="layanan-judul">
                <em>Our Services</em>
              </h2>
            </div>
            <div>
              <p className="experience-lead">
                Empat cara Makna menemani perayaan, dari konsep pertama sampai hari yang Anda nantikan. Setiap layanan bisa berdiri sendiri atau digabung.
              </p>
              <Link className="story-link" href={consultHref}>
                Diskusikan kebutuhan Anda <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        ) : null}

        <div className="services-board">
          {services.map((service, index) => {
            const look = presentation[index];
            return (
              <article key={service.id} className="service-panel" id={service.id}>
                <figure>
                  <Image src={media + look.file} alt={look.alt} fill sizes={detailed ? "(min-width: 980px) 38vw, 92vw" : "(min-width: 980px) 22vw, (min-width: 480px) 40vw, 100vw"} />
                </figure>
                <div className="service-copy">
                  <h3>{look.label}</h3>
                  <p className="service-local">{service.title}</p>
                  <p>{service.summary}</p>
                  {detailed ? (
                    <ul className="service-includes">
                      {service.includes.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : null}
                  <Link className="service-consult" href={consultHref}>
                    Konsultasi untuk {look.label}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
