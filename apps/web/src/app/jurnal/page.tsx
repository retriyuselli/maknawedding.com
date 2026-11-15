import type { Metadata } from "next";
import "./jurnal.css";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JournalStrip } from "@/components/sections/JournalStrip";

export const metadata: Metadata = {
  title: "Jurnal | Makna Wedding & Event Planner",
  description: "Catatan persiapan Makna tentang cahaya venue, rundown, dan palet. Cerita klien ditampilkan setelah ada persetujuan.",
};

export default function JurnalPage() {
  return (
    <>
      <SiteHeader isHome={false} />
      <main id="konten" tabIndex={-1}>
        <section className="about-hero" aria-labelledby="judul-jurnal">
          <Image
            src="/weddings/placeholders/ethereal-hero.webp"
            alt="Pasangan pengantin berdekatan di antara anggrek lilac dan kain tipis"
            fill
            preload
            sizes="100vw"
          />
          <div className="home-shell">
            <p className="eyebrow">Makna Wedding &amp; Event Planner</p>
            <h1 id="judul-jurnal">
              Stay <em>Inspired</em>
            </h1>
            <p>Catatan singkat untuk mempersiapkan perayaan. Cerita pasangan baru masuk setelah ada persetujuan publikasi.</p>
          </div>
        </section>

        <section className="home-shell home-section portfolio-guide" aria-labelledby="baca-jurnal">
          <div>
            <p className="eyebrow">Cara membaca</p>
            <h2 id="baca-jurnal">Tiga hal yang dicek lebih dulu</h2>
            <p>Catatan ini membantu urutan keputusan: tempat dan cahaya, lalu waktu, lalu warna. Bukan laporan acara yang sudah selesai.</p>
          </div>
          <ol>
            <li>
              <h3>Venue</h3>
              <p>Lihat cahaya pada jam yang mendekati prosesi, sebelum menentukan dekorasi.</p>
            </li>
            <li>
              <h3>Persiapan</h3>
              <p>Kunci momen utama, lalu sisakan jeda agar perpindahan tidak terasa dikejar.</p>
            </li>
            <li>
              <h3>Desain</h3>
              <p>Pilih satu warna dasar, lalu ulangi aksen pada detail kecil, bukan pada seluruh ruangan.</p>
            </li>
          </ol>
        </section>

        <JournalStrip detailed />

        <section className="home-shell home-section" aria-labelledby="jurnal-menyusul">
          <h2 id="jurnal-menyusul">Yang menyusul di jurnal</h2>
          <p className="section-note">Tiga keterangan ini masih kosong. Catatan baru baru ditambahkan jika bahannya memang dari persiapan acara.</p>
          <ol className="about-steps">
            <li>
              <h3>Nama tempat</h3>
              <p>Venue disebut jika kunjungan dan fotonya boleh dibagikan.</p>
            </li>
            <li>
              <h3>Tanggal catatan</h3>
              <p>Setiap tulisan baru membawa tanggal terbit, supaya urutannya jelas.</p>
            </li>
            <li>
              <h3>Cerita yang boleh disebut</h3>
              <p>Nama pasangan atau keluarga hanya ditulis setelah publikasinya disetujui.</p>
            </li>
          </ol>
        </section>

        <section className="home-shell home-section" aria-labelledby="jurnal-konsultasi">
          <div className="consultation-banner">
            <h2 id="jurnal-konsultasi">
              <em>Punya venue atau tanggal yang ingin dicek?</em>
            </h2>
            <p>Ceritakan jam prosesi, perkiraan tamu, dan hal yang ingin dijaga. Tim Makna membantu menentukan langkah berikutnya.</p>
            <div className="about-actions">
              <Link href="/konsultasi" className="silk-button">
                Mulai Konsultasi <span aria-hidden>→</span>
              </Link>
              <Link href="/paket" className="about-services-link">
                Lihat paket <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter isHome={false} currentPath="/jurnal" />
    </>
  );
}
