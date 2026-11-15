<?php

namespace App\Filament\Resources\Packages\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PackageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                Section::make('Kartu')
                    ->description('Kartu di halaman paket. Harga tidak diisi, karena bergantung pada kota dan tanggal.')
                    ->icon('heroicon-o-rectangle-stack')
                    ->columns(['default' => 1, 'md' => 2])
                    ->schema([
                        TextInput::make('name')
                            ->label('Nama')
                            ->placeholder('Essential')
                            ->helperText('Judul kartu. Tetap dalam bahasa Inggris.')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('slug')
                            ->label('Slug')
                            ->placeholder('essential')
                            ->helperText('Dipakai tautan /paket/nama. Huruf kecil dan tanda hubung.')
                            ->required()
                            ->maxLength(100)
                            ->alphaDash()
                            ->dehydrateStateUsing(fn (?string $state): ?string => filled($state) ? mb_strtolower(trim($state)) : null)
                            ->unique(ignoreRecord: true),
                        Textarea::make('summary')
                            ->label('Ringkasan')
                            ->helperText('Kalimat di bawah nama pada kartu.')
                            ->required()
                            ->rows(3)
                            ->maxLength(500)
                            ->columnSpanFull(),
                        Repeater::make('features')
                            ->label('Butir di kartu')
                            ->helperText('Tiga baris yang tampil sebagai daftar di kartu.')
                            ->simple(
                                TextInput::make('butir')
                                    ->required()
                                    ->maxLength(160),
                            )
                            ->minItems(1)
                            ->defaultItems(3)
                            ->reorderable()
                            ->addActionLabel('Tambah butir')
                            ->columnSpanFull(),
                        Textarea::make('scope')
                            ->label('Cakupan singkat')
                            ->helperText('Paragraf di bawah butir, sebelum tautan Lihat cakupan.')
                            ->required()
                            ->rows(3)
                            ->maxLength(500)
                            ->columnSpanFull(),
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
                    ->description('Gambar besar di halaman cakupan paket.')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        FileUpload::make('image_path')
                            ->label('Gambar')
                            ->helperText('Unggah foto sampul halaman cakupan.')
                            ->image()
                            ->disk('public')
                            ->directory('packages')
                            ->visibility('public')
                            ->maxSize(8192)
                            ->imagePreviewHeight('12rem')
                            ->panelAspectRatio('16:9')
                            ->required()
                            ->columnSpanFull(),
                        TextInput::make('image_alt')
                            ->label('Teks alternatif')
                            ->helperText('Kalimat yang dibaca jika gambar tidak tampil.')
                            ->required()
                            ->maxLength(500)
                            ->columnSpanFull(),
                    ]),
                Section::make('Penjelasan')
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
                Section::make('Yang termasuk')
                    ->description('Butir yang masuk dalam cakupan paket ini.')
                    ->icon('heroicon-o-check')
                    ->schema([
                        self::points('included', 'Butir termasuk'),
                    ]),
                Section::make('Yang tidak termasuk')
                    ->description('Butir yang sengaja berada di luar kartu ini.')
                    ->icon('heroicon-o-x-mark')
                    ->schema([
                        self::points('excluded', 'Butir di luar cakupan'),
                    ]),
                Section::make('Sebelum memilih')
                    ->description('Syarat yang membantu membaca apakah skala acaranya cocok.')
                    ->icon('heroicon-o-clipboard-document-list')
                    ->schema([
                        self::points('checks', 'Syarat cocok'),
                    ]),
            ]);
    }

    private static function points(string $name, string $label): Repeater
    {
        return Repeater::make($name)
            ->label($label)
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
            ->columnSpanFull();
    }
}
