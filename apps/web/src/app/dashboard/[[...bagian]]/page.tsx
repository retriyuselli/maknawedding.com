import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CelebrationHome } from "@/components/dashboard/CelebrationHome";
import { ConsumerNotes } from "@/components/dashboard/ConsumerNotes";
import { ConsumerSheets } from "@/components/dashboard/ConsumerSheets";
import { WeddingChecklist } from "@/components/dashboard/WeddingChecklist";
import { roleLabel } from "@/lib/dummy-accounts";
import { dashboardPanels, dashboardSlugs } from "@/lib/dashboard-panels";
import { readSession } from "@/lib/session";

type DashboardPageProps = {
  params: Promise<{ bagian?: string[] }>;
};

export async function generateMetadata({ params }: DashboardPageProps): Promise<Metadata> {
  const session = await readSession();
  const { bagian } = await params;
  const slug = bagian?.[0] ?? "";
  const panel = session ? dashboardPanels[session.role][slug] : undefined;
  return {
    title: `${panel?.title ?? "Dashboard"} | Makna Wedding & Event Planner`,
    description: "Ruang akun percobaan Makna. Data konsultasi belum tersimpan.",
  };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const session = await readSession();
  if (!session) redirect("/masuk");

  const { bagian } = await params;
  if (bagian && bagian.length > 1) notFound();
  const slug = bagian?.[0] ?? "";
  if (slug && !dashboardSlugs.includes(slug)) notFound();

  const panel = dashboardPanels[session.role][slug];
  if (!panel) {
    return (
      <DashboardShell>
        <article className="dashboard-panel">
          <p className="eyebrow">Akun percobaan</p>
          <h1>Bagian ini untuk peran yang lain</h1>
          <p>Menu akun Anda tidak mencakup halaman ini.</p>
          <p><Link href="/dashboard">Kembali ke dashboard</Link></p>
        </article>
      </DashboardShell>
    );
  }

  const label = roleLabel(session.role);

  if (session.role === "konsumen" && slug === "") {
    return (
      <DashboardShell>
        <CelebrationHome />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <article className="dashboard-panel">
      <p className="eyebrow">{panel.eyebrow}</p>
      <h1>{panel.title}</h1>
      {slug === "" || slug === "pengaturan" ? (
        <p className="dashboard-note">
          {session.role === "konsumen"
            ? "Akun percobaan. Perayaan dan pembayaran belum terhubung ke maknafinance. Centang, rundown, tamu, dan pesan tersimpan di peramban."
            : "Akun percobaan. Pesan, tagihan, dan konsultasi belum tersimpan."}
        </p>
      ) : null}
      {slug === "pengaturan" ? (
        <dl className="dashboard-account">
          <div>
            <dt>Nama</dt>
            <dd>{session.name}</dd>
          </div>
          <div>
            <dt>Nama pengguna</dt>
            <dd>{session.username}</dd>
          </div>
          <div>
            <dt>Peran</dt>
            <dd>{label}</dd>
          </div>
        </dl>
      ) : null}
      {panel.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {panel.facts ? (
        <dl className="dashboard-account">
          {panel.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {panel.points ? (
        <ol className="dashboard-points">
          {panel.points.map((point) => (
            <li key={point.title}>
              <h2>{point.title}</h2>
              <p>{point.text}</p>
            </li>
          ))}
        </ol>
      ) : null}
      {session.role === "konsumen" && slug === "checklist" ? <WeddingChecklist username={session.username} /> : null}
      {session.role === "konsumen" && ["jadwal", "cakupan", "pembayaran", "berkas", "pemberitahuan"].includes(slug) ? <ConsumerSheets slug={slug} /> : null}
      {session.role === "konsumen" && ["rundown", "tamu", "pesan"].includes(slug) ? <ConsumerNotes slug={slug} username={session.username} /> : null}
      {panel.groups ? (
        <ol className="dashboard-groups">
          {panel.groups.map((group) => (
            <li key={group.title}>
              <h2>{group.title}</h2>
              <ol>
                {group.items.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p className="checklist-meta">
                      <span>{item.owner}</span>
                      <span>{item.status}</span>
                    </p>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      ) : null}
      {session.role === "pengunjung" && slug === "" ? (
        <p><Link href="/konsultasi">Buka halaman konsultasi</Link></p>
      ) : null}
      </article>
    </DashboardShell>
  );
}
