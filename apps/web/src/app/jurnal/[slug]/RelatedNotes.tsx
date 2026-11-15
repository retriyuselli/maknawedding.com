"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type RelatedNote = {
  slug: string;
  topic: string;
  title: string;
  summary: string;
};

export function RelatedNotes({ notes }: { notes: readonly RelatedNote[] }) {
  const scroller = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, startX: 0, scroll: 0, moved: false });
  const [edges, setEdges] = useState({ start: true, end: false });

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

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [notes]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const list: HTMLUListElement = el;

    function onPointerDown(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      drag.current = { active: true, startX: event.clientX, scroll: list.scrollLeft, moved: false };
    }

    function onPointerMove(event: PointerEvent) {
      if (!drag.current.active) return;
      const distance = event.clientX - drag.current.startX;
      if (!drag.current.moved && Math.abs(distance) < 12) return;
      if (!drag.current.moved) {
        drag.current.moved = true;
        list.style.scrollSnapType = "none";
      }
      list.scrollLeft = drag.current.scroll - distance;
    }

    function onPointerUp() {
      if (!drag.current.active) return;
      drag.current.active = false;
      list.style.scrollSnapType = "";
      if (!drag.current.moved) return;
      const step = stepSize();
      if (step === 0) return;
      const index = Math.round(list.scrollLeft / step);
      list.scrollTo({ left: Math.max(0, index * step), behavior: "smooth" });
    }

    list.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      list.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  function move(direction: 1 | -1) {
    const el = scroller.current;
    const step = stepSize();
    if (!el || step === 0) return;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  function onClickCapture(event: React.MouseEvent) {
    if (!drag.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current.moved = false;
  }

  return (
    <>
      <div className="journal-slider-bar">
        <div>
          <h2 id="catatan-lain">Catatan lain</h2>
          <p className="section-note">Buka catatan yang menarik, atau geser untuk melihat yang berikutnya.</p>
        </div>
        <div className="journal-slider-controls">
          <button type="button" onClick={() => move(-1)} disabled={edges.start} aria-label="Catatan sebelumnya">
            <span aria-hidden>←</span>
          </button>
          <button type="button" onClick={() => move(1)} disabled={edges.end} aria-label="Catatan berikutnya">
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
      <ul
        ref={scroller}
        className="journal-related"
        aria-label="Catatan lain, geser ke kiri"
        onScroll={updateEdges}
        onClickCapture={onClickCapture}
      >
        {notes.map((item) => (
          <li key={item.slug}>
            <Link href={`/jurnal/${item.slug}`}>
              <span className="journal-tag">{item.topic}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <span className="journal-related-read">Baca catatan <span aria-hidden>→</span></span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
