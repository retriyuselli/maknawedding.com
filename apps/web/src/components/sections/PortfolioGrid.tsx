"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { portfolioConcepts, type PortfolioConcept } from "@/lib/portfolio-concepts";
import { ConceptGallery } from "@/components/sections/ConceptGallery";
import "./portfolio-card.css";

const categories = ["Semua", "Wedding", "Engagement", "Event"] as const;

export function PortfolioGrid({ showIntro = true, detailed = false }: { showIntro?: boolean; detailed?: boolean }) {
  const intro = showIntro && !detailed;
  const opener = useRef<HTMLButtonElement | null>(null);
  const [category, setCategory] = useState<(typeof categories)[number]>("Semua");
  const [open, setOpen] = useState<PortfolioConcept | null>(null);
  const source = detailed ? portfolioConcepts : portfolioConcepts.slice(0, 4);
  const visible = category === "Semua" ? source : source.filter((project) => project.category === category);

  const closeGallery = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);

  return (
    <section
      className={detailed ? "home-shell home-section portfolio-board" : "home-shell home-section"}
      id={intro ? "portofolio" : undefined}
      tabIndex={intro ? -1 : undefined}
      aria-labelledby={detailed ? "galeri-konsep" : undefined}
      aria-label={!intro && !detailed ? "Galeri portofolio" : undefined}
    >
      {detailed ? (
        <>
          <p className="eyebrow">Galeri</p>
          <h2 id="galeri-konsep">Enam konsep untuk dibaca pelan-pelan</h2>
          <p className="section-note">Setiap kartu adalah ilustrasi suasana, bukan cerita klien. Klik kartu untuk melihat foto-foto konsep itu.</p>
        </>
      ) : null}
      {intro ? (
        <>
          <h2>Our Portfolio</h2>
          <p className="section-note">Galeri inspirasi perayaan dengan ilustrasi AI.</p>
        </>
      ) : null}
      <div className="portfolio-filters" role="group" aria-label="Kategori portofolio">
        {categories.map((item) => <button key={item} type="button" aria-pressed={item === category} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <ul className="portfolio-grid" aria-live="polite">
        {visible.map((project) => (
          <li key={project.title}>
            <button
              type="button"
              className="portfolio-card"
              aria-label={`Lihat foto ${project.title}`}
              onClick={(event) => {
                opener.current = event.currentTarget;
                setOpen(project);
              }}
            >
              <span className="portfolio-card-media">
                <Image src={project.photos[0].src} alt="" fill sizes={detailed ? "(min-width: 760px) 38vw, 92vw" : "(min-width: 900px) 25vw, 48vw"} />
              </span>
              <span className="portfolio-card-copy">
                {detailed ? <span className="service-local">{project.category}</span> : null}
                {detailed ? <span className="portfolio-card-title">{project.title}</span> : project.title}
                {detailed ? <span className="portfolio-card-summary">{project.summary}</span> : null}
                {detailed ? <span className="portfolio-card-cue">Lihat foto</span> : null}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {open ? <ConceptGallery key={open.title} concept={open} onClose={closeGallery} /> : null}
    </section>
  );
}
