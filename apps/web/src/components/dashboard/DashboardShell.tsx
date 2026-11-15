import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { PromoBanner } from "@/components/dashboard/PromoBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { readSession } from "@/lib/session";
import "@/app/dashboard/dashboard.css";

export async function DashboardShell({ children }: { children: ReactNode }) {
  const session = await readSession();
  if (!session) redirect("/masuk");

  return (
    <>
      <SiteHeader isHome={false} forceSolid />
      <main id="konten" tabIndex={-1}>
        <div className="dashboard">
          <PromoBanner />
          <DashboardNav role={session.role} />
          <div className="dashboard-main">{children}</div>
        </div>
      </main>
      <SiteFooter isHome={false} currentPath="/dashboard" />
    </>
  );
}
