import type { Metadata } from "next";
import "./tentang.css";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhyMakna } from "@/components/sections/WhyMakna";

export const metadata: Metadata = {
  title: "Tentang Makna | Makna Wedding & Event Planner",
  description: "Kenali cara Makna mendampingi perayaan, lalu mulai percakapan dengan cerita, skala acara, dan peran yang diinginkan.",
};

const planningSteps = [
  {
    title: "Kenali cerita Anda",
    description: "Kami mulai dengan mendengarkan. Apa yang ingin Anda rayakan, siapa yang ingin Anda libatkan, dan detail apa yang paling berarti bagi keluarga Anda?",
  },
  {
    title: "Susun rencana bersama",
    description: "Kami menerjemahkan prioritas Anda ke dalam konsep, anggaran, pilihan vendor, dan jadwal yang mudah diikuti.",
  },
  {
    title: "Dampingi hari perayaan",
    description: "Kami mengoordinasikan alur acara bersama keluarga, venue, dan vendor agar Anda punya waktu untuk menikmati momen bersama orang terdekat.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader isHome={false} />
      <main id="konten" tabIndex={-1}>
        <section className="about-hero" aria-labelledby="tentang-makna">
          <Image
            src="/weddings/placeholders/cerita-unggulan.webp"
            alt=""
            fill
            preload
            sizes="100vw"
          />
          <div className="home-shell">
            <p className="eyebrow">The Makna Experience</p>
            <h1 id="tentang-makna">Tentang <em>Makna</em></h1>
            <p>Kami merancang pernikahan dan acara yang terasa dekat dengan cerita Anda.</p>
          </div>
        </section>

        <section className="home-shell home-section about-story" aria-labelledby="cerita-makna">
          <figure>
            <div className="about-story-photo">
              <Image
                src="/weddings/placeholders/evening.webp"
                alt="Ilustrasi ballroom dengan rangkaian bunga lavender dan lampu kristal"
                fill
                sizes="(min-width: 760px) 45vw, 90vw"
              />
            </div>
            <figcaption>Ilustrasi konsep resepsi</figcaption>
          </figure>
          <div>
            <p className="eyebrow">Makna Wedding &amp; Event Planner</p>
            <h2 id="cerita-makna"><em>Perayaan yang terasa milik Anda</em></h2>
            <p>Memilih suasana untuk akad, menyusun alur resepsi, dan menentukan peran keluarga adalah bagian dari cara sebuah perayaan bercerita. Makna membantu Anda mengambil keputusan itu satu per satu, sesuai skala acara dan hal yang ingin Anda jaga.</p>
            <p>Kami menyatukan perencanaan, desain, dan koordinasi agar setiap keputusan tersambung, dari pilihan venue dan vendor hingga detail terakhir pada hari acara.</p>
          </div>
        </section>

        <section className="home-shell home-section" aria-labelledby="cara-kerja">
          <h2 id="cara-kerja">Cara Kami Mendampingi Anda</h2>
          <ol className="about-steps">
            {planningSteps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <WhyMakna />

        <section className="home-shell home-section portfolio-guide" id="percakapan" aria-labelledby="bahas-kontak">
          <div>
            <p className="eyebrow">Percakapan pertama</p>
            <h2 id="bahas-kontak">Tiga hal yang dibahas lebih dulu</h2>
            <p>Belum perlu membawa daftar vendor yang lengkap. Cerita dan perkiraan skala sudah cukup untuk melihat langkah berikutnya.</p>
          </div>
          <ol>
            <li>
              <h3>Cerita</h3>
              <p>Suasana yang ingin dijaga, dan siapa yang ingin dilibatkan dalam perayaan.</p>
            </li>
            <li>
              <h3>Skala</h3>
              <p>Perkiraan tamu dan apakah acaranya satu hari atau beberapa momen.</p>
            </li>
            <li>
              <h3>Peran</h3>
              <p>Perencanaan, desain, koordinasi hari-H, atau gabungannya. Pilihan ini masih bisa diubah.</p>
            </li>
          </ol>
        </section>

        <section className="home-shell home-section" aria-labelledby="mulai-bersama-makna">
          <div className="consultation-banner">
            <h2 id="mulai-bersama-makna"><em>Siap menulis permintaan konsultasi?</em></h2>
            <p>Siapkan kota, tanggal atau rentang bulan, dan perkiraan tamu. Formulir menampilkan pratinjau dan belum mengirim permintaan.</p>
            <div className="about-actions">
              <Link href="/konsultasi" className="silk-button">Mulai Konsultasi <span aria-hidden>→</span></Link>
              <Link href="/layanan" className="about-services-link">Lihat Layanan <span aria-hidden>↗</span></Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter isHome={false} currentPath="/tentang" />
    </>
  );
}
