<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Subscription;
use App\Models\User;
use App\Models\MealPlan;
use Carbon\Carbon;

class SubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role', 'user')->get();
        $mealPlans = MealPlan::all();

        if ($users->isEmpty() || $mealPlans->isEmpty()) {
            return;
        }

        // Create some active subscriptions
        for ($i = 0; $i < 15; $i++) {
            Subscription::create([
                'user_id' => $users->random()->id,
                'meal_plan_id' => $mealPlans->random()->id,
                'name' => 'Customer ' . ($i + 1),
                'phone' => '081234567' . sprintf('%03d', $i),
                'plan' => 'weekly',
                'meal_types' => json_encode(['breakfast', 'lunch', 'dinner']),
                'delivery_days' => json_encode(['monday', 'wednesday', 'friday']),
                'allergies' => $i % 3 == 0 ? 'No allergies' : null,
                'total_price' => rand(150, 400),
                'status' => 'active',
                'created_at' => Carbon::now()->subDays(rand(1, 60)),
            ]);
        }

        // Create some cancelled subscriptions
        for ($i = 0; $i < 5; $i++) {
            Subscription::create([
                'user_id' => $users->random()->id,
                'meal_plan_id' => $mealPlans->random()->id,
                'name' => 'Ex-Customer ' . ($i + 1),
                'phone' => '081234560' . sprintf('%02d', $i),
                'plan' => 'weekly',
                'meal_types' => json_encode(['breakfast', 'lunch']),
                'delivery_days' => json_encode(['tuesday', 'thursday']),
                'allergies' => null,
                'total_price' => rand(150, 300),
                'status' => 'cancelled',
                'cancelled_at' => Carbon::now()->subDays(rand(1, 30)),
                'created_at' => Carbon::now()->subDays(rand(31, 90)),
            ]);
        }

        // Create some reactivated subscriptions
        for ($i = 0; $i < 3; $i++) {
            Subscription::create([
                'user_id' => $users->random()->id,
                'meal_plan_id' => $mealPlans->random()->id,
                'name' => 'Returning Customer ' . ($i + 1),
                'phone' => '081234555' . sprintf('%02d', $i),
                'plan' => 'monthly',
                'meal_types' => json_encode(['lunch', 'dinner']),
                'delivery_days' => json_encode(['monday', 'wednesday', 'friday']),
                'allergies' => null,
                'total_price' => rand(200, 500),
                'status' => 'active',
                'cancelled_at' => Carbon::now()->subDays(rand(20, 40)),
                'reactivated_at' => Carbon::now()->subDays(rand(1, 15)),
                'created_at' => Carbon::now()->subDays(rand(41, 100)),
            ]);
        }
    }
}
