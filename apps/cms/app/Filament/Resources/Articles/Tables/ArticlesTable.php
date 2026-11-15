<?php

namespace App\Filament\Resources\Articles\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ArticlesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('sort_order')
                    ->label('Urutan')
                    ->sortable(),
                TextColumn::make('title')
                    ->label('Judul')
                    ->searchable()
                    ->wrap(),
                TextColumn::make('topic')
                    ->label('Topik')
                    ->badge(),
                TextColumn::make('summary')
                    ->label('Ringkasan')
                    ->wrap()
                    ->limit(80)
                    ->toggleable(),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->recordActions([
                EditAction::make(),
            ]);
    }
}
