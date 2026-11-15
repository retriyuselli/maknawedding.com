import type { Metadata } from "next";
import "@/components/account/account.css";
import { AccountStage } from "@/components/account/AccountStage";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { readSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Masuk | Makna Wedding & Event Planner",
  description: "Masuk dengan akun percobaan atau Gmail.",
};

const googleErrors: Record<string, string> = {
  konfigurasi: "Masuk dengan Gmail belum dapat dipakai. Pengaturan Google di maknafinance masih kosong.",
  batal: "Masuk dengan Gmail dibatalkan.",
  gagal: "Gagal masuk dengan Gmail. Silakan coba lagi.",
  email: "Akun Gmail tidak menyediakan email yang valid.",
  nonaktif: "Akun ini tidak aktif. Hubungi Makna.",
};

export default async function MasukPage({ searchParams }: { searchParams: Promise<{ galat?: string }> }) {
  const session = await readSession();
  const { galat } = await searchParams;

  return (
    <>
      <SiteHeader isHome={false} />
      <main id="konten" tabIndex={-1}>
        <AccountStage
          mode="masuk"
          signedInName={session?.name}
          googleError={galat ? googleErrors[galat] ?? googleErrors.gagal : undefined}
          image="/weddings/placeholders/cerita-unggulan.webp"
          alt="Pasangan pengantin berjalan bersama di taman"
          line="Selamat datang kembali."
          note="Akun percobaan atau Gmail bisa masuk dari formulir ini."
        />
      </main>
      <SiteFooter isHome={false} currentPath="/masuk" />
    </>
  );
}
