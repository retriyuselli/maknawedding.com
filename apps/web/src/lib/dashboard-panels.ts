import type { AccountRole } from "@/lib/dummy-accounts";

export type DashboardPanel = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  points?: { title: string; text: string }[];
  facts?: { label: string; value: string }[];
  groups?: { title: string; items: { title: string; owner: string; status: string }[] }[];
};

const visitor = "Pengunjung";
const office = "Anak kantor";
const client = "Konsumen";

export const dashboardPanels: Record<AccountRole, Record<string, DashboardPanel>> = {
  pengunjung: {
    "": {
      eyebrow: visitor,
      title: "Status percakapan",
      paragraphs: [
        "Akun percobaan ini belum menyimpan konsultasi.",
        "Formulir di halaman konsultasi masih menampilkan pratinjau dan belum mengirim permintaan.",
      ],
    },
    inspirasi: {
      eyebrow: visitor,
      title: "Papan inspirasi",
      paragraphs: ["Belum ada konsep atau paket yang disimpan. Kartu galeri dan paket bisa dibuka dari situs, tetapi pilihan belum direkam di akun ini."],
    },
    periksa: {
      eyebrow: visitor,
      title: "Daftar periksa",
      paragraphs: ["Empat hal ini membantu percakapan awal. Belum ada yang tersimpan dari akun percobaan."],
      points: [
        { title: "Kota acara", text: "Belum diisi." },
        { title: "Tanggal atau rentang", text: "Belum diisi. Tanggal pasti belum wajib." },
        { title: "Perkiraan tamu", text: "Belum diisi." },
        { title: "Vendor yang sudah ada", text: "Belum dicatat." },
      ],
    },
    tamu: {
      eyebrow: visitor,
      title: "Tamu",
      paragraphs: ["Daftar tamu muncul setelah perayaan disepakati. Akun percobaan ini belum memiliki perayaan."],
    },
    pembayaran: {
      eyebrow: visitor,
      title: "Pembayaran",
      paragraphs: ["Belum ada tagihan. Angka pendampingan dibahas setelah cakupan disepakati, jadi halaman ini tidak menampilkan harga."],
    },
    vendor: {
      eyebrow: visitor,
      title: "Vendor",
      paragraphs: ["Belum ada vendor yang dibahas bersama Makna."],
    },
    pesan: {
      eyebrow: visitor,
      title: "Pesan",
      paragraphs: ["Belum ada percakapan tersimpan dengan tim Makna."],
    },
    pemberitahuan: {
      eyebrow: visitor,
      title: "Pemberitahuan",
      paragraphs: ["Belum ada pemberitahuan. Perubahan status konsultasi akan muncul di sini setelah permintaan benar-benar tersimpan."],
    },
    ulasan: {
      eyebrow: visitor,
      title: "Ulasan",
      paragraphs: ["Ulasan dibuka setelah perayaan selesai dan izin publikasi ada. Akun percobaan ini belum memiliki ulasan."],
    },
    pengaturan: {
      eyebrow: visitor,
      title: "Pengaturan akun",
      paragraphs: ["Kata sandi tidak ditampilkan. Perubahan nama atau kata sandi belum tersimpan di luar sesi percobaan ini."],
    },
  },
  kantor: {
    "": {
      eyebrow: office,
      title: "Meja kerja",
      paragraphs: ["Belum ada permintaan konsultasi yang masuk. Akun ini percobaan, jadi kotak kerja masih kosong."],
      points: [
        { title: "Permintaan baru", text: "Belum ada." },
        { title: "Belum ditugaskan", text: "Belum ada." },
        { title: "Tanggung jawab Anda", text: "Belum ada." },
      ],
    },
    permintaan: {
      eyebrow: office,
      title: "Permintaan konsultasi",
      paragraphs: ["Daftar permintaan akan memuat nama, kota, tanggal atau rentang, dan perkiraan tamu setelah formulir konsultasi benar-benar terkirim. Saat ini belum ada baris."],
    },
    konten: {
      eyebrow: office,
      title: "Konten",
      paragraphs: ["Situs masih memakai ilustrasi dan catatan editorial. Belum ada draf yang tersimpan dari panel ini."],
      points: [
        { title: "Portofolio", text: "Ilustrasi konsep. Belum ada cerita klien." },
        { title: "Jurnal", text: "Catatan editorial. Belum ada draf baru." },
        { title: "Paket", text: "Essential, Signature, dan Royal. Harga belum dicantumkan." },
        { title: "Layanan", text: "Halaman layanan sudah tampil di situs." },
      ],
    },
    vendor: {
      eyebrow: office,
      title: "Vendor",
      paragraphs: ["Belum ada vendor yang disusun untuk seorang klien."],
    },
    pesan: {
      eyebrow: office,
      title: "Pesan",
      paragraphs: ["Belum ada catatan internal. Catatan permintaan akan berada di sini setelah ada konsultasi yang tersimpan."],
    },
    pemberitahuan: {
      eyebrow: office,
      title: "Pemberitahuan",
      paragraphs: ["Belum ada pemberitahuan untuk permintaan yang menjadi tanggung jawab Anda."],
    },
    pengaturan: {
      eyebrow: office,
      title: "Pengaturan akun",
      paragraphs: ["Peran anak kantor pada akun percobaan ini tetap staf. Pengelolaan peran lain belum dibuka. Kata sandi tidak ditampilkan."],
    },
  },
  konsumen: {
    "": {
      eyebrow: client,
      title: "Perayaan saya",
      paragraphs: [
        "Ruang ini untuk satu perayaan milik akun yang masuk.",
        "Data diri di bawah mengikuti lembar yang diberikan. Tanggal acara dan angka masih menunggu order di maknafinance.",
      ],
      facts: [
        { label: "Nama acara", value: "Belum terhubung" },
        { label: "Pengantin", value: "Muhammad Zuhri dan Rosa Ustiani" },
        { label: "Tamu", value: "Belum terhubung" },
        { label: "Kontrak", value: "Belum terhubung" },
        { label: "Pembayaran", value: "Belum terhubung" },
        { label: "Pendamping", value: "Belum ditugaskan" },
      ],
    },
    checklist: {
      eyebrow: client,
      title: "Wedding checklist",
      paragraphs: [
        "Daftar persiapan yang sama dengan wedding-app: Lamaran, Pengajian, Akad, dan Resepsi.",
        "Centang memindahkan tugas antara belum mulai dan selesai, lalu tersimpan di peramban akun ini. Sedang dikerjakan menunggu subtugas.",
      ],
    },
    jadwal: {
      eyebrow: client,
      title: "Jadwal",
      paragraphs: ["Tanggal, jam, dan tempat diisi dari prospek maknafinance. Akun ini belum terhubung, jadi kelima acara masih kosong."],
    },
    rundown: {
      eyebrow: client,
      title: "Rundown",
      paragraphs: ["Pilih Lamaran, Akad, atau Resepsi untuk melihat contoh urutan, deskripsi, dan petugas. Petugas di sini adalah peran, belum nama orang. Bukan jadwal yang terhubung. Catatan yang ditambah tersimpan di peramban."],
    },
    cakupan: {
      eyebrow: client,
      title: "Cakupan",
      paragraphs: ["Dua kelompok ini memisahkan yang termasuk pendampingan Makna dan yang masih diurus keluarga. Butirnya mengikuti order, dan akun ini belum terhubung."],
    },
    pembayaran: {
      eyebrow: client,
      title: "Pembayaran",
      paragraphs: ["Nilai kesepakatan, yang sudah dibayar, sisa, dan jatuh tempo tampil dari order akun ini. Pengeluaran internal Makna tidak ditampilkan."],
    },
    berkas: {
      eyebrow: client,
      title: "Berkas",
      paragraphs: ["Kontrak dan persetujuan produk milik acara ini. Belum ada berkas yang bisa diunduh."],
    },
    tamu: {
      eyebrow: client,
      title: "Tamu",
      paragraphs: ["Enam baris di bawah adalah contoh, bukan daftar tamu yang terhubung. Tamu dari formulir atau unggahan tersimpan di peramban akun ini."],
    },
    pesan: {
      eyebrow: client,
      title: "Pesan",
      paragraphs: ["Pendamping belum ditugaskan. Pesan yang ditulis tersimpan di peramban dan belum terkirim."],
    },
    pemberitahuan: {
      eyebrow: client,
      title: "Pemberitahuan",
      paragraphs: ["Perubahan jadwal, pengingat pembayaran, dan tugas checklist akan muncul setelah acara tersimpan."],
    },
    pengaturan: {
      eyebrow: client,
      title: "Pengaturan akun",
      paragraphs: ["Akun percobaan konsumen. Nama pengantin dan angka order tidak diubah dari halaman ini. Kata sandi tidak ditampilkan."],
    },
  },
};

export const dashboardSlugs = [
  "inspirasi",
  "periksa",
  "tamu",
  "pembayaran",
  "permintaan",
  "konten",
  "vendor",
  "pesan",
  "pemberitahuan",
  "ulasan",
  "pengaturan",
  "checklist",
  "jadwal",
  "rundown",
  "cakupan",
  "berkas",
];
