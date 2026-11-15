export type ConceptPhoto = {
  src: string;
  alt: string;
  caption: string;
};

export type PortfolioConcept = {
  title: string;
  category: "Wedding" | "Engagement" | "Event";
  summary: string;
  photos: ConceptPhoto[];
};

export const portfolioConcepts: PortfolioConcept[] = [
  {
    title: "Garden Vows",
    category: "Wedding",
    summary: "Prosesi di taman dengan cahaya sore dan jalur tamu yang tetap dekat.",
    photos: [
      {
        src: "/weddings/placeholders/cerita-unggulan.webp",
        alt: "Pasangan pengantin berjalan bersama di taman",
        caption: "Jalan di antara rangka bunga taman.",
      },
      {
        src: "/weddings/placeholders/prosesi.webp",
        alt: "Suasana akad nikah di paviliun taman",
        caption: "Prosesi di bawah paviliun, dengan keluarga duduk dekat.",
      },
      {
        src: "/weddings/placeholders/hero.webp",
        alt: "Pasangan berdiri di bawah pergola dengan bunga gantung dan kain ungu",
        caption: "Potret di bawah rangka bunga setelah prosesi.",
      },
    ],
  },
  {
    title: "An Intimate Ceremony",
    category: "Engagement",
    summary: "Akad kecil di paviliun, dengan keluarga duduk dalam jarak yang tenang.",
    photos: [
      {
        src: "/weddings/placeholders/prosesi.webp",
        alt: "Suasana akad nikah di paviliun taman",
        caption: "Meja akad dengan keluarga dalam jarak dekat.",
      },
      {
        src: "/weddings/placeholders/hero.webp",
        alt: "Pasangan berdiri di bawah pergola dengan bunga gantung dan kain ungu",
        caption: "Potret berdua di sisi paviliun.",
      },
      {
        src: "/weddings/placeholders/ethereal-hero.webp",
        alt: "Pasangan pengantin berdekatan di antara anggrek lilac dan kain tipis",
        caption: "Potret dekat dengan kain tipis di sekeliling.",
      },
    ],
  },
  {
    title: "A Celebration in Bloom",
    category: "Wedding",
    summary: "Meja resepsi di taman, lilin, dan untaian lampu sebagai cahaya utama.",
    photos: [
      {
        src: "/weddings/placeholders/resepsi.webp",
        alt: "Meja resepsi di taman dengan lilin dan untaian lampu",
        caption: "Meja tamu di taman, dengan lilin dan untaian lampu.",
      },
      {
        src: "/weddings/placeholders/evening.webp",
        alt: "Ruang acara bernuansa lavender dengan meja panjang dan lampu gantung",
        caption: "Rangkaian lilac di sepanjang meja.",
      },
      {
        src: "/weddings/placeholders/cerita-unggulan.webp",
        alt: "Pasangan pengantin berjalan bersama di taman",
        caption: "Cahaya sore di antara bunga taman.",
      },
    ],
  },
  {
    title: "Evening Celebration",
    category: "Event",
    summary: "Ruang makan malam dengan meja panjang, lavender, dan lampu gantung.",
    photos: [
      {
        src: "/weddings/placeholders/evening.webp",
        alt: "Ruang acara bernuansa lavender dengan meja panjang dan lampu gantung",
        caption: "Ruang makan malam dengan meja panjang dan lampu gantung.",
      },
      {
        src: "/weddings/placeholders/resepsi.webp",
        alt: "Meja resepsi di taman dengan lilin dan untaian lampu",
        caption: "Meja di taman pada sore hari, untuk makan malam yang lebih longgar.",
      },
    ],
  },
  {
    title: "Orchid Light",
    category: "Engagement",
    summary: "Potret dekat dengan anggrek lilac dan kain tipis di sekeliling pasangan.",
    photos: [
      {
        src: "/weddings/placeholders/ethereal-hero.webp",
        alt: "Pasangan pengantin berdekatan di antara anggrek lilac dan kain tipis",
        caption: "Potret dekat di antara anggrek lilac.",
      },
      {
        src: "/weddings/placeholders/evening.webp",
        alt: "Ruang acara bernuansa lavender dengan meja panjang dan lampu gantung",
        caption: "Anggrek dan lilac di sepanjang ruang duduk.",
      },
    ],
  },
  {
    title: "Under the Pergola",
    category: "Wedding",
    summary: "Potret di bawah pergola bunga, dengan kain ungu sebagai pembatas ruang.",
    photos: [
      {
        src: "/weddings/placeholders/hero.webp",
        alt: "Pasangan berdiri di bawah pergola dengan bunga gantung dan kain ungu",
        caption: "Berdiri di bawah pergola, kain ungu di samping.",
      },
      {
        src: "/weddings/placeholders/prosesi.webp",
        alt: "Suasana akad nikah di paviliun taman",
        caption: "Rangka kayu dan bunga gantung di atas meja prosesi.",
      },
      {
        src: "/weddings/placeholders/cerita-unggulan.webp",
        alt: "Pasangan pengantin berjalan bersama di taman",
        caption: "Jalan di bawah rangka bunga menuju tempat duduk.",
      },
    ],
  },
];
