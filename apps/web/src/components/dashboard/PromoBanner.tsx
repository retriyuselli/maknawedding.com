"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { promoBanners } from "@/lib/promo-banners";
import "./promo-banner.css";

export function PromoBanner() {
  const scroller = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, startX: 0, scroll: 0, moved: false });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = promoBanners.length;

  function go(next: number) {
    const el = scroller.current;
    if (!el || el.clientWidth === 0) return;
    const target = (next + count) % count;
    const current = Math.round(el.scrollLeft / el.clientWidth);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: target * el.clientWidth,
      behavior: reduce || Math.abs(target - current) > 1 ? "auto" : "smooth",
    });
    setIndex(target);
  }

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const list = el;

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
      const width = list.clientWidth || 1;
      const target = Math.max(0, Math.min(count - 1, Math.round(list.scrollLeft / width)));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      list.scrollTo({ left: target * width, behavior: reduce ? "auto" : "smooth" });
      setIndex(target);
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
  }, [count]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const timer = window.setInterval(() => {
      if (paused || document.hidden) return;
      const el = scroller.current;
      if (!el || el.clientWidth === 0) return;
      const current = Math.round(el.scrollLeft / el.clientWidth);
      const target = (current + 1) % count;
      el.scrollTo({
        left: target * el.clientWidth,
        behavior: target === 0 ? "auto" : "smooth",
      });
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  function onScroll() {
    const el = scroller.current;
    if (!el || el.clientWidth === 0) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }

  function onClickCapture(event: React.MouseEvent) {
    if (!drag.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current.moved = false;
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  }

  const current = promoBanners[index] ?? promoBanners[0];

  return (
    <section
      className="promo-banner"
      aria-roledescription="carousel"
      aria-label="Promosi"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
      onKeyDown={onKeyDown}
    >
      <div className="promo-banner-frame">
        <ul
          ref={scroller}
          className="promo-banner-track"
          aria-label="Banner promosi, geser ke samping"
          onScroll={onScroll}
          onClickCapture={onClickCapture}
        >
          {promoBanners.map((slide, slideIndex) => (
            <li key={slide.href} aria-hidden={slideIndex === index ? undefined : true}>
              <Link href={slide.href} tabIndex={slideIndex === index ? undefined : -1}>
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  preload={slideIndex === 0}
                  sizes="(max-width: 800px) 100vw, 90rem"
                  style={{ objectPosition: slide.focus }}
                />
                <span className="promo-copy">
                  <span className="promo-kicker">Promosi</span>
                  <span className="promo-title">{slide.title}</span>
                  <span className="promo-text">{slide.text}</span>
                  <span className="promo-cta">{slide.cta} <span aria-hidden>→</span></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="promo-banner-bar">
        <p aria-live="polite">{index + 1} dari {count}. {current.title}</p>
        <div className="promo-banner-tabs" role="tablist" aria-label="Pilih promosi">
          {promoBanners.map((slide, slideIndex) => (
            <button
              key={slide.href}
              type="button"
              role="tab"
              aria-selected={slideIndex === index}
              aria-label={slide.title}
              onClick={() => go(slideIndex)}
            >
              <span />
            </button>
          ))}
        </div>
        <div className="promo-banner-controls">
          <button type="button" onClick={() => go(index - 1)} aria-label="Promosi sebelumnya">
            <span aria-hidden>←</span>
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Promosi berikutnya">
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
