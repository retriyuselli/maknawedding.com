<?php

namespace App\Filament\Resources\PortfolioConcepts\Pages;

use App\Filament\Resources\PortfolioConcepts\PortfolioConceptResource;
use Filament\Actions\Action;
use Filament\Resources\Pages\CreateRecord;
use Filament\Support\Enums\Width;

class CreatePortfolioConcept extends CreateRecord
{
    protected static string $resource = PortfolioConceptResource::class;

    protected static ?string $breadcrumb = 'Baru';

    protected static ?string $title = 'Konsep baru';

    protected Width|string|null $maxContentWidth = Width::ScreenExtraLarge;

    public function getSubheading(): ?string
    {
        return 'Satu kartu ilustrasi di galeri portofolio. Bukan cerita klien.';
    }

    protected function getCreateFormAction(): Action
    {
        return parent::getCreateFormAction()->label('Simpan');
    }

    protected function getCreateAnotherFormAction(): Action
    {
        return parent::getCreateAnotherFormAction()->label('Simpan dan buat lagi');
    }

    protected function getCancelFormAction(): Action
    {
        return parent::getCancelFormAction()->label('Batal');
    }
}
