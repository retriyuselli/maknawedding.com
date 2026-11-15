import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { readSession } from "@/lib/session";
import "./globals.css";
import "@/styles/konsumen-tema.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Makna Wedding & Event Planner",
  description:
    "Makna Wedding & Event Planner merancang pernikahan dan acara dengan suasana tenang, sinematik, dan pribadi.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await readSession();

  return (
    <html lang="id" className={`${playfair.variable} ${jakarta.variable}`} data-tema={session?.role === "konsumen" ? "konsumen" : undefined}>
      <body className="relative overflow-x-clip bg-ivory font-sans text-ink antialiased">
        <a
          className="absolute top-3 left-(--layout-gutter) z-50 -translate-y-[200%] rounded-full bg-ink px-4 py-3 text-sm font-semibold text-paper focus:translate-y-0"
          href="#konten"
        >
          Loncat ke isi
        </a>
        {children}
      </body>
    </html>
  );
}
