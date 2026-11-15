# Deploy maknawedding.com

Monorepo: `apps/web` (Next.js) + `apps/cms` (Laravel/Filament).  
Repo: `https://github.com/retriyuselli/maknawedding.com` · branch `main`

| Domain | Role | Cara update |
| --- | --- | --- |
| `maknawedding.com` | Next.js (Node Hostinger) | `git push` → auto-deploy |
| `admin.maknawedding.com` | Filament (PHP) | sync CMS (bukan `git pull`) |

SSH server:

```bash
ssh -p 65002 u380354370@193.203.173.241
```

---

## 1. Local — git push origin main

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/application/maknawedding.com

git status
git add .
git commit -m "Update"
git push origin main
```

Setelah push sukses, Hostinger membangun ulang `apps/web` dan mempublikasikan ke `maknawedding.com` (Git auto-deploy aktif).

### Jika push 403 / token salah (Cursor)

Terminal Cursor kadang memakai login GitHub yang salah. Ulangi push dengan askpass dimatikan; password = PAT **Makna Wedding Com** di `info.md`:

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/application/maknawedding.com
env -u GIT_ASKPASS -u SSH_ASKPASS git push "https://retriyuselli@github.com/retriyuselli/maknawedding.com.git" main
```

Username: `retriyuselli` · Password: paste PAT wedding (bukan token finance).

---

## 2. Server — terminal

### A. Situs publik Next.js (`maknawedding.com`)

Biasanya **tidak perlu** `git pull` di server. Folder `public_html` diisi hasil build Hostinger, bukan clone git biasa.

Cukup pastikan push lokal sudah masuk `main`. Cek live:

- https://maknawedding.com/
- https://maknawedding.com/produk

Kalau auto-deploy gagal (misalnya error clone), redeploy dari hPanel / Hostinger API, atau push ulang ke `main`.

### B. Panel admin Filament (`admin.maknawedding.com`)

Path admin **bukan** git repository (`git pull` akan gagal: *not a git repository*). Update dengan sync CMS dari monorepo yang sudah ada di server Node, lalu clear cache Laravel.

```bash
ssh -p 65002 u380354370@193.203.173.241
```

Di server:

```bash
# Sumber: monorepo di domain Node (setelah auto-deploy / build)
SRC=/home/u380354370/domains/maknawedding.com/public_html/apps/cms
DST=/home/u380354370/domains/admin.maknawedding.com

# Cadangkan env & storage admin
# lalu sync kode CMS (jangan timpa .env / storage)
rsync -av --delete \
  --exclude='.env' \
  --exclude='storage/' \
  --exclude='node_modules/' \
  --exclude='vendor/' \
  "$SRC/" "$DST/"

cd "$DST"
# Jika composer.json berubah:
# /opt/alt/php84/usr/bin/php /usr/local/bin/composer install --no-dev --optimize-autoloader

/opt/alt/php84/usr/bin/php artisan migrate --force
/opt/alt/php84/usr/bin/php artisan optimize:clear
```

Catatan path: sesuaikan jika di server `apps/cms` tidak ikut di `public_html` Node (Hostinger kadang hanya mem-publish output Next). Kalau `SRC` kosong, sync dari Mac:

```bash
# Dari Mac (lokal) — sync apps/cms ke admin, jaga .env & storage
rsync -avz --delete \
  -e "ssh -p 65002" \
  --exclude='.env' \
  --exclude='storage/' \
  --exclude='node_modules/' \
  --exclude='.git/' \
  /Applications/XAMPP/xamppfiles/htdocs/application/maknawedding.com/apps/cms/ \
  u380354370@193.203.173.241:/home/u380354370/domains/admin.maknawedding.com/
```

Lalu di server:

```bash
cd /home/u380354370/domains/admin.maknawedding.com
/opt/alt/php84/usr/bin/php artisan migrate --force
/opt/alt/php84/usr/bin/php artisan optimize:clear
```

Jangan jalankan `db:seed` di production kecuali memang disengaja.

---

## Ringkas

```text
Lokal:  commit → git push origin main
Web:    otomatis build & publish (Hostinger Node)
Admin:  rsync CMS + artisan migrate / optimize:clear
```
