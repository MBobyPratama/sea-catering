<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\SubscriptionController;

Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::get('/menu', function () {
    return Inertia::render('Menu');
})->name('menu');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('subscription/{subscription}/pause', [DashboardController::class, 'pauseSubscription'])->name('subscription.pause');
    Route::post('subscription/{subscription}/cancel', [DashboardController::class, 'cancelSubscription'])->name('subscription.cancel');
    Route::post('subscription/{subscription}/activate', [DashboardController::class, 'activateSubscription'])->name('subscription.activate');

    Route::get('/subscription', [SubscriptionController::class, 'create'])->name('subscription');
    Route::post('/subscription', [SubscriptionController::class, 'store'])->name('subscription.store');

    // Testimonial route for authenticated users
    Route::post('/testimonials', [TestimonialController::class, 'store'])->name('testimonials.store');
});

// Admin routes
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->group(function () {
    Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
