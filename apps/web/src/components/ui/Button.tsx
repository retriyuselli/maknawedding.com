import type { ReactNode } from "react";
import Link from "next/link";
import { cx } from "@/lib/cx";

const variants = {
  primary: "bg-brand text-paper hover:bg-brand-hover",
  secondary: "border border-control-border bg-paper text-ink hover:bg-ivory",
} as const;

export function buttonClass(variant: keyof typeof variants = "primary", className?: string) {
  return cx(
    "min-h-11 shrink-0 items-center justify-center rounded-full px-5 text-center text-sm font-semibold transition-colors duration-[180ms]",
    variants[variant],
    className,
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <Link href={href} className={buttonClass(variant, cx("inline-flex", className))}>
      {children}
    </Link>
  );
}
