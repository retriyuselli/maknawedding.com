"use client";

import { useEffect, useRef, useState } from "react";
import { roleLabel, type SessionUser } from "@/lib/dummy-accounts";
import { linksFor } from "@/lib/dashboard-nav";
import "./account-menu.css";

export function AccountMenu({ user }: { user: SessionUser }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const items = linksFor(user.role);
  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();

  useEffect(() => {
    if (!open) return;

    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function logout() {
    await fetch("/api/keluar", { method: "POST" });
    window.location.assign("/");
  }

  return (
    <div className="account-menu" ref={rootRef}>
      <button
        type="button"
        className="account-avatar"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden>{initials}</span>
        <span className="sr-only">{user.name}, buka menu akun</span>
      </button>
      {open ? (
        <div className="account-popover" role="menu" aria-label="Akun">
          <p className="account-popover-name">{user.name}</p>
          <p className="account-popover-role">{roleLabel(user.role)}</p>
          <ul>
            {items.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <a role="menuitem" href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" role="menuitem" onClick={logout}>
            Keluar
          </button>
        </div>
      ) : null}
    </div>
  );
}
