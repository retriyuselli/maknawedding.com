"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { navItems } from "@/lib/home-content";
import type { SessionUser } from "@/lib/dummy-accounts";
import { buttonClass } from "@/components/ui/Button";
import { AccountMenu } from "@/components/layout/AccountMenu";
import "./header-actions.css";

export function SiteHeader({ isHome = true, forceSolid = false }: { isHome?: boolean; forceSolid?: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<SessionUser | null | undefined>(undefined);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    function updateHeader() {
      setScrolled(window.scrollY > 24);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/sesi")
      .then((response) => response.json())
      .then((data: { user?: SessionUser | null }) => {
        if (active) setSession(data.user ?? null);
      })
      .catch(() => {
        if (active) setSession(null);
      });
    return () => {
      active = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    firstLinkRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function onNavigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!isHome || !href.startsWith("#") || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = document.getElementById(href.slice(1));
    if (!(target instanceof HTMLElement)) return;

    event.preventDefault();
    setOpen(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    target.focus({ preventScroll: true });
    if (location.hash !== href) window.history.pushState(null, "", href);
  }

  function linkHref(href: string) {
    return !isHome && href.startsWith("#") ? `/${href}` : href;
  }

  return (
    <header className="makna-header" data-solid={forceSolid || scrolled || open}>
      <div className="home-shell header-row">
        <a href={linkHref("#beranda")} className="makna-logo">
          <Image src="/makna-logo.webp" alt="Makna Wedding & Event Planner" width={720} height={226} unoptimized />
        </a>

        <nav aria-label="Utama" className="desktop-nav">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={linkHref(item.href)}
              aria-current={item.href.startsWith("/") && (pathname === item.href || pathname.startsWith(`${item.href}/`)) ? "page" : undefined}
              onClick={(event) => onNavigate(event, item.href)}
              className="header-link"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          {session ? (
            <AccountMenu user={session} />
          ) : (
            <a href="/masuk" className="header-login" aria-current={pathname === "/masuk" ? "page" : undefined} hidden={session === undefined}>
              Masuk
            </a>
          )}
          <a href={pathname === "/konsultasi" ? "#konsultasi" : "/konsultasi"} className="silk-button header-cta">
            Konsultasi <span aria-hidden>→</span>
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="menu-utama"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Tutup" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          id="menu-utama"
          aria-label="Utama"
          className="mobile-nav"
        >
          {navItems.map((item, index) => (
            <a
              key={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={linkHref(item.href)}
              aria-current={item.href.startsWith("/") && (pathname === item.href || pathname.startsWith(`${item.href}/`)) ? "page" : undefined}
              onClick={(event) => onNavigate(event, item.href)}
              className="flex min-h-11 items-center rounded-2xl px-2 text-base font-medium"
            >
              {item.label}
            </a>
          ))}
          {session ? (
            <a href="/dashboard" className={buttonClass("secondary", "mt-3 inline-flex w-full")}>
              Dashboard
            </a>
          ) : (
            <a href="/masuk" className={buttonClass("secondary", "mt-3 inline-flex w-full")} aria-current={pathname === "/masuk" ? "page" : undefined} hidden={session === undefined}>
              Masuk
            </a>
          )}
          <a href={pathname === "/konsultasi" ? "#konsultasi" : "/konsultasi"} className={buttonClass("primary", "mt-3 inline-flex w-full")}>
            Konsultasi
          </a>
        </nav>
      ) : null}
    </header>
  );
}
