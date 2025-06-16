<?php

use App\Http\Controllers\DiscountController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use App\Models\PaymentMethod;
use Faker\Provider\ar_EG\Payment;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

    Route::middleware('manager')->group(function (){
        Route::controller(ProductController::class)->prefix('products')->group(function () {
            Route::get('/', 'index')->name('products.index');
            Route::get('/create', 'create')->name('products.create');
            Route::get('/search', 'search')->name('products.search');
            Route::get('/filter', 'filter')->name('products.filter');
            Route::get('/{product}', 'show')->name('products.show');
            Route::post('/', 'store')->name('products.store');
            Route::get('/{product}/edit', 'edit')->name('products.edit');
            Route::put('/{product}', 'update')->name('products.update');
            Route::delete('/{product}', 'destroy')->name('products.destroy');
            Route::get('/trashed', 'trashed')->name('products.trashed');
            Route::post('/{product}/restore', 'restore')->name('products.restore');
            Route::delete('/{product}/force-delete', 'forceDelete')->name('products.forceDelete');
        });

        Route::controller(DiscountController::class)->prefix('discounts')->group(function () {
            Route::get('/', 'index')->name('discounts.index');
            Route::get('/create', 'create')->name('discounts.create');
            Route::post('/', 'store')->name('discounts.store');
            Route::delete('/{discount}', 'destroy')->name('discounts.destroy');
            Route::get('trashed', 'trashed')->name('discounts.trashed');
            Route::post('/{id}/restore', 'restore')->name('discounts.restore');
        });

        Route::controller(PaymentMethod::class)->prefix('payment-methods')->group(function () {
            Route::get('/', 'index')->name('payment-methods.index');
            Route::get('/create', 'create')->name('payment-methods.create');
            Route::post('/', 'store')->name('payment-methods.store');
            Route::delete('/{payment}', 'destroy')->name('payment-methods.destroy');
            Route::get('trashed', 'trashed')->name('payment-methods.trashed');
            Route::post('/{id}/restore', 'restore')->name('payment-methods.restore');
        });

        Route::controller(TransactionController::class)->prefix('transactions')->group(function () {
            Route::get('/', 'index')->name('transactions.index');
            Route::get('/create', 'create')->name('transactions.create');
            Route::post('/', 'store')->name('transactions.store');
            Route::get('/{transaction}', 'show')->name('transactions.show');
            Route::get('/{transaction}/receipt', 'receipt')->name('transactions.receipt');
        });
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';