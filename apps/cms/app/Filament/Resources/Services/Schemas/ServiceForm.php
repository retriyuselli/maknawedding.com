<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                Section::make('Kartu')
                    ->description('Judul yang tampil di kartu layanan, seperti pada halaman Layanan.')
                    ->icon('heroicon-o-rectangle-group')
                    ->columns(['default' => 1, 'md' => 2])
                    ->schema([
                        TextInput::make('name')
                            ->label('Nama')
                            ->placeholder('Wedding Planner')
                            ->helperText('Judul besar di kartu. Tetap dalam bahasa Inggris.')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('title')
                            ->label('Peran')
                            ->placeholder('Perencanaan pernikahan')
                            ->helperText('Baris kecil di bawah nama.')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('slug')
                            ->label('Slug')
                            ->placeholder('perencanaan')
                            ->helperText('Dipakai tautan di situs. Huruf kecil tanpa spasi.')
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
                Section::make('Tulisan')
                    ->description('Ringkasan dan butir cakupan yang biasa dibahas. Angka tamu, kota, dan tanggal tidak diisi di sini.')
                    ->icon('heroicon-o-bars-3-bottom-left')
                    ->schema([
                        Textarea::make('summary')
                            ->label('Ringkasan')
                            ->required()
                            ->rows(3)
                            ->maxLength(500)
                            ->columnSpanFull(),
                        Repeater::make('includes')
                            ->label('Butir cakupan')
                            ->helperText('Satu baris untuk satu butir di kartu.')
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
                    ]),
                Section::make('Gambar')
                    ->description('Gambar di sisi kiri kartu.')
                    ->icon('heroicon-o-photo')
                    ->columns(['default' => 1, 'md' => 2])
                    ->schema([
                        TextInput::make('image_path')
                            ->label('Path gambar')
                            ->placeholder('/weddings/placeholders/cerita-unggulan.webp')
                            ->helperText('Path berkas di situs publik.')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        TextInput::make('image_alt')
                            ->label('Teks alternatif')
                            ->helperText('Kalimat yang dibaca jika gambar tidak tampil.')
                            ->required()
                            ->maxLength(500)
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
