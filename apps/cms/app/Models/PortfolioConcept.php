<?php

namespace App\Models;

use App\Enums\PortfolioCategory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'slug',
    'title',
    'category',
    'summary',
    'photos',
    'sort_order',
])]
class PortfolioConcept extends Model
{
    protected function casts(): array
    {
        return [
            'category' => PortfolioCategory::class,
            'photos' => 'array',
            'sort_order' => 'integer',
        ];
    }
}
