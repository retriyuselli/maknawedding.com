import type { AccountRole } from "@/lib/dummy-accounts";

export type DashboardLink = {
  href: string;
  label: string;
  roles: AccountRole[];
};

export const dashboardLinks: DashboardLink[] = [
  { href: "/dashboard", label: "Status percakapan", roles: ["pengunjung"] },
  { href: "/dashboard", label: "Meja kerja", roles: ["kantor"] },
  { href: "/dashboard", label: "Perayaan saya", roles: ["konsumen"] },
  { href: "/dashboard/inspirasi", label: "Papan inspirasi", roles: ["pengunjung"] },
  { href: "/dashboard/periksa", label: "Daftar periksa", roles: ["pengunjung"] },
  { href: "/dashboard/checklist", label: "Wedding checklist", roles: ["konsumen"] },
  { href: "/dashboard/jadwal", label: "Jadwal", roles: ["konsumen"] },
  { href: "/dashboard/rundown", label: "Rundown", roles: ["konsumen"] },
  { href: "/dashboard/cakupan", label: "Cakupan", roles: ["konsumen"] },
  { href: "/dashboard/tamu", label: "Tamu", roles: ["pengunjung"] },
  { href: "/dashboard/pembayaran", label: "Pembayaran", roles: ["pengunjung"] },
  { href: "/dashboard/pembayaran", label: "Pembayaran", roles: ["konsumen"] },
  { href: "/dashboard/berkas", label: "Berkas", roles: ["konsumen"] },
  { href: "/dashboard/tamu", label: "Tamu", roles: ["konsumen"] },
  { href: "/dashboard/permintaan", label: "Permintaan konsultasi", roles: ["kantor"] },
  { href: "/dashboard/konten", label: "Konten", roles: ["kantor"] },
  { href: "/dashboard/vendor", label: "Vendor", roles: ["pengunjung", "kantor"] },
  { href: "/dashboard/pesan", label: "Pesan", roles: ["pengunjung", "kantor", "konsumen"] },
  { href: "/dashboard/pemberitahuan", label: "Pemberitahuan", roles: ["pengunjung", "kantor", "konsumen"] },
  { href: "/dashboard/ulasan", label: "Ulasan", roles: ["pengunjung"] },
  { href: "/dashboard/pengaturan", label: "Pengaturan akun", roles: ["pengunjung", "kantor", "konsumen"] },
];

export function linksFor(role: AccountRole) {
  return dashboardLinks.filter((item) => item.roles.includes(role));
}
