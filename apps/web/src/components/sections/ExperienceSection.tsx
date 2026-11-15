import Image from "next/image";
import Link from "next/link";

const media = "/weddings/placeholders/";

const steps = [
  ["01", "Percakapan", "Suasana dan cerita yang ingin dijaga ditentukan sebelum daftar vendor disusun."],
  ["02", "Desain", "Palet, ruang, dan perjalanan tamu mengikuti makna acara, bukan template yang sama."],
  ["03", "Hari-H", "Rundown, keluarga, dan vendor berjalan pada satu jalur yang sudah disepakati."],
] as const;

export function ExperienceSection() {
  return (
    <section className="home-section experience" id="pengalaman" tabIndex={-1} aria-labelledby="pengalaman-judul">
      <div className="home-shell experience-layout">
        <div className="experience-intro">
          <p className="eyebrow">The Makna Experience</p>
          <h2 id="pengalaman-judul">
            <em>
              More Than a Wedding,
              <br /> It’s a Meaningful Journey
            </em>
          </h2>
        </div>

        <a className="experience-frame" href="#portofolio">
          <Image src={media + "resepsi.webp"} alt="Suasana resepsi dengan cahaya lembut dan meja tamu" fill sizes="(min-width: 980px) 36vw, 100vw" />
          <span>Lihat inspirasi perayaan</span>
        </a>

        <div className="experience-body">
          <p className="experience-lead">
            Dari percakapan pertama hingga hari yang Anda nantikan, Makna menyatukan perencanaan, desain, dan koordinasi agar perayaan terasa dekat dengan cerita Anda.
          </p>
          <ol className="experience-path">
            {steps.map(([index, title, body]) => (
              <li key={index}>
                <span>{index}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="experience-actions">
            <Link href="/tentang" className="silk-button">
              Kenali Makna lebih dekat
            </Link>
            <a className="story-link" href="#portofolio">
              Lihat portofolio <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
