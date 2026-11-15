# Makna Wedding 2027 · Blueprint implementasi

Website publik membawa calon klien dari galeri pernikahan dan halaman layanan ke konsultasi. Tim konten menerbitkan materi lewat Filament. Account Manager (AM) menangani inquiry di panel yang sama. Rilis awal menggunakan Bahasa Indonesia (`id-ID`), IDR, zona bisnis Asia/Jakarta, serta satu profil brand.

## 1. Struktur proyek

Satu repositori dengan dua aplikasi yang dirilis independen. Baseline yang diusulkan adalah Next.js 16 App Router, TypeScript strict, Tailwind CSS 4, GSAP + `@gsap/react`, Laravel 13 dengan PHP 8.4, Filament 5, MySQL 8.4 dan Redis. Kunci patch dengan lockfile npm dan Composer. Saat bootstrap, verifikasi resolusi Composer untuk Laravel, Filament dan plugin terpilih. Gunakan Node 24 LTS dan runtime yang sama di lokal, CI, serta produksi. [Next.js App Router](https://nextjs.org/docs/app) · [Instalasi Filament](https://filamentphp.com/docs/5.x/introduction/installation) · [Deployment Laravel](https://laravel.com/docs/13.x/deployment)

```text
maknawedding.com/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── layout.tsx, globals.css, sitemap.ts, robots.ts
│   │   │   │   ├── (marketing)/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── tentang/page.tsx
│   │   │   │   │   ├── layanan/[slug]/page.tsx
│   │   │   │   │   ├── portofolio/[slug]/page.tsx
│   │   │   │   │   ├── paket/page.tsx
│   │   │   │   │   ├── jurnal/[slug]/page.tsx
│   │   │   │   │   ├── konsultasi/page.tsx
│   │   │   │   │   └── privasi/page.tsx
│   │   │   │   └── api/{inquiries,revalidate}/route.ts
│   │   │   ├── components/{ui,layout,sections,motion}/
│   │   │   ├── features/{portfolio,inquiries}/
│   │   │   ├── lib/{api,seo}/
│   │   │   └── styles/tokens.css
│   │   ├── public/
│   │   ├── tests/e2e/
│   │   └── next.config.ts
│   └── cms/
│       ├── app/
│       │   ├── Models/
│       │   ├── Filament/{Resources,Pages,Widgets}/
│       │   ├── Providers/Filament/AdminPanelProvider.php
│       │   ├── Http/{Controllers/Api/V1,Requests,Resources}/
│       │   ├── Actions/{Publishing,Inquiries}/
│       │   ├── Jobs/
│       │   └── Policies/
│       ├── database/{migrations,factories,seeders}/
│       ├── routes/{api,console}.php
│       └── tests/Feature/
├── contracts/openapi.yaml
└── docs/blueprint.md
```

Buat juga `page.tsx` untuk indeks `/layanan`, `/portofolio` dan `/jurnal` pada segmen induknya. Tambahkan `not-found.tsx` dan `error.tsx` di grup marketing. Next merender konten dan metadata di server. Client Components menangani interaksi seperti menu, galeri, form dan GSAP. Modul `lib/api` diberi `server-only`, mengambil tipe dari OpenAPI dan memetakan error Laravel ke status UI.

## 2. Ethereal Modern

Komposisi mengikuti mockup rujukan. Hero menempatkan judul serif di kiri dan pasangan di sisi kanan desktop. Di ponsel, editor bisa memilih crop potret dan teks berpindah ke panel solid bila area foto terlalu ramai. Kain lilac menjadi lapisan dekoratif di tepi foto. Setelah hero, permukaan ivory dan bidang foto besar membentuk ritme editorial. Angka seperti “400+” serta cerita pasangan dari mockup baru boleh tampil setelah tim Makna memasukkan data dan foto yang disetujui.

| Token | Nilai | Penggunaan |
|---|---|---|
| Ivory / Paper | `#F7F5EE` / `#FFFFFF` | Latar halaman dan panel formulir |
| Ink / Muted | `#2E2544` / `#625970` | Teks utama dan sekunder di permukaan terang |
| Brand / Hover | `#685B87` / `#52446E` | CTA solid dengan teks putih |
| Mist Lilac | `#D9C8F0` | Bidang editorial dan CTA hero dengan teks Ink |
| Luminous Blue | `#5B6CFF` | Aksen grafis |
| Meadow Sage / Clay Rose | `#A8BFA3` / `#D8A79A` | Bidang aksen dengan teks Ink |
| Control border | `#82758F` | Batas input di permukaan terang |
| Error / Success | `#9C304B` / `#365A43` | Status pada permukaan terang dengan label teks |

- **Tipografi** menggunakan Playfair Display 400 dan 400 italic untuk judul, serta Plus Jakarta Sans 400/500/600/700 untuk isi dan kontrol. Muat via `next/font`, pasang variabel `--font-playfair` dan `--font-jakarta` di layout. Display 44–96 px dengan line-height 1,02, H2 32–60 px / 1,12, H3 22–32 px / 1,2, isi 16–18 px / 1,65. Batasi prosa sekitar 65 karakter per baris.
- **Grid** menggunakan 4 kolom pada ponsel, 8 mulai 768 px, 12 mulai 1024 px. Lebar maksimum 1440 px termasuk gutter. Gutter 16–64 px, jarak antarseksi 64–128 px. Gunakan kelipatan 8 px untuk komposisi, dengan langkah 4 px untuk detail kontrol. Radius kartu 24 px, panel unggulan 28 px dan tombol berbentuk pil.
- **Media** menggunakan foto Makna yang telah mendapat izin publikasi. Simpan focal point per aset dan crop hero opsional untuk ponsel. Gunakan gradien gelap atau panel solid untuk menjaga kontras teks pada tiap crop. Galeri menggunakan rasio 4:3, kartu portofolio 3:2, dan gambar jurnal 16:9.
- **Tailwind** mengimpor `@import "tailwindcss";` lalu `@import "../styles/tokens.css";` dari `src/app/globals.css`. Gunakan utilitas seperti `bg-ivory text-ink`, `bg-brand text-paper hover:bg-brand-hover`, dan `rounded-card`. [Tailwind theme variables](https://tailwindcss.com/docs/theme)

### Komponen

| Komponen | Data dan perilaku |
|---|---|
| `SiteHeader`, `SiteFooter` | Navigasi semantik, `aria-current`, menu mobile dengan fokus terkendali, CTA konsultasi, kontak dan privasi. |
| `Button`, `Field`, `SectionHeading`, `MediaImage` | Variasi primary, secondary, text. Tautan untuk navigasi, tombol untuk aksi. Field punya label, bantuan dan error terhubung. Media memakai dimensi, alt dan focal point dari CMS. |
| `CinematicHero` | H1, intro, CTA ke konsultasi dan tombol video opsional. Gambar server-rendered, overlay kontras, kain dekoratif. Dialog video menyediakan kontrol dan mengembalikan fokus saat ditutup. |
| `ExperienceSection`, `ServicesGrid` | Intro brand, statistik opsional yang terverifikasi, kartu layanan dan tautan ke detail. |
| `FeaturedWedding`, `PortfolioGrid`, `WeddingGallery` | Kartu unggulan mengarah ke cerita. Indeks punya paginasi melalui URL. Galeri tetap bisa dibaca sebagai grid dan menyediakan dialog gambar dengan tombol sebelumnya/berikutnya. |
| `PackageCard`, `TestimonialList`, `JournalCard` | Paket dengan fitur dan CTA berisi slug paket. Testimoni tersusun statis. Jurnal menampilkan tanggal, judul dan ringkasan. |
| `ConsultationForm`, `WhatsAppLink` | Form menampilkan status awal, kirim, error dan sukses. WhatsApp memakai nomor brand dari CMS dan pesan umum tanpa data yang diisi di form. Klik WhatsApp tercatat sebagai klik bila analitik tersedia. Inquiry masuk CMS setelah form tersimpan. |

Urutan homepage: hero → pengalaman Makna → layanan → featured weddings → paket → testimoni → jurnal → konsultasi. Sembunyikan blok opsional yang kosong. Untuk daftar, sediakan empty state dengan tautan relevan. Semua halaman detail punya canonical, judul dan deskripsi SEO, serta fallback gambar OG dari pengaturan situs.

## 3. CMS dan skema MySQL

Gunakan bigint untuk PK/FK internal, timestamp UTC untuk waktu sistem, dan DATE untuk tanggal acara. Field yang memiliki garis miring di tabel menunjukkan pilihan status atau nilai. Field teks wajib kecuali ditandai opsional atau bergantung tipe. Relasi media wajib siap sebelum publikasi.

| Tabel | Kolom utama dan relasi |
|---|---|
| `site_settings` | Singleton. `brand_name`, `privacy_version`, `whatsapp_e164`, `contact_email`, `social_links` JSON, `default_seo_title`, `default_seo_description`, `default_og_media_id` FK. |
| `pages` | `slug` unik (`home/about/privacy`), `title`, `summary`, `body_html` opsional, `hero_media_id`, `mobile_hero_media_id`, `hero_video_id` opsional, `highlights` JSON berupa daftar `label/value`, metadata SEO dan publikasi. |
| `services` | Slug unik, title, summary, body_html, cover_media_id, sort_order, SEO dan publikasi. |
| `weddings` | Slug unik, title, summary, body_html, city, venue opsional, event_date opsional, cover_media_id, featured boolean, sort_order, SEO dan publikasi. |
| `wedding_media` | wedding_id, media_id, sort_order, caption opsional, alt_override opsional. Unik `(wedding_id, media_id)`. |
| `packages` | Slug unik, service_id opsional, title, summary, features JSON string[], price_from_idr unsigned bigint opsional, sort_order, publikasi. Harga kosong ditampilkan sebagai “Minta penawaran”. |
| `testimonials` | display_name, quote, wedding_id opsional, consent_recorded_at, sort_order, publikasi. |
| `articles` | Slug unik, title, summary, body_html, author_name, cover_media_id, SEO dan publikasi. |
| `media` | storage_key unik, kind image/video, mime, byte_size, width/height untuk gambar, alt_text, focal_x/focal_y 0–1 default 0,5, poster_media_id untuk video, captions_storage_key opsional, status processing/ready/failed, rights_confirmed_at. |
| `inquiries` | public_id ULID unik, idempotency_key UUID unik, request_hash, name, email opsional, phone opsional, service_id/package_id opsional, event_date opsional, city, message opsional, consent_at, privacy_version, source_path opsional, status, assigned_to FK users opsional. |
| `inquiry_notes` | inquiry_id, user_id, body, created_at. |
| `users` | User bawaan Laravel, role admin/editor/publisher/account_manager dan status aktif. |
| `outbox_events` | event_id UUID unik, event_type, payload JSON, created_at, delivered_at opsional, attempts, next_attempt_at. Menjamin invalidasi cache dan notifikasi dapat dicoba ulang setelah transaksi commit. |

Kolom SEO adalah `seo_title`, `seo_description`, `og_media_id` opsional. Publikasi memakai `status` draft/published/archived dan `published_at` UTC nullable. Public scope mewajibkan published dan waktu terbit <= sekarang. MVP memakai publish langsung, slug dikunci setelah publikasi pertama, dan edit rekaman terbit langsung terlihat setelah cache disegarkan. Unpublish mengubah status ke archived. Indeks awal meliputi `(status,published_at)`, `(status,sort_order,id)`, dan `(assigned_to,status,created_at)` pada tabel yang sesuai. Cegah penghapusan aset atau entitas yang masih direferensikan, gunakan archive untuk entitas yang pernah dipublikasikan, dan cascade hanya untuk baris anak seperti pivot galeri.

Filament menyediakan resource untuk konten dan aset, halaman singleton pengaturan, dan inbox inquiry. Editor mengedit draft, publisher meninjau serta menerbitkan/mengarsipkan, admin mengelola akun dan penugasan, AM melihat inquiry yang ditugaskan padanya dan menambahkan catatan. Publisher/admin mengedit rekaman yang sudah terbit. Tegakkan aturan dengan policies dan scope pada daftar serta akses rekaman langsung. Status inquiry bergerak dari new → contacted → qualified → won/lost, dengan lost juga tersedia dari new/contacted. Simpan perubahan penugasan dan status ke audit log aplikasi.

Validasi tipe/ukuran upload, proses aset melalui worker, bersihkan metadata sensitif, dan publikasikan hanya turunan aset yang siap serta disetujui. Sanitasi HTML CMS di server dengan allowlist elemen dan URL. Pisahkan data inquiry dari API konten, log dan analitik. Batasi akses PII, gunakan penyimpanan serta cadangan terenkripsi, dan dokumentasikan masa retensi sebelum rilis.

## 4. Integrasi dan perilaku API

[Kontrak OpenAPI](../contracts/openapi.yaml) mendefinisikan body, field, status dan pagination. Gunakan `/api/v1` pada Laravel. Public GET bersifat read-only. Rute /tentang dan /privasi membaca /pages/about dan /pages/privacy. Rute /portofolio menggunakan /weddings, sedangkan /jurnal menggunakan /articles. Paginasi memakai 12 entri per halaman. Halaman melampaui batas mengembalikan daftar kosong dan metadata total. Relasi ke konten yang diarsipkan tidak disertakan dalam respons publik. Browser mengirim form ke `POST /api/inquiries` pada origin Next, lalu Next meneruskan request ke Laravel dengan token server dan `Idempotency-Key`. Terapkan pemeriksaan origin, pembatasan berdasarkan IP tepercaya di ingress Next, pembatasan tambahan di Laravel dan limit body 16 KiB. Endpoint Next meneruskan status, error field dan `Retry-After`, dengan fallback `503` saat upstream gagal. Browser membuat satu UUID per submission dan menyimpannya untuk retry dari payload yang sama. Perubahan payload membuat UUID baru. Pertahankan input saat error dan arahkan fokus ke ringkasan validasi atau konfirmasi.

Laravel menormalisasi payload, memeriksa idempotency key terlebih dahulu untuk replay yang sah, lalu memvalidasi versi privasi aktif dan referensi yang masih terbit untuk inquiry baru. Paket dengan service terhubung harus sesuai dengan service yang dikirim, atau service diturunkan dari paket bila dihilangkan. Simpan inquiry serta event notifikasi dalam satu transaksi. Jika request paralel memakai key sama, gunakan constraint unik dan baca ulang rekaman pemenang. Kembalikan 201 dan receipt yang sama untuk replay identik, 409 untuk payload berbeda. Worker mengirim notifikasi AM setelah commit, dengan deduplikasi berdasarkan ID inquiry.

Untuk cache Next, gunakan model App Router berbasis `fetch(..., { next: { revalidate: 300, tags } })` dengan Cache Components dinonaktifkan. Tandai semua pembacaan publik dengan `makna-content` pada MVP. Perubahan konten yang memengaruhi publik menghasilkan event outbox dalam transaksi yang sama. Laravel mengirim POST ke `/api/revalidate` dengan Bearer secret khusus. Handler memvalidasi token dan skema lalu memanggil `revalidateTag('makna-content', { expire: 0 })`. Retry dengan backoff dan pantau outbox yang tertunda. Untuk penarikan darurat, verifikasi halaman dan CDN setelah purge serta cabut akses media yang ditarik. Bedakan 404 CMS yang sah dari timeout/5xx agar kegagalan backend tidak merusak hasil SEO. [Panduan cache Next.js](https://nextjs.org/docs/app/guides/caching-without-cache-components) · [revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)

## 5. Motion dan aksesibilitas

| Gerakan | Spesifikasi |
|---|---|
| Hero | Reveal dekorasi maksimum 950 ms, perpindahan 12 px. Teks, CTA dan gambar utama sudah tampil pada render pertama. Silk bergerak sekali, maksimum 1,2 detik. |
| Reveal seksi | `ScrollTrigger` sekali saat area memasuki bagian bawah viewport, 650 ms, offset 16 px. Animasikan aksen atau gambar tanpa menunda konten utama. |
| Cinematic scroll | Efek opsional pada media unggulan mulai 1024 px dengan pointer presisi, translasi maksimum 24 px di dalam crop. Scroll native tetap utuh. |
| Galeri | Pergantian foto atas aksi pengguna, 250 ms. Tombol tetap di posisi yang sama. Indikator aksesibel menyebut posisi gambar. |
| Kontrol | Transisi warna atau opacity 180 ms. Fokus langsung terlihat. |

Gunakan `useGSAP` dengan ref yang membatasi scope dan `gsap.matchMedia()` untuk breakpoint serta preferensi motion. Panggil `revert()` saat cleanup untuk konteks media. Pada `prefers-reduced-motion: reduce`, tampilkan tampilan akhir statis, tanpa parallax atau transisi rute. Video hero bersifat opt-in, memiliki poster dan kontrol native, serta caption jika mengandung ujaran atau audio bermakna. Lapisan dekoratif memakai `aria-hidden` dan `pointer-events: none`. [GSAP dengan React](https://gsap.com/resources/React/)

Target WCAG 2.2 AA. Kontras teks biasa minimum 4,5:1, teks besar 3:1, batas kontrol penting dan indikator fokus 3:1 terhadap warna bersebelahan. Target proyek untuk tombol utama dan kontrol galeri adalah 44×44 CSS px. Gunakan skip link, landmark, heading terurut, fokus terlihat, serta `lang="id"`. Dialog menerima fokus, menahannya saat terbuka, mendukung Escape, dan mengembalikan fokus ke pemicu. Form memakai `aria-invalid` dan `aria-describedby`, serta status pengiriman yang diumumkan. Uji zoom 200%, reflow 320 px, keyboard, screen reader, dan mode reduced motion. [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

## 6. Deployment dan urutan rilis

| Host usulan | Peran |
|---|---|
| `maknawedding.com` | Next.js di Vercel atau runtime Node dengan cache yang dapat diinvalidasi lintas instance. |
| `api.maknawedding.com` | Laravel di belakang HTTPS, hanya rute API dan health check yang diperlukan. |
| `admin.maknawedding.com` | Deployment Laravel yang sama, Filament terikat domain admin dengan session cookie host-only, HTTPS dan MFA. |
| `media.maknawedding.com` | CDN untuk turunan publik dari object storage. Original disimpan privat. |

- **Lokal dan staging.** Jalankan Next dan Laravel terpisah dengan MySQL/Redis lokal. Seed contoh konten dengan foto yang diizinkan dan setidaknya satu record draft untuk pengujian. Gunakan lingkungan staging yang terproteksi dengan basis data, bucket dan kredensial sendiri.
- **Konfigurasi.** Next membutuhkan `CMS_API_BASE_URL` termasuk `/api/v1`, `CMS_INQUIRY_TOKEN`, `REVALIDATION_SECRET`, dan `SITE_URL`. Laravel membutuhkan `APP_KEY`, `APP_URL`, `ADMIN_DOMAIN`, kredensial DB/Redis/storage/mail, `CMS_INQUIRY_TOKEN`, `REVALIDATION_SECRET` dan `WEB_REVALIDATE_URL`. Kelola secret di platform hosting dan izinkan host media eksplisit di Next Image. Laravel berjalan dengan `APP_DEBUG=false`.
- **Rilis.** CI menjalankan build Next, lint/typecheck, validasi OpenAPI, dan tes fitur Laravel. Ambil cadangan sebelum migrasi produksi, gunakan migrasi kompatibel dengan versi lama, lalu jalankan `php artisan migrate --force`, `php artisan optimize`, dan restart worker setelah deploy. Sediakan worker Redis dan scheduler untuk outbox. Deploy backend sebelum frontend bila ada field tambahan. Rollback memakai artefak sebelumnya dengan skema kompatibel. [Deployment Laravel](https://laravel.com/docs/13.x/deployment)
- **Verifikasi.** Dari Filament, terbitkan dan arsipkan konten lalu cek halaman, sitemap, cache dan draft yang terlindungi. Kirim inquiry dari ponsel dan ulangi request dengan key sama untuk memastikan satu record. Uji akses AM terhadap inquiry pengguna lain, error form, submit setelah timeout, dan retry outbox. Pantau 5xx, umur antrean, error upload, kegagalan invalidasi dan tingkat keberhasilan submit.
- **Performa.** Prioritaskan satu gambar hero via Next Image, beri `sizes` dan dimensi untuk semua gambar, lazy-load galeri dan video, serta tunda GSAP untuk seksi di bawah lipatan. Target produksi pada persentil ke-75 mobile adalah LCP ≤2,5 s, INP ≤200 ms dan CLS ≤0,1. Sebelum data produksi tersedia, gunakan profil mobile yang konsisten sebagai tolok ukur awal.

### Tahapan implementasi

1. Bootstrap dua aplikasi, jalankan migration awal, pasang token dan font, serta hasilkan tipe TypeScript dari OpenAPI.
2. Bangun slice homepage → portofolio → konsultasi. Terbitkan satu wedding dari Filament, tampilkan di Next, lalu pastikan inquiry masuk inbox dan dapat ditugaskan.
3. Lengkapi layanan, paket, jurnal, testimoni, SEO dan media. Terapkan validasi publishing dan pengolahan aset.
4. Tambahkan motion setelah layout statis stabil. Verifikasi keyboard, reduced motion, ukuran layar, performa, retry dan rollback di staging sebelum cutover.

Keputusan awal yang perlu dikonfirmasi sebelum produksi adalah materi foto dan angka yang telah disetujui, nomor WhatsApp brand, alur penugasan AM, masa retensi inquiry dan penyedia hosting. Folder tree menggambarkan target implementasi. Starter yang tersedia berisi token CSS dan kontrak OpenAPI.
