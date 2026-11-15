import Image from "next/image";
import { navItems } from "@/lib/home-content";
import "./site-footer.css";

export function SiteFooter({ isHome = true, currentPath }: { isHome?: boolean; currentPath?: string }) {
  const hrefFor = (href: string) => (!isHome && href.startsWith("#") ? `/${href}` : href);
  const explore = navItems.filter((item) => item.href.startsWith("/"));
  const visit = navItems.filter((item) => item.href.startsWith("#"));
  const consultHref = currentPath === "/konsultasi" ? "#konsultasi" : "/konsultasi";

  return (
    <footer className="site-footer">
      <div className="home-shell site-footer-inner">
        <div className="site-footer-invite">
          <div>
            <p className="eyebrow">Konsultasi</p>
            <p className="site-footer-lead">Ceritakan perayaan yang ingin Anda jaga.</p>
          </div>
          <a className="silk-button" href={consultHref}>
            Mulai konsultasi <span aria-hidden>→</span>
          </a>
        </div>

        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <a href={hrefFor("#beranda")} className="makna-logo makna-logo-footer">
              <Image src="/makna-logo.webp" alt="Makna Wedding & Event Planner" width={720} height={226} unoptimized />
            </a>
            <p>Perencanaan, desain, dan koordinasi untuk pernikahan serta perayaan keluarga.</p>
          </div>

          <nav aria-label="Kaki halaman">
            <div>
              <p className="site-footer-label">Jelajahi</p>
              <ul>
                {explore.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} aria-current={currentPath === item.href ? "page" : undefined}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="site-footer-label">Kunjungi</p>
              <ul>
                {visit.map((item) => (
                  <li key={item.href}>
                    <a href={hrefFor(item.href)}>{item.label}</a>
                  </li>
                ))}
                <li>
                  <a href="/masuk" aria-current={currentPath === "/masuk" ? "page" : undefined}>Masuk</a>
                </li>
                <li>
                  <a href="/daftar" aria-current={currentPath === "/daftar" ? "page" : undefined}>Daftar</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <p className="site-footer-copy">© 2027 Makna Wedding & Event Planner</p>
      </div>
    </footer>
  );
}
