import Link from "next/link";

export function ConsultationBanner() {
  return (
    <section className="home-shell home-section">
      <div className="consultation-banner">
        <p className="eyebrow">Let’s Plan Together</p>
        <h2><em>Wujudkan Pernikahan<br /> Impian Anda Bersama Makna</em></h2>
        <Link className="silk-button" href="/konsultasi">Mulai Konsultasi <span aria-hidden>→</span></Link>
      </div>
    </section>
  );
}
