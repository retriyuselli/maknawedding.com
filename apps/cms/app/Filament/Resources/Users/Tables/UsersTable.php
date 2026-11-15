<?php

namespace App\Filament\Resources\Users\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class UsersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nama')
                    ->searchable(),
                TextColumn::make('username')
                    ->label('Nama pengguna')
                    ->placeholder('—')
                    ->searchable(),
                TextColumn::make('email')
                    ->label('Surel')
                    ->searchable(),
                TextColumn::make('roles.name')
                    ->label('Peran')
                    ->badge()
                    ->placeholder('Belum ada'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
