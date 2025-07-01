<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\MealPlan;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SubscriptionPriceCalculationTest extends TestCase
{
    use RefreshDatabase;

    public function test_subscription_price_calculation_is_correct()
    {
        // Create a user
        $user = User::factory()->create();

        // Create meal plans
        MealPlan::create(['name' => 'Protein Plan', 'price' => 40000, 'description' => 'Test', 'details' => 'Test']);

        // Test case: Protein Plan (40,000) x 2 meal types x 5 delivery days x 4.3 = 1,720,000
        $response = $this->actingAs($user)->post('/subscription', [
            'name' => 'Test User',
            'phone' => '081234567890',
            'plan' => '40000',
            'mealTypes' => ['Breakfast', 'Dinner'],
            'deliveryDays' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            'allergies' => null,
        ]);

        $response->assertRedirect(route('dashboard'));
        
        // Check if subscription was created with correct total price
        $this->assertDatabaseHas('subscriptions', [
            'user_id' => $user->id,
            'plan' => '40000',
            'total_price' => 1720000.00, // 40000 x 2 x 5 x 4.3
        ]);
    }

    public function test_different_plan_price_calculation()
    {
        // Create a user
        $user = User::factory()->create();

        // Create meal plans
        MealPlan::create(['name' => 'Diet Plan', 'price' => 30000, 'description' => 'Test', 'details' => 'Test']);

        // Test case: Diet Plan (30,000) x 3 meal types x 7 delivery days x 4.3 = 2,709,000
        $response = $this->actingAs($user)->post('/subscription', [
            'name' => 'Test User',
            'phone' => '081234567890',
            'plan' => '30000',
            'mealTypes' => ['Breakfast', 'Lunch', 'Dinner'],
            'deliveryDays' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'allergies' => 'None',
        ]);

        $response->assertRedirect(route('dashboard'));
        
        // Check if subscription was created with correct total price
        $this->assertDatabaseHas('subscriptions', [
            'user_id' => $user->id,
            'plan' => '30000',
            'total_price' => 2709000.00, // 30000 x 3 x 7 x 4.3
        ]);
    }
}
