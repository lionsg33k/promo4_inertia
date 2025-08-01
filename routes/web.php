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
});
Route::get("/products" , [ProductController::class , "index"]);
Route::post('product/store' , [ProductController::class , "store"]);
Route::put('product/update/{product}' , [ProductController::class , "update"])->name("product.update");
Route::delete('product/destroy/{product}' , [ProductController::class , "destroy"])->name("product.destroy");

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
