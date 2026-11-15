<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    public function run(): void
    {
        $packages = [
            [
                'slug' => 'essential',
                'name' => 'Essential',
                'summary' => 'Untuk acara keluarga dengan jumlah tamu yang dijaga tetap dekat.',
                'features' => ['Konsep dan palet', 'Rundown satu hari', 'Koordinasi venue'],
                'scope' => 'Palet, rundown satu hari, dan koordinasi venue. Perencanaan vendor dari nol tidak termasuk di cakupan ini.',
                'image_path' => $this->image('essential', 'prosesi.webp'),
                'image_alt' => 'Momen prosesi di bawah naungan taman',
                'sort_order' => 1,
                'paragraphs' => [
                    'Essential untuk perayaan yang selesai dalam satu hari, dengan jumlah tamu yang dijaga tetap dekat. Namanya menandai cakupan yang ramping: suasana hari itu, urutan acaranya, dan cara venue dipakai. Ini paket pendampingan, bukan daftar harga, dan belum mencakup venue, hidangan, atau vendor.',
                    'Konsep dan palet di Essential adalah satu arah visual untuk ruang yang dipakai pada hari itu. Warna dasar dipilih lebih dulu, lalu diterjemahkan ke kain, bunga, dan meja. Palet tidak dipecah menjadi beberapa suasana untuk hari yang berbeda, karena rangkaiannya memang satu hari.',
                    'Rundown satu hari menulis urutan dari tamu datang sampai acara selesai. Jam dikunci hanya untuk momen yang mengumpulkan banyak orang sekaligus. Perpindahan di dalam venue yang sama diberi jeda, supaya keluarga tidak merasa dikejar menit di antara dua bagian acara.',
                    'Koordinasi venue membaca denah, pintu masuk, dan jalur tamu di lokasi yang sudah dipilih. Jika vendor utama sudah ditunjuk, urutan hari disesuaikan dengan mereka. Mencari, membandingkan, dan mengontrak vendor dari nol tidak termasuk di Essential. Bagian itu masuk ketika perencanaan masih terbuka.',
                ],
                'included' => [
                    ['title' => 'Konsep dan palet', 'text' => 'Satu arah visual untuk hari itu. Dasar warna dikunci lebih dulu, kemudian kain, bunga, dan meja mengikutinya. Tidak ada desain ruang kedua untuk hari lain.'],
                    ['title' => 'Rundown satu hari', 'text' => 'Urutan dari kedatangan sampai selesai, dengan jeda di antara bagian. Keluarga memegang versi ringkas. Detail vendor tetap di satu lembar kerja.'],
                    ['title' => 'Koordinasi venue', 'text' => 'Denah, pintu, dan jalur di lokasi yang sudah ada. Titik kumpul keluarga dan arah duduk dicek sebelum dekorasi dikunci.'],
                ],
                'excluded' => [
                    ['title' => 'Vendor dari nol', 'text' => 'Pencarian dan kontrak vendor baru tidak termasuk. Essential menyesuaikan urutan dengan pihak yang sudah ditunjuk, atau dengan pihak yang keluarga urus sendiri.'],
                    ['title' => 'Hari kedua', 'text' => 'Momen di hari lain, termasuk tamu yang menginap, berada di luar cakupan ini. Rangkaian beberapa hari dibaca di Royal.'],
                    ['title' => 'Tagihan pihak lain', 'text' => 'Venue, hidangan, dan vendor tetap tagihan masing-masing. Angka pendampingan Makna juga belum dicantumkan, karena menunggu kota dan tanggal.'],
                ],
                'checks' => [
                    ['title' => 'Satu hari sudah cukup', 'text' => 'Prosesi dan jamuan berada di hari yang sama, tanpa momen resmi di hari lain. Jika ada hari kedua, cakupan ini terlalu ramping.'],
                    ['title' => 'Tamu dijaga tetap dekat', 'text' => 'Jumlah yang kecil membuat satu rundown dan satu palet cukup. Jika tamu melebar atau datang dari luar kota selama beberapa hari, paketnya bergeser.'],
                    ['title' => 'Vendor utama sudah ada', 'text' => 'Keluarga sudah menunjuk pihak utama, atau siap mengurus kontrak itu sendiri. Yang didampingi adalah palet, urutan, dan venue.'],
                ],
            ],
            [
                'slug' => 'signature',
                'name' => 'Signature',
                'summary' => 'Untuk pernikahan dengan prosesi dan resepsi yang ingin terasa utuh.',
                'features' => ['Perencanaan menyeluruh', 'Desain acara', 'Koordinasi hari-H'],
                'scope' => 'Perencanaan, desain, dan koordinasi hari-H untuk prosesi serta resepsi dalam satu rangkaian.',
                'image_path' => $this->image('signature', 'resepsi.webp'),
                'image_alt' => 'Meja resepsi di taman dengan lilin dan untaian lampu',
                'sort_order' => 2,
                'paragraphs' => [
                    'Signature untuk pernikahan yang ingin prosesi dan resepsi terasa satu rangkaian, bukan dua acara yang hanya berurutan di kertas. Pendampingannya mencakup perencanaan, desain acara, dan koordinasi pada hari-H. Biaya kami bahas bersama saat konsultasi.',
                    'Perencanaan menyeluruh dipakai ketika banyak keputusan masih terbuka. Kota, tanggal atau rentang, perkiraan tamu, dan peran tiap vendor dibahas sebelum hari-H. Jika konsep dan vendor sudah lengkap, bagian perencanaan bisa diringkas. Jika belum, bagian itu yang mengisi waktu sebelum desain dikunci.',
                    'Desain acara menyusun palet, tata ruang, dan perjalanan tamu dari prosesi ke resepsi. Di satu venue, dua suasana dipisah lewat zona. Di dua lokasi, jalur pindah ikut dirancang: di mana keluarga berkumpul, berapa jeda yang aman, dan sisi mana yang teduh saat sore.',
                    'Koordinasi hari-H memegang urutan di lokasi. Satu kontak menerima perubahan jam, hujan, atau kedatangan yang bergeser. Prosesi dan resepsi memakai rundown yang sama, supaya pesan untuk keluarga dan vendor tidak saling bertentangan.',
                ],
                'included' => [
                    ['title' => 'Perencanaan menyeluruh', 'text' => 'Keputusan yang masih terbuka didampingi sebelum hari-H: peran vendor, urutan dua momen, dan hal yang harus dikunci lebih dulu. Angka biaya menunggu kota, tanggal, dan perkiraan tamu.'],
                    ['title' => 'Desain acara', 'text' => 'Palet, tata ruang, dan jalur tamu dirancang agar prosesi dan resepsi terasa sambung. Zona atau perpindahan lokasi ikut dibaca, bukan hanya dekorasi meja.'],
                    ['title' => 'Koordinasi hari-H', 'text' => 'Satu kontak memegang perubahan di lokasi. Keluarga dan vendor membaca urutan yang sama, dari prosesi sampai resepsi selesai.'],
                ],
                'excluded' => [
                    ['title' => 'Rangkaian lebih dari satu hari', 'text' => 'Momen di hari terpisah, termasuk tamu yang datang dari luar kota dan menginap, tidak masuk ke Signature. Itu cakupan Royal.'],
                    ['title' => 'Tagihan venue dan vendor', 'text' => 'Pendampingan tidak menggantikan kontrak venue, hidangan, busana, atau vendor. Masing-masing tetap ditagih oleh pihaknya.'],
                    ['title' => 'Biaya yang dibahas kemudian', 'text' => 'Biaya Makna kami sesuaikan setelah kota, tanggal, dan perkiraan tamu diketahui.'],
                ],
                'checks' => [
                    ['title' => 'Dua momen dalam satu rangkaian', 'text' => 'Ada prosesi dan ada resepsi yang ingin terasa utuh. Jika acaranya hanya satu bagian di satu hari, Essential sudah cukup.'],
                    ['title' => 'Keputusan belum semuanya tutup', 'text' => 'Konsep, vendor, atau jalur tamu masih perlu didampingi. Signature mengisi bagian yang belum siap, lalu mengikatnya pada hari-H.'],
                    ['title' => 'Masih satu hari acara', 'text' => 'Prosesi dan resepsi berjalan dalam satu rangkaian hari. Begitu ada momen resmi di hari lain, cakupannya dibaca ulang.'],
                ],
            ],
            [
                'slug' => 'royal',
                'name' => 'Royal',
                'summary' => 'Untuk rangkaian beberapa hari, termasuk tamu yang datang dari luar kota.',
                'features' => ['Beberapa momen acara', 'Pengarahan vendor', 'Pendampingan keluarga'],
                'scope' => 'Beberapa momen dalam lebih dari satu hari, termasuk tamu yang datang dari luar kota.',
                'image_path' => $this->image('royal', 'evening.webp'),
                'image_alt' => 'Meja resepsi pada malam hari dengan cahaya hangat',
                'sort_order' => 3,
                'paragraphs' => [
                    'Royal untuk rangkaian yang tidak selesai dalam satu hari. Lamaran, prosesi, resepsi, atau makan keluarga bisa berdiri sebagai momen sendiri. Tamu yang datang dari luar kota membutuhkan urutan yang menjelaskan di mana mereka harus berada pada tiap hari. Biaya kami bahas bersama saat konsultasi.',
                    'Beberapa momen acara ditulis sebagai satu rangkaian, bukan sebagai daftar yang terpisah. Jam dikunci hanya jika banyak pihak harus hadir bersamaan. Di antaranya ada jeda untuk istirahat, perpindahan venue, dan tamu yang baru tiba.',
                    'Pengarahan vendor menyatukan pihak yang bekerja di hari berbeda. Vendor hari pertama perlu tahu apa yang tidak boleh berubah sebelum hari berikutnya. Satu lembar kerja memegang urutan, supaya pesan yang beredar tidak saling bertentangan.',
                    'Pendampingan keluarga membantu orang yang menyambut tamu dari luar kota. Mereka mendapat versi ringkas: berkumpul, momen, lalu pindah. Detail vendor tetap di koordinator. Keluarga tidak memegang dua rundown yang berbeda untuk hari yang sama.',
                ],
                'included' => [
                    ['title' => 'Beberapa momen acara', 'text' => 'Tiap momen punya peran di dalam rangkaian, dengan jeda di antaranya. Urutan menjelaskan hari, tempat berkumpul, dan momen yang memang dikunci jamnya.'],
                    ['title' => 'Pengarahan vendor', 'text' => 'Vendor di hari yang berbeda membaca lembar yang sama. Yang harus bertahan sampai hari berikutnya ditulis jelas, supaya pekerjaan hari pertama tidak dibongkar di hari kedua.'],
                    ['title' => 'Pendampingan keluarga', 'text' => 'Keluarga yang menyambut tamu luar kota memegang versi ringkas. Satu kontak tetap menjadi jalur perubahan, termasuk jika jam atau lokasi bergeser.'],
                ],
                'excluded' => [
                    ['title' => 'Satu hari yang sederhana', 'text' => 'Jika perayaan selesai dalam satu hari dan tamunya tetap dekat, Royal lebih luas dari yang diperlukan. Essential atau Signature lebih sesuai.'],
                    ['title' => 'Penginapan dan transport tamu', 'text' => 'Pendampingan menyusun urutan dan titik kumpul. Tiket, kamar, dan kendaraan tamu tetap diurus sesuai kesepakatan keluarga, bukan otomatis termasuk.'],
                    ['title' => 'Tagihan dan angka pendampingan', 'text' => 'Venue, hidangan, dan vendor tetap tagihan masing-masing. Biaya Makna dibahas setelah jumlah hari, kota, dan perkiraan tamu diketahui.'],
                ],
                'checks' => [
                    ['title' => 'Lebih dari satu hari', 'text' => 'Ada momen resmi di hari yang berbeda. Satu resepsi yang molor sampai malam tetap satu hari, dan tidak otomatis menjadi Royal.'],
                    ['title' => 'Tamu dari luar kota', 'text' => 'Sebagian tamu perlu urutan kedatangan, titik kumpul, dan hari mana yang wajib mereka hadiri. Itu yang membuat rundownnya lebih panjang.'],
                    ['title' => 'Vendor tidak bekerja di hari yang sama', 'text' => 'Ada pihak yang masuk di hari pertama dan pihak lain di hari berikutnya. Mereka perlu satu pengarahan, bukan pesan terpisah.'],
                ],
            ],
        ];

        foreach ($packages as $package) {
            Package::query()->updateOrCreate(
                ['slug' => $package['slug']],
                $package,
            );
        }
    }

    private function image(string $slug, string $file): string
    {
        $relative = "packages/{$slug}.webp";
        $directory = storage_path('app/public/packages');

        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        copy(dirname(base_path())."/web/public/weddings/placeholders/{$file}", storage_path("app/public/{$relative}"));

        return $relative;
    }
}
