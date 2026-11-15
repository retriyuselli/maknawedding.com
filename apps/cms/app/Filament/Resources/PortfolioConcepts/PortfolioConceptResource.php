<?php

namespace App\Filament\Resources\PortfolioConcepts;

use App\Filament\Resources\PortfolioConcepts\Pages\CreatePortfolioConcept;
use App\Filament\Resources\PortfolioConcepts\Pages\EditPortfolioConcept;
use App\Filament\Resources\PortfolioConcepts\Pages\ListPortfolioConcepts;
use App\Filament\Resources\PortfolioConcepts\Schemas\PortfolioConceptForm;
use App\Filament\Resources\PortfolioConcepts\Tables\PortfolioConceptsTable;
use App\Models\PortfolioConcept;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class PortfolioConceptResource extends Resource
{
    protected static ?string $model = PortfolioConcept::class;

    protected static ?string $navigationLabel = 'Portofolio';

    protected static ?string $modelLabel = 'Konsep';

    protected static ?string $pluralModelLabel = 'Portofolio';

    protected static string|\UnitEnum|null $navigationGroup = 'Situs';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-squares-2x2';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return PortfolioConceptForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PortfolioConceptsTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPortfolioConcepts::route('/'),
            'create' => CreatePortfolioConcept::route('/create'),
            'edit' => EditPortfolioConcept::route('/{record}/edit'),
        ];
    }
}
