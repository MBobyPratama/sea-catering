<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
  /**
   * Display the user dashboard.
   */
  public function index()
  {
    /** @var \App\Models\User $user */
    $user = Auth::user();
    $subscriptions = $user->subscriptions()->with('mealPlan')->get();

    return Inertia::render('Dashboard/Index', [
      'subscriptions' => $subscriptions
    ]);
  }
}
