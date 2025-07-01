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

    // Convert dates to Carbon objects for proper comparison
    $startDateCarbon = Carbon::parse($startDate)->startOfDay();
    $endDateCarbon = Carbon::parse($endDate)->endOfDay();

    // New Subscriptions: subscriptions created in the selected period
    $newSubscriptions = Subscription::whereBetween('created_at', [$startDateCarbon, $endDateCarbon])->count();

    // Monthly Recurring Revenue (MRR): sum of active subscription prices
    $activeSubscriptions = Subscription::whereNull('cancelled_at')
      ->orWhere('cancelled_at', '>', $endDateCarbon)
      ->with('mealPlan')
      ->get();

    $mrr = $activeSubscriptions->sum(function ($subscription) {
      return $subscription->mealPlan ? $subscription->mealPlan->price : 0;
    });

    // Reactivations: subscriptions that were cancelled and then restarted during the period
    $reactivations = Subscription::whereBetween('reactivated_at', [$startDateCarbon, $endDateCarbon])
      ->whereNotNull('reactivated_at')
      ->count();

    // Subscription Growth: total number of active subscriptions
    $totalActiveSubscriptions = Subscription::whereNull('cancelled_at')
      ->orWhere('cancelled_at', '>', $endDateCarbon)
      ->count();

    return Inertia::render('Admin/Dashboard', [
      'newSubscriptions' => $newSubscriptions,
      'mrr' => $mrr,
      'reactivations' => $reactivations,
      'subscriptionGrowth' => $totalActiveSubscriptions,
      'startDate' => $startDate,
      'endDate' => $endDate,
    ]);
  }
}
