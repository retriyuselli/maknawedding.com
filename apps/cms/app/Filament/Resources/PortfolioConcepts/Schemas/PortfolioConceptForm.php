<?php

namespace App\Filament\Resources\PortfolioConcepts\Schemas;

use App\Enums\PortfolioCategory;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PortfolioConceptForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                Section::make('Kartu')
                    ->description('Kartu galeri di halaman portofolio. Ini ilustrasi suasana, bukan cerita klien.')
                    ->icon('heroicon-o-squares-2x2')
                    ->columns(['default' => 1, 'md' => 2])
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul')
                            ->placeholder('Garden Vows')
                            ->helperText('Judul di kartu. Tetap dalam bahasa Inggris.')
                            ->required()
                            ->maxLength(255),
                        Select::make('category')
                            ->label('Kategori')
                            ->options(collect(PortfolioCategory::cases())->mapWithKeys(
                                fn (PortfolioCategory $category): array => [$category->value => $category->value],
                            )->all())
                            ->helperText('Dipakai tombol Semua, Wedding, Engagement, dan Event.')
                            ->required()
                            ->native(false),
                        Textarea::make('summary')
                            ->label('Ringkasan')
                            ->required()
                            ->rows(3)
                            ->maxLength(500)
                            ->columnSpanFull(),
                        TextInput::make('slug')
                            ->label('Slug')
                            ->placeholder('garden-vows')
                            ->helperText('Dipakai sebagai identitas kartu. Huruf kecil dan tanda hubung.')
                            ->required()
                            ->maxLength(100)
                            ->alphaDash()
                            ->dehydrateStateUsing(fn (?string $state): ?string => filled($state) ? mb_strtolower(trim($state)) : null)
                            ->unique(ignoreRecord: true),
                        TextInput::make('sort_order')
                            ->label('Urutan')
                            ->helperText('Angka kecil tampil lebih dulu.')
                            ->required()
                            ->numeric()
                            ->integer()
                            ->minValue(0)
                            ->default(0),
                    ]),
                Section::make('Foto')
                    ->description('Foto pertama menjadi gambar kartu. Foto berikutnya terbuka lewat Lihat foto.')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        Repeater::make('photos')
                            ->label('Daftar foto')
                            ->schema([
                                FileUpload::make('path')
                                    ->label('Gambar')
                                    ->helperText('Unggah foto. Foto pertama di daftar ini menjadi gambar kartu.')
                                    ->image()
                                    ->disk('public')
                                    ->directory('portfolio')
                                    ->visibility('public')
                                    ->maxSize(8192)
                                    ->imagePreviewHeight('12rem')
                                    ->panelAspectRatio('16:9')
                                    ->required()
                                    ->columnSpanFull(),
                                TextInput::make('alt')
                                    ->label('Teks alternatif')
                                    ->helperText('Kalimat yang dibaca jika gambar tidak tampil.')
                                    ->required()
                                    ->maxLength(500)
                                    ->columnSpanFull(),
                                TextInput::make('caption')
                                    ->label('Keterangan')
                                    ->helperText('Kalimat pendek di bawah foto saat galeri dibuka.')
                                    ->required()
                                    ->maxLength(255)
                                    ->columnSpanFull(),
                            ])
                            ->minItems(1)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['caption'] ?? null)
                            ->addActionLabel('Tambah foto')
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
