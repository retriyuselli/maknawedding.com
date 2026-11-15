<?php

use App\Http\Controllers\SiteLoginController;
use Illuminate\Support\Facades\Route;

Route::post('/masuk', [SiteLoginController::class, 'store']);
