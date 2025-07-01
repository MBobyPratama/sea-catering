<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Subscription;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
  public function index(Request $request)
  {
    $startDate = $request->input('start_date', Carbon::now()->subMonth()->toDateString());
    $endDate = $request->input('end_date', Carbon::now()->toDateString());

    $subscriptions = Subscription::whereBetween('created_at', [$startDate, $endDate])->get();

    $newSubscriptions = $subscriptions->count();
    $mrr = $subscriptions->sum('mealPlan.price');

    return Inertia::render('Admin/Dashboard', [
      'newSubscriptions' => $newSubscriptions,
      'mrr' => $mrr,
      'startDate' => $startDate,
      'endDate' => $endDate,
    ]);
  }
}
