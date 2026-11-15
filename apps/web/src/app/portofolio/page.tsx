import type { Metadata } from "next";
import "./portfolio.css";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portofolio | Makna Wedding & Event Planner",
  description: "Galeri inspirasi perayaan Makna. Foto dan cerita pasangan ditampilkan setelah mendapat persetujuan publikasi.",
};

export default function PortofolioPage() {
  return (
    <>
      <SiteHeader isHome={false} />
      <main id="konten" tabIndex={-1}>
        <section className="about-hero" aria-labelledby="judul-portofolio">
          <Image
            src="/weddings/placeholders/evening.webp"
            alt="Ruang acara bernuansa lavender dengan meja panjang dan lampu gantung"
            fill
            preload
            sizes="100vw"
          />
          <div className="home-shell">
            <p className="eyebrow">Makna Wedding &amp; Event Planner</p>
            <h1 id="judul-portofolio">
              Our <em>Portfolio</em>
            </h1>
            <p>Galeri inspirasi perayaan. Foto dan cerita pasangan ditampilkan setelah mendapat persetujuan publikasi.</p>
          </div>
        </section>

        <section className="home-shell home-section portfolio-guide" aria-labelledby="baca-galeri">
          <div>
            <p className="eyebrow">Cara membaca</p>
            <h2 id="baca-galeri">Tiga jenis perayaan, satu perhatian</h2>
            <p>Galeri ini memakai ilustrasi agar Anda bisa merasakan susunan ruangnya dulu. Nama pasangan, kota, dan tanggal baru kami tampilkan setelah ada izin publikasi.</p>
          </div>
          <ol>
            <li>
              <h3>Wedding</h3>
              <p>Prosesi dan resepsi yang ingin terasa satu rangkaian, dari cahaya sore sampai meja tamu.</p>
            </li>
            <li>
              <h3>Engagement</h3>
              <p>Perayaan kecil untuk keluarga dekat, dengan jarak duduk dan durasi yang dijaga tetap tenang.</p>
            </li>
            <li>
              <h3>Event</h3>
              <p>Makan malam atau ruang kumpul yang memakai palet yang sama, tanpa harus menjadi pernikahan sehari penuh.</p>
            </li>
          </ol>
        </section>

        <section className="home-shell home-section experience portfolio-study" aria-labelledby="konsep-unggulan">
          <div className="experience-layout">
            <div className="experience-intro">
              <p className="eyebrow">Konsep unggulan</p>
              <h2 id="konsep-unggulan">
                Under the <em>Pergola</em>
              </h2>
            </div>
            <div className="experience-frame">
              <Image
                src="/weddings/placeholders/hero.webp"
                alt="Pasangan berdiri di bawah pergola dengan bunga gantung dan kain ungu"
                fill
                sizes="(min-width: 980px) 34vw, 92vw"
              />
              <span>Ilustrasi AI · Taman</span>
            </div>
            <div className="experience-body">
              <p className="experience-lead">Konsep ini menguji cahaya di bawah pergola: bunga gantung di atas, kain ungu di samping, dan pasangan yang tetap menjadi pusat gambar.</p>
              <ol className="experience-path">
                <li>
                  <span>01</span>
                  <div>
                    <h3>Cahaya</h3>
                    <p>Sore masuk dari sisi taman, bukan dari lampu yang menghadap langsung ke wajah.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <h3>Ruang</h3>
                    <p>Kain tipis membatasi latar tanpa menutup jalur berdiri keluarga.</p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <h3>Tamu</h3>
                    <p>Potret diambil dekat tempat duduk, supaya perpindahan setelah prosesi tetap pendek.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <PortfolioGrid detailed />

        <section className="home-shell home-section" aria-labelledby="cerita-menyusul">
          <h2 id="cerita-menyusul">Yang menyusul saat cerita terbit</h2>
          <p className="section-note">Tiga keterangan ini menunggu cerita pasangan yang sudah memberi izin untuk dibagikan.</p>
          <ol className="about-steps">
            <li>
              <h3>Kota dan venue</h3>
              <p>Nama tempat muncul bersama foto yang memang diambil di lokasi itu.</p>
            </li>
            <li>
              <h3>Tanggal dan rangkaian</h3>
              <p>Urutan akad, foto, dan resepsi mengikuti rundown hari itu, bukan susunan contoh.</p>
            </li>
            <li>
              <h3>Nama yang boleh disebut</h3>
              <p>Nama pasangan atau keluarga hanya ditulis jika publikasinya sudah disetujui.</p>
            </li>
          </ol>
        </section>

        <section className="home-shell home-section" aria-labelledby="portofolio-konsultasi">
          <div className="consultation-banner">
            <h2 id="portofolio-konsultasi">
              <em>Punya gambaran acara seperti ini?</em>
            </h2>
            <p>Ceritakan venue, jumlah tamu, dan suasana yang ingin dijaga. Tim Makna membantu menyusun langkah berikutnya.</p>
            <div className="about-actions">
              <Link href="/konsultasi" className="silk-button">
                Mulai Konsultasi <span aria-hidden>→</span>
              </Link>
              <Link href="/layanan" className="about-services-link">
                Lihat layanan <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter isHome={false} currentPath="/portofolio" />
    </>
  );
}
