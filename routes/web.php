<?php

use App\Http\Controllers\printServerController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\OutletController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PortionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SubGroupController;
use App\Http\Controllers\UserController;
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

    Route::resource('properties', PropertyController::class)->middleware('permission:access-properties-module');
    Route::resource('outlets', OutletController::class)->middleware('permission:access-outlets-module');
    Route::resource('permissions', PermissionController::class)->middleware('permission:access-permissions-module');
    Route::resource('roles', RoleController::class)->middleware('permission:access-roles-module');
    Route::resource('users', UserController::class)->middleware('permission:access-users-module');
    Route::resource('groups', GroupController::class)->middleware('permission:access-groups-module');
    Route::resource('subgroups', SubGroupController::class)->middleware('permission:access-subgroups-module');
    Route::resource('portions', PortionController::class)->middleware('permission:access-portions-module');

    Route::get('/prod', [ProductController::class, 'index']);
    Route::get('/products', [ProductController::class, 'getData']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::post('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    Route::get('/print', [printServerController::class, 'print']);
});


require __DIR__ . '/settings.php';
