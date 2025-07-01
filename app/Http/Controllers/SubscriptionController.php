<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\MealPlan;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SubscriptionController extends Controller
{
    /**
     * Show the subscription form.
     */
    public function create(): Response
    {
        $mealPlans = MealPlan::all();

        return Inertia::render('Subscription', [
            'mealPlans' => $mealPlans
        ]);
    }

    /**
     * Store a newly created subscription.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'plan' => 'required|string',
            'mealTypes' => 'required|array|min:1',
            'deliveryDays' => 'required|array|min:1',
            'allergies' => 'nullable|string|max:1000',
        ]);

        // Calculate total price
        $planPrice = (float) $request->plan;
        $numMealTypes = count($request->mealTypes);
        $numDeliveryDays = count($request->deliveryDays);
        $totalPrice = $planPrice * $numMealTypes * $numDeliveryDays * 4.3;

        // Find or create a meal plan based on price
        $mealPlan = MealPlan::where('price', $planPrice)->first();
        if (!$mealPlan) {
            // Create a default meal plan if not found
            $planName = match ($planPrice) {
                30000 => 'Diet Plan',
                40000 => 'Protein Plan',
                60000 => 'Royal Plan',
                default => 'Custom Plan'
            };

            $mealPlan = MealPlan::create([
                'name' => $planName,
                'price' => $planPrice,
                'description' => "Custom meal plan - {$planName}",
                'details' => "Meal plan with price {$planPrice}",
            ]);
        }

        // Create subscription
        Subscription::create([
            'user_id' => Auth::id(),
            'meal_plan_id' => $mealPlan->id,
            'name' => $request->name,
            'phone' => $request->phone,
            'plan' => $request->plan,
            'meal_types' => $request->mealTypes,
            'delivery_days' => $request->deliveryDays,
            'allergies' => $request->allergies,
            'total_price' => $totalPrice,
            'status' => 'active',
        ]);

        return redirect()->route('dashboard')->with('success', 'Subscription created successfully!');
    }
}
