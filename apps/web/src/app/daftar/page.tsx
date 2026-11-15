import type { Metadata } from "next";
import "@/components/account/account.css";
import { AccountStage } from "@/components/account/AccountStage";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: "Daftar | Makna Wedding & Event Planner",
  description: "Daftar akun Makna. Formulir menampilkan pratinjau dan belum membuat akun.",
};

export default function DaftarPage() {
  return (
    <>
      <SiteHeader isHome={false} />
      <main id="konten" tabIndex={-1}>
        <AccountStage
          mode="daftar"
          image="/weddings/placeholders/resepsi.webp"
          alt="Meja resepsi di taman pada sore hari, dengan lampu dan bunga"
          line="Mulai dari percakapan."
          note="Ilustrasi suasana resepsi. Akun belum dibuat dari halaman ini."
          focus="center 58%"
        />
      </main>
      <SiteFooter isHome={false} currentPath="/daftar" />
    </>
  );
}
