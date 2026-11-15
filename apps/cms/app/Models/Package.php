<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'slug',
    'name',
    'summary',
    'features',
    'scope',
    'image_path',
    'image_alt',
    'paragraphs',
    'included',
    'excluded',
    'checks',
    'sort_order',
])]
class Package extends Model
{
    protected function casts(): array
    {
        return [
            'features' => 'array',
            'paragraphs' => 'array',
            'included' => 'array',
            'excluded' => 'array',
            'checks' => 'array',
            'sort_order' => 'integer',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }
}
