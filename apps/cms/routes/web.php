<?php

use App\Http\Controllers\SiteLoginController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/admin');

Route::get('/masuk/panel', [SiteLoginController::class, 'panel']);
