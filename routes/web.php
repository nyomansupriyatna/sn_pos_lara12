<?php

use App\Http\Controllers\printServerController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OutletController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('properties', PropertyController::class);
    Route::resource('outlets', OutletController::class);

    Route::get('/prod', [ProductController::class, 'index']);
    Route::get('/products', [ProductController::class, 'getData']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::post('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    Route::get('/print', [printServerController::class, 'print']);
});


require __DIR__ . '/settings.php';
