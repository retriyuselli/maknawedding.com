<?php

namespace App\Filament\Resources\Articles\Schemas;

use App\Enums\ArticleTopic;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ArticleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                Section::make('Kartu')
                    ->description('Catatan editorial di jurnal. Nama venue, tanggal, dan cerita pasangan tidak diisi.')
                    ->icon('heroicon-o-book-open')
                    ->columns(['default' => 1, 'md' => 2])
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul')
                            ->placeholder('Membaca cahaya sore di venue terbuka')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Select::make('topic')
                            ->label('Topik')
                            ->options(collect(ArticleTopic::cases())->mapWithKeys(
                                fn (ArticleTopic $topic): array => [$topic->value => $topic->value],
                            )->all())
                            ->helperText('Lencana di atas gambar kartu: Venue, Persiapan, Desain, atau Tamu.')
                            ->required()
                            ->native(false),
                        TextInput::make('marker')
                            ->label('Penanda')
                            ->placeholder('Contoh susunan')
                            ->helperText('Menandai susunan editorial, bukan cerita klien.')
                            ->required()
                            ->maxLength(100),
                        Textarea::make('summary')
                            ->label('Ringkasan')
                            ->helperText('Kalimat di bawah judul pada kartu dan di halaman bacaan.')
                            ->required()
                            ->rows(3)
                            ->maxLength(500)
                            ->columnSpanFull(),
                        TextInput::make('slug')
                            ->label('Slug')
                            ->placeholder('cahaya-sore-di-venue')
                            ->helperText('Dipakai tautan /jurnal/nama. Huruf kecil dan tanda hubung.')
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
                Section::make('Gambar')
                    ->description('Gambar kartu dan sampul halaman bacaan.')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        FileUpload::make('image_path')
                            ->label('Gambar')
                            ->helperText('Unggah foto. Kartu menampilkannya tanpa teks alternatif. Halaman bacaan memakai teks di bawah.')
                            ->image()
                            ->disk('public')
                            ->directory('journal')
                            ->visibility('public')
                            ->maxSize(8192)
                            ->imagePreviewHeight('12rem')
                            ->panelAspectRatio('16:9')
                            ->required()
                            ->columnSpanFull(),
                        TextInput::make('image_alt')
                            ->label('Teks alternatif')
                            ->helperText('Kalimat yang dibaca jika gambar tidak tampil di halaman bacaan.')
                            ->required()
                            ->maxLength(500)
                            ->columnSpanFull(),
                    ]),
                Section::make('Tulisan')
                    ->description('Paragraf yang dibaca setelah kartu diklik.')
                    ->icon('heroicon-o-bars-3-bottom-left')
                    ->schema([
                        Repeater::make('paragraphs')
                            ->label('Paragraf')
                            ->simple(
                                Textarea::make('paragraf')
                                    ->required()
                                    ->rows(4),
                            )
                            ->minItems(1)
                            ->reorderable()
                            ->addActionLabel('Tambah paragraf')
                            ->columnSpanFull(),
                    ]),
                Section::make('Yang dicek')
                    ->description('Tiga hal yang dicek di catatan ini.')
                    ->icon('heroicon-o-clipboard-document-list')
                    ->schema([
                        Repeater::make('sections')
                            ->label('Butir')
                            ->schema([
                                TextInput::make('title')
                                    ->label('Judul')
                                    ->required()
                                    ->maxLength(160)
                                    ->columnSpanFull(),
                                Textarea::make('text')
                                    ->label('Penjelasan')
                                    ->required()
                                    ->rows(3)
                                    ->columnSpanFull(),
                            ])
                            ->minItems(1)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                            ->addActionLabel('Tambah butir')
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
