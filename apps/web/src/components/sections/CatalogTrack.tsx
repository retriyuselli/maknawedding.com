"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import type { CatalogProduct } from "@/lib/catalog-format";
import { CatalogCard } from "./CatalogCard";

export function CatalogTrack({ ok, items }: { ok: boolean; items: CatalogProduct[] }) {
  const scroller = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: items.length <= 1 });

  function updateEdges() {
    const el = scroller.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }

  function stepSize() {
    const el = scroller.current;
    const card = el?.querySelector("li");
    if (!el || !card) return 0;
    const gap = Number.parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const observer = new ResizeObserver(() => updateEdges());
    observer.observe(el);
    el.querySelectorAll(":scope > li").forEach((card) => observer.observe(card));
    updateEdges();
    const frame = requestAnimationFrame(() => updateEdges());
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [items.length]);

  function move(direction: 1 | -1) {
    const el = scroller.current;
    const step = stepSize();
    if (!el || step === 0) return;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  const note = ok
    ? "Geser ke kiri atau kanan. More membuka seluruh daftar. Setiap kartu membuka rincian di situs ini."
    : "Katalog belum bisa dimuat. Daftar paket menyusul setelah sambungan pulih.";

  return (
    <section className="home-shell home-section" aria-labelledby="katalog-paket">
      <div className="catalog-bar">
        <div>
          <p className="eyebrow">Katalog</p>
          <h2 id="katalog-paket">Paket venue untuk dibaca setelah skalanya cocok</h2>
          <p className="section-note">{note}</p>
        </div>
        <div className="catalog-controls">
          {items.length > 0 ? (
            <>
              <button type="button" onClick={() => move(-1)} disabled={edges.start} aria-label="Kartu sebelumnya">
                <span aria-hidden>←</span>
              </button>
              <button type="button" onClick={() => move(1)} disabled={edges.end} aria-label="Kartu berikutnya">
                <span aria-hidden>→</span>
              </button>
            </>
          ) : null}
          <Link href="/produk" className="catalog-more">
            More
          </Link>
        </div>
      </div>
      {items.length > 0 ? (
        <ul
          ref={scroller}
          className="catalog-track"
          aria-label="Kartu katalog, geser ke kiri atau kanan"
          onScroll={updateEdges}
        >
          {items.map((item) => (
            <li key={item.slug}>
              <CatalogCard item={item} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
