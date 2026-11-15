<?php

namespace Database\Seeders;

use App\Models\PortfolioConcept;
use Illuminate\Database\Seeder;

class PortfolioConceptSeeder extends Seeder
{
    public function run(): void
    {
        $concepts = [
            [
                'slug' => 'garden-vows',
                'title' => 'Garden Vows',
                'category' => 'Wedding',
                'summary' => 'Prosesi di taman dengan cahaya sore dan jalur tamu yang tetap dekat.',
                'sort_order' => 1,
                'photos' => [
                    $this->photo('garden-vows', 1, 'cerita-unggulan.webp', 'Pasangan pengantin berjalan bersama di taman', 'Jalan di antara rangka bunga taman.'),
                    $this->photo('garden-vows', 2, 'prosesi.webp', 'Suasana akad nikah di paviliun taman', 'Prosesi di bawah paviliun, dengan keluarga duduk dekat.'),
                    $this->photo('garden-vows', 3, 'hero.webp', 'Pasangan berdiri di bawah pergola dengan bunga gantung dan kain ungu', 'Potret di bawah rangka bunga setelah prosesi.'),
                ],
            ],
            [
                'slug' => 'an-intimate-ceremony',
                'title' => 'An Intimate Ceremony',
                'category' => 'Engagement',
                'summary' => 'Akad kecil di paviliun, dengan keluarga duduk dalam jarak yang tenang.',
                'sort_order' => 2,
                'photos' => [
                    $this->photo('an-intimate-ceremony', 1, 'prosesi.webp', 'Suasana akad nikah di paviliun taman', 'Meja akad dengan keluarga dalam jarak dekat.'),
                    $this->photo('an-intimate-ceremony', 2, 'hero.webp', 'Pasangan berdiri di bawah pergola dengan bunga gantung dan kain ungu', 'Potret berdua di sisi paviliun.'),
                    $this->photo('an-intimate-ceremony', 3, 'ethereal-hero.webp', 'Pasangan pengantin berdekatan di antara anggrek lilac dan kain tipis', 'Potret dekat dengan kain tipis di sekeliling.'),
                ],
            ],
            [
                'slug' => 'a-celebration-in-bloom',
                'title' => 'A Celebration in Bloom',
                'category' => 'Wedding',
                'summary' => 'Meja resepsi di taman, lilin, dan untaian lampu sebagai cahaya utama.',
                'sort_order' => 3,
                'photos' => [
                    $this->photo('a-celebration-in-bloom', 1, 'resepsi.webp', 'Meja resepsi di taman dengan lilin dan untaian lampu', 'Meja tamu di taman, dengan lilin dan untaian lampu.'),
                    $this->photo('a-celebration-in-bloom', 2, 'evening.webp', 'Ruang acara bernuansa lavender dengan meja panjang dan lampu gantung', 'Rangkaian lilac di sepanjang meja.'),
                    $this->photo('a-celebration-in-bloom', 3, 'cerita-unggulan.webp', 'Pasangan pengantin berjalan bersama di taman', 'Cahaya sore di antara bunga taman.'),
                ],
            ],
            [
                'slug' => 'evening-celebration',
                'title' => 'Evening Celebration',
                'category' => 'Event',
                'summary' => 'Ruang makan malam dengan meja panjang, lavender, dan lampu gantung.',
                'sort_order' => 4,
                'photos' => [
                    $this->photo('evening-celebration', 1, 'evening.webp', 'Ruang acara bernuansa lavender dengan meja panjang dan lampu gantung', 'Ruang makan malam dengan meja panjang dan lampu gantung.'),
                    $this->photo('evening-celebration', 2, 'resepsi.webp', 'Meja resepsi di taman dengan lilin dan untaian lampu', 'Meja di taman pada sore hari, untuk makan malam yang lebih longgar.'),
                ],
            ],
            [
                'slug' => 'orchid-light',
                'title' => 'Orchid Light',
                'category' => 'Engagement',
                'summary' => 'Potret dekat dengan anggrek lilac dan kain tipis di sekeliling pasangan.',
                'sort_order' => 5,
                'photos' => [
                    $this->photo('orchid-light', 1, 'ethereal-hero.webp', 'Pasangan pengantin berdekatan di antara anggrek lilac dan kain tipis', 'Potret dekat di antara anggrek lilac.'),
                    $this->photo('orchid-light', 2, 'evening.webp', 'Ruang acara bernuansa lavender dengan meja panjang dan lampu gantung', 'Anggrek dan lilac di sepanjang ruang duduk.'),
                ],
            ],
            [
                'slug' => 'under-the-pergola',
                'title' => 'Under the Pergola',
                'category' => 'Wedding',
                'summary' => 'Potret di bawah pergola bunga, dengan kain ungu sebagai pembatas ruang.',
                'sort_order' => 6,
                'photos' => [
                    $this->photo('under-the-pergola', 1, 'hero.webp', 'Pasangan berdiri di bawah pergola dengan bunga gantung dan kain ungu', 'Berdiri di bawah pergola, kain ungu di samping.'),
                    $this->photo('under-the-pergola', 2, 'prosesi.webp', 'Suasana akad nikah di paviliun taman', 'Rangka kayu dan bunga gantung di atas meja prosesi.'),
                    $this->photo('under-the-pergola', 3, 'cerita-unggulan.webp', 'Pasangan pengantin berjalan bersama di taman', 'Jalan di bawah rangka bunga menuju tempat duduk.'),
                ],
            ],
        ];

        foreach ($concepts as $concept) {
            PortfolioConcept::query()->updateOrCreate(
                ['slug' => $concept['slug']],
                $concept,
            );
        }
    }

    /**
     * @return array{path: string, alt: string, caption: string}
     */
    private function photo(string $slug, int $index, string $file, string $alt, string $caption): array
    {
        $relative = "portfolio/{$slug}-{$index}.webp";
        $directory = storage_path('app/public/portfolio');

        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        copy(dirname(base_path())."/web/public/weddings/placeholders/{$file}", storage_path("app/public/{$relative}"));

        return [
            'path' => $relative,
            'alt' => $alt,
            'caption' => $caption,
        ];
    }
}
