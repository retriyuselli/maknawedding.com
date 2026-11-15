export type PromoBanner = {
  href: string;
  image: string;
  focus: string;
  title: string;
  text: string;
  cta: string;
};

export const promoBanners: PromoBanner[] = [
  {
    href: "/portofolio",
    image: "/weddings/placeholders/cerita-unggulan.webp",
    focus: "center 42%",
    title: "Suasana untuk promosi",
    text: "Ilustrasi dari situs. Bukan foto klien, dan belum ada penawaran.",
    cta: "Lihat portofolio",
  },
  {
    href: "/paket",
    image: "/weddings/placeholders/resepsi.webp",
    focus: "center 48%",
    title: "Essential, Signature, Royal",
    text: "Tiga cakupan pendampingan. Harga belum dicantumkan.",
    cta: "Lihat paket",
  },
  {
    href: "/konsultasi",
    image: "/weddings/placeholders/evening.webp",
    focus: "center 40%",
    title: "Mulai dari percakapan",
    text: "Formulir konsultasi masih pratinjau dan belum mengirim permintaan.",
    cta: "Buka konsultasi",
  },
];
