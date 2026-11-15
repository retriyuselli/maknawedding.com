<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $articles = [
            [
                'slug' => 'cahaya-sore-di-venue',
                'marker' => 'Contoh susunan',
                'topic' => 'Venue',
                'title' => 'Membaca cahaya sore di venue terbuka',
                'summary' => 'Cara membaca arah cahaya sore di halaman terbuka sebelum jam prosesi dan dekorasi dikunci.',
                'image_path' => $this->image('cahaya-sore-di-venue', 'prosesi.webp'),
                'image_alt' => 'Suasana akad nikah di paviliun taman',
                'sort_order' => 1,
                'paragraphs' => [
                    'Cahaya sore di venue terbuka berubah cepat. Pada pukul tiga halaman masih terang dan rata. Satu jam kemudian bayangan pohon sudah memanjang, dan wajah orang yang duduk menghadap matahari mulai silau. Jam prosesi lebih aman dipilih setelah venue dilihat pada jam yang mendekati akad. Foto siang hari tidak menunjukkan perubahan itu.',
                    'Berdiri di posisi penghulu atau petugas prosesi, lalu lihat ke arah keluarga. Catat dari mana matahari masuk, sisi mana yang sudah teduh, dan sisi mana yang masih panas. Cahaya yang datang dari samping biasanya lebih ramah untuk wajah daripada cahaya yang jatuh tepat dari depan. Arah duduk ini yang menentukan apakah sore terasa lembut atau menyilaukan.',
                    'Dekorasi menyusul setelah cahaya terbaca. Kain, bunga, dan backdrop tidak memperbaiki silau. Jika satu sisi paviliun terlalu terang, geser arah duduk keluarga atau majukan jam akad, baru tentukan tinggi rangkaian bunga. Bunga yang berdiri di jalur cahaya hanya menambah bayangan di wajah orang yang sedang duduk.',
                    'Siapkan juga jeda setelah prosesi. Tamu yang baru selesai duduk perlu sudut teduh sebelum berjalan ke resepsi. Naungan di dekat tempat akad lebih berguna daripada latar yang indah di seberang halaman. Cahaya sore yang sudah dibaca sejak kunjungan membuat perpindahan itu terasa disiapkan.',
                ],
                'sections' => [
                    ['title' => 'Jam yang sama dengan sore acara', 'text' => 'Datang pada jam yang mendekati prosesi. Kunjungan siang hanya menunjukkan halaman yang terang, belum menunjukkan silau dan bayangan sore. Jika jadwal akad bergeser lebih dari satu jam, baca cahayanya lagi pada jam yang baru.'],
                    ['title' => 'Arah duduk menghadap cahaya', 'text' => 'Berdiri di posisi prosesi dan lihat ke kursi keluarga. Catat sisi yang menghadap matahari dan sisi yang sudah teduh. Arah duduk dikunci sebelum dekorasi ditambah, karena kain dan bunga tidak mengubah arah cahaya sore.'],
                    ['title' => 'Jalur tamu setelah cahaya turun', 'text' => 'Perhatikan dari mana tamu masuk dan ke mana mereka berjalan setelah akad. Siapkan satu sudut teduh di dekat prosesi untuk foto singkat, supaya keluarga tidak menyeberang halaman saat cahaya sore masih panas.'],
                ],
            ],
            [
                'slug' => 'rundown-yang-tidak-kaku',
                'marker' => 'Contoh susunan',
                'topic' => 'Persiapan',
                'title' => 'Rundown yang tidak membuat hari terasa kaku',
                'summary' => 'Urutan acara tetap jelas, dengan jeda untuk keluarga supaya hari tidak terasa dikejar menit.',
                'image_path' => $this->image('rundown-yang-tidak-kaku', 'cerita-unggulan.webp'),
                'image_alt' => 'Pasangan pengantin berjalan bersama di taman',
                'sort_order' => 2,
                'paragraphs' => [
                    'Rundown terasa kaku ketika setiap perpindahan ditulis tanpa sisa waktu. Keterlambatan lima menit di awal lalu terasa seperti seluruh hari gagal. Urutan acara tetap perlu. Hari yang enak dijalani menyimpan jeda di antara momen yang memang harus tepat waktu.',
                    'Kunci hanya prosesi yang melibatkan banyak pihak sekaligus, seperti akad atau pemberkatan. Jam itu ditulis jelas dan dibagikan. Foto keluarga, jalan ke resepsi, dan sambutan diberi rentang, bukan menit tunggal. Sepuluh sampai lima belas menit membuat keluarga bisa menyapa tanpa merasa dikejar rundown.',
                    'Keluarga membaca urutan yang berbeda dari lembar koordinator. Mereka cukup melihat berkumpul, prosesi, foto singkat, lalu resepsi. Detail mikrofon, vendor, dan perpindahan hidangan tetap di satu lembar kerja. Dua versi ini menjaga agar pesan yang beredar pada hari yang sama tidak saling bertentangan.',
                    'Saat hari berjalan, perubahan masuk lewat satu kontak. Hujan, keterlambatan, atau tamu yang baru tiba bisa menggeser jeda. Orang itu yang memberitahu pihak yang terdampak. Rundown tetap jadi pegangan, tetapi tidak memanggil semua orang setiap menit.',
                ],
                'sections' => [
                    ['title' => 'Hanya prosesi yang dikunci', 'text' => 'Tulis jam untuk prosesi utama dan sebarkan jam itu sebagai waktu tetap. Momen lain boleh bergeser di dalam rentang yang sudah disepakati. Satu keterlambatan kecil lalu tidak meruntuhkan sisa rundown.'],
                    ['title' => 'Jeda sebelum keluarga pindah', 'text' => 'Sisakan waktu sebelum keluarga berpindah tempat. Jeda dipakai untuk menyapa, merapikan barisan, dan memastikan orang yang dituju sudah siap. Urutan yang rapat di kertas terasa kaku begitu dijalankan tanpa jeda.'],
                    ['title' => 'Satu orang yang menggeser rundown', 'text' => 'Semua perubahan pada hari acara lewat satu kontak. Keluarga memegang versi ringkas. Vendor memegang detail. Pesan dari banyak arah membuat urutan yang sama dibaca berbeda, dan hari kembali terasa kaku.'],
                ],
            ],
            [
                'slug' => 'palet-lilac-yang-hangat',
                'marker' => 'Contoh susunan',
                'topic' => 'Desain',
                'title' => 'Palet lilac yang tetap hangat',
                'summary' => 'Ivory menjadi dasar, lilac menjadi lapisan, dan ungu yang lebih dalam hanya muncul pada detail kecil.',
                'image_path' => $this->image('palet-lilac-yang-hangat', 'resepsi.webp'),
                'image_alt' => 'Meja resepsi di taman dengan lilin dan untaian lampu',
                'sort_order' => 3,
                'paragraphs' => [
                    'Palet lilac terasa dingin ketika ungu menutupi hampir semua permukaan. Hangatnya datang dari dasar yang terang. Ivory, krim, atau putih tulang menutupi meja, kain panjang, dan sebagian besar ruang. Lilac masuk kemudian, sebagai lapisan pada bunga, pita, atau satu bidang kain.',
                    'Ungu yang lebih dalam dipakai sekali, pada benda yang dekat dengan tangan tamu. Kartu tempat duduk, tepi kartu di meja, atau pita di gagang gelas sudah cukup. Jika ungu itu diulang di backdrop, lantai, dan langit-langit, ruangan berhenti terasa hangat dan menjadi satu warna yang mendesak.',
                    'Aksen biru tetap kecil. Biru pada serbet atau di antara daun lebih aman daripada biru pada lampu yang menerangi wajah. Cahaya lilin dan lampu gantung bernada hangat membantu lilac terbaca lembut pada sore dan malam hari. Tanpa cahaya hangat itu, ungu yang sama bisa terlihat pucat.',
                    'Sebelum pesanan dikunci, susun contoh di atas kain ivory yang sama dengan meja. Lihat pada cahaya venue, bukan hanya di bawah lampu toko. Palet yang tetap hangat masih menyisakan banyak warna terang. Lilac menjadi pengingat, bukan cat untuk seluruh ruangan.',
                ],
                'sections' => [
                    ['title' => 'Ivory yang menghangatkan lilac', 'text' => 'Sebagian besar kain dan meja tetap ivory. Dasar terang ini yang membuat lilac terasa hangat. Ungu tidak perlu bersaing dengan permukaan gelap atau dengan terlalu banyak warna lain di ruangan yang sama.'],
                    ['title' => 'Lilac sebagai satu lapisan', 'text' => 'Letakkan lilac pada bunga atau satu bidang kain. Biarkan permukaan lain tenang. Lapisan yang sedikit membuat warna itu terbaca, tanpa menutupi makanan, wajah tamu, atau jalur di antara meja.'],
                    ['title' => 'Ungu dalam hanya pada detail', 'text' => 'Ulangi satu ungu yang lebih dalam di kartu tempat duduk atau pita, lalu berhenti. Aksen biru, bila dipakai, cukup pada benda kecil dan dilihat lagi di bawah cahaya hangat venue.'],
                ],
            ],
            [
                'slug' => 'jalan-di-antara-meja',
                'marker' => 'Contoh susunan',
                'topic' => 'Tamu',
                'title' => 'Jalan di antara meja panjang',
                'summary' => 'Jarak di antara meja panjang perlu masih bisa dilalui tamu dan pelayan setelah lampu venue menyala.',
                'image_path' => $this->image('jalan-di-antara-meja', 'evening.webp'),
                'image_alt' => 'Ruang acara bernuansa lavender dengan meja panjang dan lampu gantung',
                'sort_order' => 4,
                'paragraphs' => [
                    'Meja panjang menghemat ruang, tetapi mudah menutup jalan. Di denah siang hari jarak antar meja sering terlihat cukup. Setelah kursi ditarik, tas diletakkan, dan pelayan membawa nampan, jarak itu menyempit. Jalan di antara meja perlu dicek saat susunan sudah mirip dengan malam acara.',
                    'Berjalanlah seperti tamu yang baru datang, lalu seperti pelayan yang membawa hidangan. Bahu tidak boleh menyenggol kursi. Jika dua orang yang berpapasan harus berhenti dan menggeser badan, lorong itu terlalu sempit. Lebarkan jarak, kurangi satu kursi di ujung, atau pecah satu meja menjadi dua yang lebih pendek.',
                    'Lampu ikut menentukan apakah jalan itu nyaman. Sorot yang jatuh tepat di wajah membuat tamu mencondongkan badan atau menggeser kursi ke tengah lorong. Geser lampu, atau pindahkan tempat duduk yang terkena sorot, sebelum jarak antar meja dianggap selesai. Jalan yang terang dan tidak menyilaukan lebih berguna daripada meja yang dipaksakan rapat.',
                    'Tandai ujung meja yang dipakai pelayan untuk masuk dan keluar. Ujung yang menghadap dapur atau pintu samping sebaiknya tidak ditutup dekorasi tinggi. Tamu tetap bisa berbicara sepanjang meja, sementara orang yang mengantar hidangan punya jalur yang sudah disiapkan.',
                ],
                'sections' => [
                    ['title' => 'Jalan dicek setelah lampu hidup', 'text' => 'Lihat susunan meja saat lampu gantung sudah menyala. Jarak yang longgar pada siang hari bisa terasa sempit begitu kursi, tas, dan bayangan lampu masuk ke lorong di antara meja panjang.'],
                    ['title' => 'Sorot tidak menutup jalan', 'text' => 'Pastikan cahaya tidak jatuh tepat di wajah tamu. Orang yang silau cenderung menggeser kursi dan menutup jalan. Pindahkan lampu atau tempat duduk sebelum jarak meja dikunci.'],
                    ['title' => 'Ujung meja untuk pelayan', 'text' => 'Sisakan lorong yang bisa dilalui orang membawa nampan, termasuk di ujung meja yang mengarah ke pintu hidangan. Dekorasi tinggi tidak diletakkan di jalur itu.'],
                ],
            ],
            [
                'slug' => 'kain-di-tepi-foto',
                'marker' => 'Contoh susunan',
                'topic' => 'Desain',
                'title' => 'Kain yang tetap di tepi foto',
                'summary' => 'Kain tipis dipasang sebagai latar dan tetap di tepi bingkai, tanpa menutup orang yang berdiri.',
                'image_path' => $this->image('kain-di-tepi-foto', 'ethereal-hero.webp'),
                'image_alt' => 'Pasangan pengantin berdekatan di antara anggrek lilac dan kain tipis',
                'sort_order' => 5,
                'paragraphs' => [
                    'Kain tipis mudah terlihat indah di contoh, lalu mengganggu begitu ada orang di depannya. Angin mengangkat ujung kain, dan wajah yang seharusnya menjadi pusat foto tertutup. Supaya kain tetap di tepi foto, posisinya ditentukan dari jalur orang, bukan dari keinginan mengisi seluruh bingkai.',
                    'Gantung kain di tepi kiri atau kanan latar, di luar tempat keluarga berdiri. Titik gantung lebih tinggi dari kepala, dan ujung bawah tidak masuk ke jalur langkah. Jika kain harus melintasi bagian atas bingkai, sisakan celah setinggi orang dewasa di bawahnya. Celah itu yang membuat kain terbaca sebagai tepi, bukan sebagai tirai.',
                    'Uji dengan angin. Minta seseorang berdiri di posisi yang akan difoto, lalu lihat dari kamera. Jika kain menempel ke bahu atau pipi saat ada hembusan, geser titik gantung lebih ke tepi atau tambah pemberat di lipatan bawah. Pemberat yang terlalu ringan tidak menahan kain di venue terbuka.',
                    'Bunga dan lampu boleh mendekat ke kain, tetapi tidak menggantikan jarak aman. Rangkaian yang menggantung di jalur wajah menciptakan masalah yang sama. Tepi foto cukup diisi satu bidang kain dan sedikit bunga. Orang yang berdiri tetap utuh di dalam bingkai, termasuk saat mereka berbalik.',
                ],
                'sections' => [
                    ['title' => 'Kain di tepi, orang di tengah', 'text' => 'Pasang kain di tepi latar, di luar jalur orang yang akan difoto. Bagian tengah bingkai disisakan untuk wajah dan tubuh. Kain yang mengisi tengah foto menutup orang yang sedang berdiri.'],
                    ['title' => 'Celah setinggi orang dewasa', 'text' => 'Di bawah kain yang melintas di atas, sisakan ruang setinggi orang dewasa. Celah ini menjaga kain tetap di tepi atas foto dan tidak jatuh ke wajah saat ada yang berdiri di dekatnya.'],
                    ['title' => 'Angin tidak menarik kain ke wajah', 'text' => 'Berdiri di posisi foto dan lihat saat ada hembusan. Jika kain menempel ke wajah atau bahu, geser gantungan ke tepi atau tambah pemberat di lipatan bawah sebelum hari acara.'],
                ],
            ],
            [
                'slug' => 'teduh-dekat-prosesi',
                'marker' => 'Contoh susunan',
                'topic' => 'Venue',
                'title' => 'Teduh yang dekat dengan prosesi',
                'summary' => 'Sudut teduh ditandai dekat tempat prosesi, supaya jeda foto selesai sebelum tamu berjalan ke resepsi.',
                'image_path' => $this->image('teduh-dekat-prosesi', 'hero.webp'),
                'image_alt' => 'Pasangan berdiri di bawah pergola dengan bunga gantung dan kain ungu',
                'sort_order' => 6,
                'paragraphs' => [
                    'Setelah prosesi, keluarga sering diminta berjalan ke tempat foto di seberang halaman. Pada jam sore, perjalanan itu berarti menyeberang bagian yang masih panas. Tamu yang baru selesai duduk menjadi lelah sebelum resepsi dimulai. Sudut teduh yang dekat dengan prosesi membuat jeda foto terjadi di tempat yang sudah mereka capai.',
                    'Pilih naungan yang bisa dicapai tanpa menyeberang halaman terbuka. Atap paviliun, pergola, atau sisi bangunan yang membelakangi matahari sudah cukup. Jaraknya cukup dekat sehingga keluarga bisa berpindah dalam satu atau dua menit, lalu menuju resepsi tanpa putar balik yang panjang.',
                    'Tandai tempat itu pada jam yang sama dengan prosesi. Lihat apakah teduhnya masih ada pada jam itu, atau hanya ada pada pagi hari. Catat juga latar di belakang orang yang berdiri. Pintu dapur atau jalur pelayan sebaiknya tidak menjadi latar utama. Teduh yang dekat tidak harus menjadi instalasi baru.',
                    'Urutannya sederhana. Prosesi selesai, keluarga bergeser ke sudut teduh, foto singkat dilakukan di sana, lalu baru berjalan ke resepsi. Tamu yang tidak ikut foto bisa langsung ke meja. Jeda tetap dekat dengan prosesi, dan perjalanan ke resepsi tidak tercampur dengan antrean di tengah matahari.',
                ],
                'sections' => [
                    ['title' => 'Teduh dalam jarak yang pendek', 'text' => 'Pilih naungan yang hanya beberapa langkah dari tempat prosesi. Keluarga tidak perlu menyeberang halaman terbuka untuk memulai foto. Atap yang sudah ada lebih berguna daripada latar indah di seberang venue.'],
                    ['title' => 'Naungan pada jam prosesi', 'text' => 'Lihat sudut itu pada jam yang mendekati akad. Teduh pagi belum tentu masih ada saat prosesi sore. Latar di belakang orang yang berdiri ikut dicatat, supaya pintu yang sibuk tidak masuk ke dalam foto.'],
                    ['title' => 'Foto dekat, baru ke resepsi', 'text' => 'Selesaikan foto singkat di sudut teduh, baru berjalan ke resepsi. Tamu yang tidak ikut foto bisa langsung ke meja. Perpindahan tidak menumpuk di halaman yang masih terkena matahari.'],
                ],
            ],
        ];

        foreach ($articles as $article) {
            Article::query()->updateOrCreate(
                ['slug' => $article['slug']],
                $article,
            );
        }
    }

    private function image(string $slug, string $file): string
    {
        $relative = "journal/{$slug}.webp";
        $directory = storage_path('app/public/journal');

        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        copy(dirname(base_path())."/web/public/weddings/placeholders/{$file}", storage_path("app/public/{$relative}"));

        return $relative;
    }
}
