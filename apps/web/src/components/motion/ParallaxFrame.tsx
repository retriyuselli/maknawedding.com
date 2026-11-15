"use client";

import { useRef, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import { gsap, useGSAP } from "@/lib/gsap";

export function ParallaxFrame({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference) and (pointer: fine)",
        () => {
          gsap.fromTo(
            "[data-parallax]",
            { y: -12 },
            {
              y: 12,
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        },
      );

      return () => motion.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cx("relative overflow-hidden", className)}>
      {children}
    </div>
  );
}
