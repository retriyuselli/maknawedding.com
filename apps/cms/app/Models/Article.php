<?php

namespace App\Models;

use App\Enums\ArticleTopic;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'slug',
    'marker',
    'topic',
    'title',
    'summary',
    'image_path',
    'image_alt',
    'paragraphs',
    'sections',
    'sort_order',
])]
class Article extends Model
{
    protected function casts(): array
    {
        return [
            'topic' => ArticleTopic::class,
            'paragraphs' => 'array',
            'sections' => 'array',
            'sort_order' => 'integer',
        ];
    }
}
