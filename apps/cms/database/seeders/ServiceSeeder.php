<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'slug' => 'perencanaan',
                'name' => 'Wedding Planner',
                'title' => 'Perencanaan pernikahan',
                'summary' => 'Konsep, anggaran, dan jadwal dari percakapan pertama sampai resepsi selesai.',
                'includes' => [
                    'Prioritas keluarga sebelum daftar vendor',
                    'Kerangka anggaran yang bisa diikuti',
                    'Jadwal dari pertemuan pertama sampai resepsi',
                ],
                'image_path' => '/weddings/placeholders/cerita-unggulan.webp',
                'image_alt' => 'Pasangan berjalan di antara cahaya sore di taman',
                'sort_order' => 1,
            ],
            [
                'slug' => 'desain',
                'name' => 'Event Design',
                'title' => 'Desain acara',
                'summary' => 'Tata ruang, palet, dan pengalaman tamu yang terasa sinematik tanpa menjadi ramai.',
                'includes' => [
                    'Palet dan material yang diulang secukupnya',
                    'Tata meja, jalan tamu, dan titik foto',
                    'Cahaya yang mengikuti jam acara',
                ],
                'image_path' => '/weddings/placeholders/evening.webp',
                'image_alt' => 'Meja resepsi pada malam hari dengan cahaya hangat',
                'sort_order' => 2,
            ],
            [
                'slug' => 'koordinasi',
                'name' => 'Wedding Organizer',
                'title' => 'Koordinasi hari-H',
                'summary' => 'Pengarahan vendor dan keluarga di lokasi, dengan satu orang yang memegang alur.',
                'includes' => [
                    'Rundown yang dibagikan sebelum hari acara',
                    'Satu jalur komunikasi untuk vendor',
                    'Pengarahan keluarga di lokasi',
                ],
                'image_path' => '/weddings/placeholders/ethereal-hero.webp',
                'image_alt' => 'Suasana perayaan dengan kain dan cahaya lembut',
                'sort_order' => 3,
            ],
            [
                'slug' => 'intim',
                'name' => 'Intimate Celebrations',
                'title' => 'Perayaan intim',
                'summary' => 'Acara kecil dengan perhatian yang sama utuh, dari lamaran sampai makan malam keluarga.',
                'includes' => [
                    'Jumlah tamu yang dijaga tetap dekat',
                    'Lamaran, akad kecil, atau makan malam',
                    'Perhatian yang sama utuh dengan acara besar',
                ],
                'image_path' => '/weddings/placeholders/prosesi.webp',
                'image_alt' => 'Momen prosesi di bawah naungan taman',
                'sort_order' => 4,
            ],
        ];

        foreach ($services as $service) {
            Service::query()->updateOrCreate(
                ['slug' => $service['slug']],
                $service,
            );
        }
    }
}
