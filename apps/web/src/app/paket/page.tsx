import type { Metadata } from "next";
import "./paket.css";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CatalogPreview } from "@/components/sections/CatalogPreview";
import { PackageStrip } from "@/components/sections/PackageStrip";

export const metadata: Metadata = {
  title: "Paket | Makna Wedding & Event Planner",
  description: "Tiga cakupan pendampingan Makna: Essential, Signature, dan Royal. Harga dibahas saat konsultasi.",
};

export default function PaketPage() {
  return (
    <>
      <SiteHeader isHome={false} />
      <main id="konten" tabIndex={-1}>
        <section className="about-hero" aria-labelledby="judul-paket">
          <Image
            src="/weddings/placeholders/resepsi.webp"
            alt="Meja resepsi di taman dengan lilin dan untaian lampu"
            fill
            preload
            sizes="100vw"
          />
          <div className="home-shell">
            <p className="eyebrow">Makna Wedding &amp; Event Planner</p>
            <h1 id="judul-paket">
              Wedding <em>Packages</em>
            </h1>
            <p>Tiga cakupan pendampingan, dari acara keluarga satu hari sampai rangkaian yang lebih panjang.</p>
          </div>
        </section>

        <section className="home-shell home-section portfolio-guide" aria-labelledby="baca-paket">
          <div>
            <p className="eyebrow">Cara membaca</p>
            <h2 id="baca-paket">Bandingkan skala, bukan nama</h2>
            <p>Paket dibedakan dari lama acara dan seberapa banyak keputusan yang masih perlu didampingi. Harga tidak dicantumkan di halaman ini.</p>
          </div>
          <ol>
            <li>
              <h3>Jumlah hari</h3>
              <p>Essential untuk satu hari. Signature untuk prosesi dan resepsi. Royal untuk beberapa momen dalam lebih dari satu hari.</p>
            </li>
            <li>
              <h3>Yang sudah siap</h3>
              <p>Jika konsep dan vendor sudah ada, pendampingan bisa lebih ramping. Jika belum, perencanaan masuk ke dalam cakupan.</p>
            </li>
            <li>
              <h3>Yang belum tertulis</h3>
              <p>Biaya Makna, venue, dan vendor menunggu kota, tanggal, dan perkiraan tamu.</p>
            </li>
          </ol>
        </section>

        <PackageStrip detailed />

        <CatalogPreview />

        <section className="home-shell home-section" aria-labelledby="di-luar-paket">
          <h2 id="di-luar-paket">Yang tidak termasuk di kartu</h2>
          <p className="section-note">Tiga hal ini sengaja belum diisi. Isinya berubah sesuai acara, jadi tidak dikunci sebagai daftar harga.</p>
          <ol className="about-steps">
            <li>
              <h3>Biaya pendampingan</h3>
              <p>Angka Makna dibahas setelah cakupan paket disepakati, bukan sebelum kota dan tanggal diketahui.</p>
            </li>
            <li>
              <h3>Biaya pihak lain</h3>
              <p>Venue, hidangan, busana, dan vendor tetap tagihan masing-masing. Paket ini adalah pendampingan, bukan paket serba ada.</p>
            </li>
            <li>
              <h3>Perubahan cakupan</h3>
              <p>Paket bisa digeser setelah konsultasi jika jumlah tamu atau jumlah hari berbeda dari perkiraan awal.</p>
            </li>
          </ol>
        </section>

        <section className="home-shell home-section" aria-labelledby="paket-konsultasi">
          <div className="consultation-banner">
            <h2 id="paket-konsultasi">
              <em>Ceritakan skalanya, lalu kita cocokkan paketnya</em>
            </h2>
            <p>Bawa perkiraan tamu, jumlah hari, dan apakah konsepnya sudah ada. Tim Makna membantu memilih cakupan yang sesuai.</p>
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
      <SiteFooter isHome={false} currentPath="/paket" />
    </>
  );
}
