<?php

namespace App\Filament\Resources\Articles\Pages;

use App\Filament\Resources\Articles\ArticleResource;
use Filament\Actions\Action;
use Filament\Resources\Pages\CreateRecord;
use Filament\Support\Enums\Width;

class CreateArticle extends CreateRecord
{
    protected static string $resource = ArticleResource::class;

    protected static ?string $breadcrumb = 'Baru';

    protected static ?string $title = 'Catatan baru';

    protected Width|string|null $maxContentWidth = Width::ScreenExtraLarge;

    public function getSubheading(): ?string
    {
        return 'Satu catatan editorial. Nama venue, tanggal, dan cerita pasangan belum diisi.';
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
