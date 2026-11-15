"use client";

import { usePathname } from "next/navigation";
import { roleLabel, type AccountRole } from "@/lib/dummy-accounts";
import { linksFor } from "@/lib/dashboard-nav";

export function DashboardNav({ role }: { role: AccountRole }) {
  const pathname = usePathname();
  const items = linksFor(role);

  return (
    <nav className="dashboard-nav" aria-label="Dashboard">
      <p>{roleLabel(role)}</p>
      <ul>
        {items.map((item) => {
          const current = item.href === "/dashboard" ? pathname === "/dashboard" : pathname === item.href;
          return (
            <li key={`${item.href}-${item.label}`}>
              <a href={item.href} aria-current={current ? "page" : undefined}>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
