# Makna Wedding 2027

Starter lokal untuk Next.js dan Laravel Filament. Lihat [blueprint](docs/blueprint.md) dan [kontrak API](contracts/openapi.yaml).

Dari folder proyek, buka dua terminal.

```sh
cd apps/web
npm run dev -- --hostname 127.0.0.1 --port 3000

cd /Applications/XAMPP/xamppfiles/htdocs/application/maknawedding.com/apps/web && npm run dev -- --hostname 127.0.0.1 --port 3000
```

```sh
cd apps/cms
php -v
php artisan serve --host=127.0.0.1 --port=8000
```

Gunakan PHP 8.4 yang tersedia di terminal untuk Laravel 13. File proyek berada di htdocs. .htaccess memblokir akses langsung lewat Apache XAMPP untuk melindungi file internal.

Buka frontend di http://127.0.0.1:3000 dan panel Filament di http://127.0.0.1:8000/admin. Buat akun panel lokal dengan `php artisan make:filament-user` dari apps/cms. Database memakai MySQL di XAMPP: host `127.0.0.1`, port `3306`, nama database `maknawedding.com`.

## Urutan model, selain Dashboard

`User` sudah ada untuk masuk panel Filament. Jangan dibuat ulang. Peran panel memakai Filament Shield. Akun situs percobaan (pengunjung, kantor, konsumen) disimpan di tabel users yang sama dan tidak membuka panel. Akun panel memakai `super_admin`.

Dashboard belum masuk urutan ini: perayaan, checklist, jadwal, rundown, cakupan, pembayaran, berkas, tamu, pesan, pemberitahuan, dan banner promosi.

Buat dari `apps/cms`, satu per satu, beserta migration-nya. Yang di bawah menempel ke yang di atas.

1. **Media** — tabel `media`. Foto dan video untuk halaman publik. Dibuat paling awal karena model lain menempel ke aset ini.
2. **SiteSetting** — tabel `site_settings`. Satu baris pengaturan situs: nama dan SEO bawaan. Gambar bawaan menempel ke Media.
3. **Page** — tabel `pages`. Halaman tetap: beranda dan tentang. Hero menempel ke Media. Privasi menyusul bila halamannya dibuat.
4. **Service** — tabel `services`. Empat kartu di `/layanan`: nama, peran, ringkasan, butir cakupan, dan path gambar. Butir cakupan disimpan sebagai daftar, bukan model terpisah.
5. **Package** — tabel `packages`. Tiga kartu di `/paket`: Essential, Signature, dan Royal. Tiap kartu menyimpan ringkasan, butir, cakupan singkat, gambar halaman cakupan, penjelasan, butir termasuk, butir di luar cakupan, dan syarat cocok. Harga tidak diisi.
6. **PortfolioConcept** — tabel `portfolio_concepts`. Enam kartu galeri di `/portofolio`: judul, kategori Wedding, Engagement, atau Event, ringkasan, dan daftar foto yang diunggah. Foto pertama menjadi gambar kartu. Bukan cerita klien, jadi kota, venue, dan tanggal tidak ada.
7. **WeddingMedia** — belum. Urutan foto konsep sudah ada di dalam kartu portofolio.
8. **Article** — tabel `articles`. Enam catatan di `/jurnal`: topik, judul, ringkasan, gambar yang diunggah, paragraf, dan butir yang dicek. Ini susunan editorial. Nama venue, tanggal, dan cerita pasangan tidak diisi.
9. **Testimonial** — tabel `testimonials`. Kartu kutipan di beranda. Boleh menempel ke Wedding. Biarkan kosong sampai ada kutipan yang diizinkan.
10. **Inquiry** — tabel `inquiries`. Isian formulir `/konsultasi`: nama, surel, telepon, kota, tanggal, layanan, pesan, dan persetujuan. Menempel ke Service. Penugasan ke User menyusul.
11. **InquiryNote** — tabel `inquiry_notes`. Catatan staf pada satu permintaan. Menempel ke Inquiry dan User.

`OutboxEvent` belum. Itu antrian pemberitahuan ke situs, bukan isi halaman.
