"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { AccountForm } from "@/components/account/AccountForm";
import { FloatingSilk } from "@/components/motion/FloatingSilk";
import { gsap, useGSAP } from "@/lib/gsap";
import "./account-stage.css";

type Mode = "masuk" | "daftar";

type AccountStageProps = {
  mode: Mode;
  image: string;
  alt: string;
  line: string;
  note: string;
  focus?: string;
  signedInName?: string;
  googleError?: string;
};

export function AccountStage({ mode, image, alt, line, note, focus = "center 30%", signedInName, googleError }: AccountStageProps) {
  const root = useRef<HTMLElement>(null);
  const headingId = mode === "daftar" ? "judul-daftar" : "judul-masuk";

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".account-stage-copy", { y: 22, autoAlpha: 0, duration: 1, delay: 0.28, ease: "power3.out" });
        gsap.from(".account-panel", { y: 28, autoAlpha: 0, duration: 1, delay: 0.16, ease: "power3.out" });
      });

      return () => motion.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="account-stage"
      aria-labelledby={headingId}
      style={{ "--stage-focus": focus } as CSSProperties}
    >
      <figure className="account-stage-photo">
        <Image
          className="account-stage-still"
          src={image}
          alt={alt}
          fill
          preload
          sizes="(min-width: 860px) 58vw, 100vw"
        />
        <FloatingSilk />
        <figcaption className="account-stage-copy">
          <p className="eyebrow">Makna</p>
          <p className="account-stage-line">{line}</p>
          <p className="account-stage-note">{note}</p>
        </figcaption>
      </figure>
      <div className="account-stage-form">
        <div className="account-panel">
          <AccountForm mode={mode} signedInName={signedInName} googleError={googleError} />
        </div>
      </div>
    </section>
  );
}
