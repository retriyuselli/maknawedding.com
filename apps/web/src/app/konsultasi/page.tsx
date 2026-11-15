import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ConsultationForm } from "@/components/sections/ConsultationForm";

export const metadata: Metadata = {
  title: "Konsultasi | Makna Wedding & Event Planner",
  description: "Mulai konsultasi dengan Makna. Siapkan kota acara, tanggal atau rentang bulan, dan perkiraan tamu.",
};

export default function KonsultasiPage() {
  return (
    <>
      <SiteHeader isHome={false} />
      <main id="konten" tabIndex={-1}>
        <section className="about-hero" aria-labelledby="judul-konsultasi">
          <Image
            src="/weddings/placeholders/cerita-unggulan.webp"
            alt="Pasangan pengantin berjalan bersama di taman"
            fill
            preload
            sizes="100vw"
          />
          <div className="home-shell">
            <p className="eyebrow">Makna Wedding &amp; Event Planner</p>
            <h1 id="judul-konsultasi">Mulai konsultasi</h1>
            <p>Percakapan awal untuk mendengar cerita, skala acara, dan hal yang ingin dijaga.</p>
          </div>
        </section>

        <section className="home-shell home-section" aria-labelledby="siapkan-konsultasi">
          <h2 id="siapkan-konsultasi">Tiga hal yang membantu</h2>
          <p className="section-note">Angka yang belum pasti boleh ditulis sebagai perkiraan. Isi formulir ini sebagai langkah awal percakapan dengan kami.</p>
          <ol className="about-steps">
            <li>
              <h3>Kota acara</h3>
              <p>Kota membantu melihat perjalanan tamu dan pendampingan di lokasi.</p>
            </li>
            <li>
              <h3>Tanggal atau rentang</h3>
              <p>Tanggal pasti belum wajib. Rentang bulan sudah bisa dipakai untuk percakapan awal.</p>
            </li>
            <li>
              <h3>Perkiraan tamu</h3>
              <p>Jumlah yang mendekati cukup untuk membedakan perayaan intim dan resepsi yang lebih luas.</p>
            </li>
          </ol>
        </section>

        <ConsultationForm />

        <section className="home-shell home-section" aria-labelledby="konsultasi-cakupan">
          <div className="consultation-banner">
            <h2 id="konsultasi-cakupan">
              <em>Ingin melihat cakupan sebelum menulis?</em>
            </h2>
            <p>Lihat dulu layanan dan paket Makna. Biaya kami bahas setelah skala acara Anda jelas.</p>
            <div className="about-actions">
              <Link href="/layanan" className="silk-button">Lihat layanan <span aria-hidden>→</span></Link>
              <Link href="/paket" className="about-services-link">Lihat paket <span aria-hidden>↗</span></Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter isHome={false} currentPath="/konsultasi" />
    </>
  );
}
