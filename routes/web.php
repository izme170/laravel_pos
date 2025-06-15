<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

    Route::middleware('admin')->group(function (){
        Route::controller(ProductController::class)->prefix('products')->group(function () {
            Route::get('/', 'index')->name('products.index');
            Route::get('/{product}', 'show')->name('products.show');
            Route::get('/create', 'create')->name('products.create');
            Route::post('/', 'store')->name('products.store');
            Route::get('/{product}/edit', 'edit')->name('products.edit');
            Route::put('/{product}', 'update')->name('products.update');
            Route::delete('/{product}', 'destroy')->name('products.destroy');
            Route::get('/trashed', 'trashed')->name('products.trashed');
            Route::post('/{product}/restore', 'restore')->name('products.restore');
            Route::delete('/{product}/force-delete', 'forceDelete')->name('products.forceDelete');
            Route::get('/search', 'search')->name('products.search');
            Route::get('/filter', 'filter')->name('products.filter');

        });
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
