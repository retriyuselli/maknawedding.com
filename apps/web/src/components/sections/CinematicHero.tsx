import Image from "next/image";
import Link from "next/link";
import { FloatingSilk } from "@/components/motion/FloatingSilk";

export function CinematicHero() {
  return (
    <section id="beranda" tabIndex={-1} className="cinematic" aria-labelledby="judul-utama">
      <Image className="hero-photo" src="/weddings/placeholders/ethereal-hero.webp" alt="" fill preload sizes="100vw" />
      <div className="hero-shade" />
      <FloatingSilk />
      <div className="home-shell hero-content">
        <p className="eyebrow">Wedding &amp; Event Planner</p>
        <h1 id="judul-utama"><span>Crafting</span><span>Meaningful</span><em>Celebrations</em></h1>
        <p className="hero-intro">Kami merancang pernikahan dan perayaan istimewa dengan perhatian pada cerita, suasana, dan setiap detail yang berarti bagi Anda.</p>
        <div className="hero-actions">
          <Link className="silk-button" href="/konsultasi">Rencanakan Pernikahan <span aria-hidden>→</span></Link>
          <a className="story-link" href="#unggulan"><span aria-hidden>↘</span> Lihat Cerita</a>
        </div>
      </div>
      <a href="#pengalaman" className="hero-note"><em>The Makna Experience</em><span>Dari konsep hingga hari bahagia <span aria-hidden>↗</span></span></a>
      <div className="hero-wave" aria-hidden />
    </section>
  );
}
