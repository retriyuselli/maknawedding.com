<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama')
                    ->required()
                    ->maxLength(255),
                TextInput::make('username')
                    ->label('Nama pengguna')
                    ->helperText('Dipakai di halaman masuk situs. Kosongkan untuk akun panel saja.')
                    ->maxLength(50)
                    ->nullable()
                    ->alphaDash()
                    ->dehydrateStateUsing(fn (?string $state): ?string => filled($state) ? mb_strtolower(trim($state)) : null)
                    ->unique(ignoreRecord: true),
                TextInput::make('email')
                    ->label('Surel')
                    ->email()
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),
                TextInput::make('password')
                    ->label('Kata sandi')
                    ->password()
                    ->revealable()
                    ->maxLength(255)
                    ->dehydrated(fn (?string $state): bool => filled($state))
                    ->required(fn (string $operation): bool => $operation === 'create'),
                Select::make('roles')
                    ->label('Peran')
                    ->relationship('roles', 'name')
                    ->multiple()
                    ->preload()
                    ->helperText('pengunjung, kantor, dan konsumen masuk lewat situs. super_admin dan panel_user membuka panel ini.'),
            ]);
    }
}
