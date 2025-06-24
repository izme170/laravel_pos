<?php

use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Models\Brand;
use App\Models\PaymentMethod;
use Faker\Provider\ar_EG\Payment;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware('admin')->group(function () {
        Route::controller(UserController::class)->prefix('users')->group(function () {
            Route::get('/', 'index')->name('users.index');
            Route::get('/create', 'create')->name('users.create');
            Route::post('/', 'store')->name('users.store');
            Route::get('/{user}', 'show')->name('users.show');
            Route::get('/{user}/edit', 'edit')->name('users.edit');
            Route::put('/{user}', 'update')->name('users.update');
            Route::delete('/{user}', 'destroy')->name('users.destroy');
        });
    });

    Route::middleware('cashier')->group(function () {
        Route::controller(TransactionController::class)->prefix('transactions')->group(function () {
            Route::get('/create', 'create')->name('transactions.create');
            Route::post('/', 'store')->name('transactions.store');
            Route::get('/{transaction}/receipt', 'receipt')->name('transactions.receipt');
        });      
    });

    Route::middleware('manager')->group(function (){
        Route::get('dashboard', [AnalyticsController::class, 'getDashboardData'])->name('dashboard');
        Route::controller(ProductController::class)->prefix('products')->group(function () {
            Route::get('/', 'index')->name('products.index');
            Route::get('/create', 'create')->name('products.create');
            Route::get('/search', 'search')->name('products.search');
            Route::get('/filter', 'filter')->name('products.filter');
            Route::get('/trashed', 'trashed')->name('products.trashed');
            Route::get('/{product}', 'show')->name('products.show');
            Route::post('/', 'store')->name('products.store');
            Route::get('/{product}/edit', 'edit')->name('products.edit');
            Route::put('/{product}', 'update')->name('products.update');
            Route::delete('/{product}', 'destroy')->name('products.destroy');
            Route::post('/{product}/restore', 'restore')->name('products.restore');
            Route::delete('/{product}/force-delete', 'forceDelete')->name('products.forceDelete');
        });

        Route::controller(DiscountController::class)->prefix('discounts')->group(function () {
            Route::get('/', 'index')->name('discounts.index');
            Route::get('/create', 'create')->name('discounts.create');
            Route::post('/', 'store')->name('discounts.store');
            Route::delete('/{discount}', 'destroy')->name('discounts.destroy');
            Route::get('/trashed', 'trashed')->name('discounts.trashed');
            Route::post('/{id}/restore', 'restore')->name('discounts.restore');
        });

        Route::controller(PaymentMethod::class)->prefix('payment-methods')->group(function () {
            Route::get('/', 'index')->name('payment-methods.index');
            Route::get('/create', 'create')->name('payment-methods.create');
            Route::post('/', 'store')->name('payment-methods.store');
            Route::delete('/{payment}', 'destroy')->name('payment-methods.destroy');
            Route::get('/trashed', 'trashed')->name('payment-methods.trashed');
            Route::post('/{id}/restore', 'restore')->name('payment-methods.restore');
        });

        Route::controller(TransactionController::class)->prefix('transactions')->group(function () {
            Route::get('/', 'index')->name('transactions.index');
            Route::get('/{transaction}', 'show')->name('transactions.show');
        });

        Route::controller(BrandController::class)->prefix('brands')->group(function () {
            Route::get('/', 'index')->name('brands.index');
            Route::get('/create', 'create')->name('brands.create');
            Route::post('/', 'store')->name('brands.store');
            Route::get('/{brand}/edit', 'edit')->name('brands.edit');
            Route::put('/{brand}', 'update')->name('brands.update');
            Route::delete('/{brand}', 'destroy')->name('brands.destroy');
            Route::get('/trashed', 'trashed')->name('brands.trashed');
            Route::post('/{id}/restore', 'restore')->name('brands.restore');
        });

        Route::controller(CategoryController::class)->prefix('categories')->group(function () {
            Route::get('/', 'index')->name('categories.index');
            Route::get('/create', 'create')->name('categories.create');
            Route::post('/', 'store')->name('categories.store');
            Route::get('/trashed', 'trashed')->name('categories.trashed');
            Route::delete('/{category}', 'destroy')->name('categories.destroy');
            Route::put('/{category}/restore', 'restore')->name('categories.restore');
            Route::delete('/{category}/force-delete', 'forceDelete')->name('categories.forceDelete');
        });

        Route::controller(SupplierController::class)->prefix('suppliers')->group(function () {
            Route::get('/', 'index')->name('suppliers.index');
            Route::get('/create', 'create')->name('suppliers.create');
            Route::post('/', 'store')->name('suppliers.store');
            Route::get('/{supplier}/edit', 'edit')->name('suppliers.edit');
            Route::put('/{supplier}', 'update')->name('suppliers.update');
            Route::delete('/{supplier}', 'destroy')->name('suppliers.destroy');
            Route::get('/trashed', 'trashed')->name('suppliers.trashed');
            Route::post('/{id}/restore', 'restore')->name('suppliers.restore');
        });
    });
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';