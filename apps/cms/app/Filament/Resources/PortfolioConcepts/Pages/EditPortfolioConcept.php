<?php

namespace App\Filament\Resources\PortfolioConcepts\Pages;

use App\Filament\Resources\PortfolioConcepts\PortfolioConceptResource;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use Filament\Support\Enums\Width;

class EditPortfolioConcept extends EditRecord
{
    protected static string $resource = PortfolioConceptResource::class;

    protected Width|string|null $maxContentWidth = Width::ScreenExtraLarge;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function getSaveFormAction(): Action
    {
        return parent::getSaveFormAction()->label('Simpan');
    }

    protected function getCancelFormAction(): Action
    {
        return parent::getCancelFormAction()->label('Batal');
    }
}
