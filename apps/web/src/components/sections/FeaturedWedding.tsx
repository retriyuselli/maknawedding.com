import Image from "next/image";
const media = "/weddings/placeholders/";

export function FeaturedWedding() {
  return (
    <section className="home-shell home-section" id="unggulan" tabIndex={-1}>
      <div className="featured-banner">
        <Image src={media + "evening.webp"} alt="" fill sizes="(min-width: 1300px) 1200px, 95vw" />
        <div><p className="eyebrow">Featured Wedding Concept</p><h2><em>A Celebration in Bloom</em></h2><p>Resepsi ballroom dengan cahaya lilin dan sentuhan lilac.</p><a className="silk-button" href="#portofolio">Jelajahi Galeri <span aria-hidden>→</span></a></div>
      </div>
    </section>
  );
}
