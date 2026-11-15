"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { PortfolioConcept } from "@/lib/portfolio-concepts";
import "./concept-gallery.css";

export function ConceptGallery({
  concept,
  onClose,
}: {
  concept: PortfolioConcept;
  onClose: () => void;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);
  const photo = concept.photos[index];
  const total = concept.photos.length;

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setIndex((current) => Math.min(current + 1, total - 1));
      if (event.key === "ArrowLeft") setIndex((current) => Math.max(current - 1, 0));
      if (event.key !== "Tab") return;
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>("button, [href]");
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose, total]);

  const dialog = (
    <div className="concept-dialog" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div
        ref={panelRef}
        className="concept-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="concept-toolbar">
          <div>
            <p className="eyebrow">{concept.category}</p>
            <h2 id={titleId}>{concept.title}</h2>
            <p>Ilustrasi suasana untuk konsep ini. Bukan foto klien, dan nama tempat belum dicantumkan.</p>
          </div>
          <button ref={closeRef} type="button" className="concept-close" onClick={onClose}>
            Tutup
          </button>
        </div>
        <div className="concept-stage">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 860px) 68rem, 100vw" />
          <button
            type="button"
            className="concept-nav concept-nav-prev"
            onClick={() => setIndex((current) => current - 1)}
            disabled={index === 0}
          >
            <span aria-hidden>←</span>
            <span className="sr-only">Foto sebelumnya</span>
          </button>
          <button
            type="button"
            className="concept-nav concept-nav-next"
            onClick={() => setIndex((current) => current + 1)}
            disabled={index === total - 1}
          >
            <span aria-hidden>→</span>
            <span className="sr-only">Foto berikutnya</span>
          </button>
        </div>
        <div className="concept-meta">
          <p aria-live="polite">{photo.caption}</p>
          <p className="concept-count">{index + 1} dari {total}</p>
        </div>
        <ul className="concept-thumbs">
          {concept.photos.map((item, itemIndex) => (
            <li key={`${concept.title}-${item.src}-${itemIndex}`}>
              <button
                type="button"
                aria-current={itemIndex === index ? "true" : undefined}
                aria-label={`Foto ${itemIndex + 1}: ${item.caption}`}
                onClick={() => setIndex(itemIndex)}
              >
                <Image src={item.src} alt="" fill sizes="88px" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}
