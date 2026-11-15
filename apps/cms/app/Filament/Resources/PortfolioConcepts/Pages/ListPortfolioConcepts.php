<?php

namespace App\Filament\Resources\PortfolioConcepts\Pages;

use App\Filament\Resources\PortfolioConcepts\PortfolioConceptResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPortfolioConcepts extends ListRecords
{
    protected static string $resource = PortfolioConceptResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
