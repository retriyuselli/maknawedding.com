<?php

namespace App\Filament\Resources\Services\Pages;

use App\Filament\Resources\Services\ServiceResource;
use Filament\Actions\Action;
use Filament\Resources\Pages\CreateRecord;
use Filament\Support\Enums\Width;

class CreateService extends CreateRecord
{
    protected static string $resource = ServiceResource::class;

    protected static ?string $breadcrumb = 'Baru';

    protected static ?string $title = 'Layanan baru';

    protected Width|string|null $maxContentWidth = Width::ScreenExtraLarge;

    public function getSubheading(): ?string
    {
        return 'Satu kartu di bagian empat peran. Layanan bisa berdiri sendiri atau digabung.';
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
