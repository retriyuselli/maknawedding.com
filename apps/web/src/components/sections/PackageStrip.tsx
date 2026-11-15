import Link from "next/link";
import { packageDetails } from "@/lib/package-details";
import "./package-card.css";

export function PackageStrip({ showIntro = true, detailed = false }: { showIntro?: boolean; detailed?: boolean }) {
  const intro = showIntro && !detailed;

  return (
    <section
      className={detailed ? "home-shell home-section paket-board" : "home-shell home-section"}
      id={intro ? "paket" : undefined}
      tabIndex={intro ? -1 : undefined}
      aria-labelledby={detailed ? "banding-paket" : undefined}
    >
      {detailed ? (
        <>
          <p className="eyebrow">Paket</p>
          <h2 id="banding-paket">Tiga cakupan pendampingan</h2>
          <p className="section-note">Nama paket mengikuti skala acara Anda. Biaya Makna, venue, dan vendor kami sesuaikan setelah kota dan tanggal diketahui. Buka setiap paket untuk membaca cakupannya.</p>
        </>
      ) : null}
      {intro ? (
        <>
          <h2>Wedding Packages</h2>
          <p className="section-note">Pilih cakupan pendampingan sesuai skala dan rangkaian perayaan Anda.</p>
        </>
      ) : null}
      <div className="package-grid">
        {packageDetails.map((item) => (
          <Link key={item.slug} href={`/paket/${item.slug}`} className="package-card">
            <h3>{item.name}</h3>
            <p>{item.summary}</p>
            <ul>
              {item.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
            {detailed ? <p className="package-scope">{item.scope}</p> : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
