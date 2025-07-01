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
      'subscriptions' => $subscriptions,
      'flash' => [
        'success' => session('success'),
      ]
    ]);
  }

  /**
   * Pause a subscription.
   */
  public function pauseSubscription(Request $request, \App\Models\Subscription $subscription)
  {
    // Ensure the subscription belongs to the authenticated user
    if ($subscription->user_id !== Auth::id()) {
      abort(403, 'Unauthorized');
    }

    $request->validate([
      'pause_from' => 'required|date|after_or_equal:today',
      'pause_until' => 'required|date|after:pause_from',
    ]);

    $subscription->pause(
      new \DateTime($request->pause_from),
      new \DateTime($request->pause_until)
    );

    return redirect()->back()->with('success', 'Subscription paused successfully.');
  }

  /**
   * Cancel a subscription.
   */
  public function cancelSubscription(\App\Models\Subscription $subscription)
  {
    // Ensure the subscription belongs to the authenticated user
    if ($subscription->user_id !== Auth::id()) {
      abort(403, 'Unauthorized');
    }

    $subscription->cancel();

    return redirect()->back()->with('success', 'Subscription cancelled successfully.');
  }

  /**
   * Activate a paused subscription.
   */
  public function activateSubscription(\App\Models\Subscription $subscription)
  {
    // Ensure the subscription belongs to the authenticated user
    if ($subscription->user_id !== Auth::id()) {
      abort(403, 'Unauthorized');
    }

    $subscription->activate();

    return redirect()->back()->with('success', 'Subscription activated successfully.');
  }
}
