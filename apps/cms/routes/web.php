<?php

use App\Http\Controllers\SiteLoginController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/masuk/panel', [SiteLoginController::class, 'panel']);
