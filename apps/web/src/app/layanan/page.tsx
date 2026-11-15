import type { Metadata } from "next";
import "./layanan.css";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ServicesGrid } from "@/components/sections/ServicesGrid";

export const metadata: Metadata = {
  title: "Layanan | Makna Wedding & Event Planner",
  description: "Layanan Makna untuk perencanaan pernikahan, desain acara, koordinasi hari-H, dan perayaan intim.",
};

export default function LayananPage() {
  return (
    <>
      <SiteHeader isHome={false} />
      <main id="konten" tabIndex={-1}>
        <section className="about-hero" aria-labelledby="judul-layanan">
          <Image
            src="/weddings/placeholders/prosesi.webp"
            alt="Momen prosesi di bawah naungan taman"
            fill
            preload
            sizes="100vw"
          />
          <div className="home-shell">
            <p className="eyebrow">Makna Wedding &amp; Event Planner</p>
            <h1 id="judul-layanan">
              Our <em>Services</em>
            </h1>
            <p>Empat cara Makna menemani perayaan, dari konsep pertama sampai hari yang Anda nantikan.</p>
          </div>
        </section>

        <section className="home-shell home-section portfolio-guide" aria-labelledby="pilih-layanan">
          <div>
            <p className="eyebrow">Cara memilih</p>
            <h2 id="pilih-layanan">Satu peran, atau satu rangkaian</h2>
            <p>Layanan tidak harus diambil semuanya. Percakapan awal membantu melihat mana yang perlu berjalan sendiri dan mana yang lebih tenang jika digabung.</p>
          </div>
          <ol>
            <li>
              <h3>Berdiri sendiri</h3>
              <p>Desain acara atau koordinasi hari-H bisa dimulai tanpa perencanaan penuh, jika konsep dan vendor sudah ada.</p>
            </li>
            <li>
              <h3>Digabung</h3>
              <p>Perencanaan, desain, dan koordinasi dipakai berurutan supaya palet, anggaran, dan rundown tidak saling bertentangan.</p>
            </li>
            <li>
              <h3>Skala intim</h3>
              <p>Lamaran, akad kecil, atau makan malam memakai perhatian yang sama. Yang berubah adalah jumlah tamu dan durasi.</p>
            </li>
          </ol>
        </section>

        <section className="home-shell home-section experience portfolio-study" aria-labelledby="alur-layanan">
          <div className="experience-layout">
            <div className="experience-intro">
              <p className="eyebrow">Alur pendampingan</p>
              <h2 id="alur-layanan">
                Dari percakapan <em>sampai hari-H</em>
              </h2>
            </div>
            <div className="experience-frame">
              <Image
                src="/weddings/placeholders/cerita-unggulan.webp"
                alt="Pasangan pengantin berjalan bersama di taman"
                fill
                sizes="(min-width: 980px) 34vw, 92vw"
              />
              <span>Ilustrasi AI · Taman</span>
            </div>
            <div className="experience-body">
              <p className="experience-lead">Urutan ini membantu membaca keempat layanan. Anda bisa masuk di langkah yang memang belum tertangani.</p>
              <ol className="experience-path">
                <li>
                  <span>01</span>
                  <div>
                    <h3>Perencanaan</h3>
                    <p>Cerita, prioritas, dan batas anggaran disusun sebelum palet atau vendor dikunci.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <h3>Desain</h3>
                    <p>Ruang, cahaya, dan perjalanan tamu mengikuti keputusan itu, bukan template yang sama untuk setiap acara.</p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <h3>Hari-H</h3>
                    <p>Satu orang memegang rundown di lokasi, termasuk saat acaranya kecil.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <ServicesGrid detailed consultHref="/konsultasi" />

        <section className="home-shell home-section" aria-labelledby="siap-konsultasi">
          <h2 id="siap-konsultasi">Yang membantu konsultasi pertama</h2>
          <p className="section-note">Tiga hal ini cukup untuk memulai. Angka yang belum pasti boleh ditulis sebagai perkiraan.</p>
          <ol className="about-steps">
            <li>
              <h3>Kota dan tanggal</h3>
              <p>Tanggal boleh masih rentang. Kota membantu melihat perjalanan tim dan tamu.</p>
            </li>
            <li>
              <h3>Perkiraan tamu</h3>
              <p>Jumlah yang mendekati cukup untuk membedakan perayaan intim dan resepsi yang lebih luas.</p>
            </li>
            <li>
              <h3>Peran yang diinginkan</h3>
              <p>Sebutkan perencanaan, desain, koordinasi, atau gabungannya. Pilihan ini masih bisa diubah.</p>
            </li>
          </ol>
        </section>

        <section className="home-shell home-section" aria-labelledby="layanan-konsultasi">
          <div className="consultation-banner">
            <h2 id="layanan-konsultasi">
              <em>Pilih layanan, lalu ceritakan acaranya</em>
            </h2>
            <p>Setiap layanan bisa berdiri sendiri atau digabung. Konsultasi membantu menentukan cakupan yang sesuai.</p>
            <div className="about-actions">
              <Link href="/konsultasi" className="silk-button">
                Mulai Konsultasi <span aria-hidden>→</span>
              </Link>
              <Link href="/tentang" className="about-services-link">
                Kenali Makna <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter isHome={false} currentPath="/layanan" />
    </>
  );
}
