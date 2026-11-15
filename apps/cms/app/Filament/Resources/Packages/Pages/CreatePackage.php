<?php

namespace App\Filament\Resources\Packages\Pages;

use App\Filament\Resources\Packages\PackageResource;
use Filament\Actions\Action;
use Filament\Resources\Pages\CreateRecord;
use Filament\Support\Enums\Width;

class CreatePackage extends CreateRecord
{
    protected static string $resource = PackageResource::class;

    protected static ?string $breadcrumb = 'Baru';

    protected static ?string $title = 'Paket baru';

    protected Width|string|null $maxContentWidth = Width::ScreenExtraLarge;

    public function getSubheading(): ?string
    {
        return 'Satu cakupan pendampingan. Harga, venue, dan vendor tidak ditulis di kartu.';
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
