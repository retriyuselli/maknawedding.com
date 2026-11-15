<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'slug',
    'name',
    'title',
    'summary',
    'includes',
    'image_path',
    'image_alt',
    'sort_order',
])]
class Service extends Model
{
    protected function casts(): array
    {
        return [
            'includes' => 'array',
            'sort_order' => 'integer',
        ];
    }
}
