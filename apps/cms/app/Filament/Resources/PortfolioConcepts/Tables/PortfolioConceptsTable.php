<?php

namespace App\Filament\Resources\PortfolioConcepts\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class PortfolioConceptsTable
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
                    ->searchable(),
                TextColumn::make('category')
                    ->label('Kategori')
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
