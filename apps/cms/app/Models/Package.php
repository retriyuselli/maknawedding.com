<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
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
}
