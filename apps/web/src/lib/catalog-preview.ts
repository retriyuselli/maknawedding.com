export const catalogPreview = [
  {
    category: "Gedung",
    title: "Contoh paket gedung",
    image: "/weddings/placeholders/evening.webp",
    includes: ["Penggunaan ruangan", "Tata cahaya", "Tata suara"],
  },
  {
    category: "Hotel",
    title: "Contoh paket hotel",
    image: "/weddings/placeholders/resepsi.webp",
    includes: ["Ruang jamuan", "Menu hidangan", "Peralatan standar"],
  },
  {
    category: "Lamaran",
    title: "Contoh paket lamaran",
    image: "/weddings/placeholders/prosesi.webp",
    includes: ["Backdrop", "Meja dan kursi", "Tata rias"],
  },
  {
    category: "Venue",
    title: "Contoh paket venue",
    image: "/weddings/placeholders/hero.webp",
    includes: ["Area prosesi", "Area jamuan", "Jalur tamu"],
  },
  {
    category: "Wedding Organizer",
    title: "Contoh paket pernikahan",
    image: "/weddings/placeholders/cerita-unggulan.webp",
    includes: ["Koordinasi hari-H", "Rundown", "Pengarahan vendor"],
  },
  {
    category: "Gedung",
    title: "Contoh paket gedung kedua",
    image: "/weddings/placeholders/ethereal-hero.webp",
    includes: ["Ruang dalam", "Dekorasi", "Dokumentasi"],
  },
] as const;

export type CatalogPreviewItem = (typeof catalogPreview)[number];

