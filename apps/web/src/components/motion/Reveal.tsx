"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-reveal-media]");
        if (targets.length === 0) return;

        gsap.from(targets, {
          y: 16,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
        });
      });

      return () => motion.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
