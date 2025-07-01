<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/menu', function () {
        return Inertia::render('Menu');
    })->name('menu');

    Route::get('/subscription', function () {
        return Inertia::render('Subscription');
    })->name('subscription');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
