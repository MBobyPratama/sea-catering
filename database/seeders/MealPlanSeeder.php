<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MealPlan;

class MealPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mealPlans = [
            [
                'name' => 'Basic Plan',
                'description' => 'Simple and healthy meals for everyday',
                'price' => 150.00,
                'duration_days' => 7,
            ],
            [
                'name' => 'Premium Plan',
                'description' => 'High-quality ingredients with premium recipes',
                'price' => 250.00,
                'duration_days' => 7,
            ],
            [
                'name' => 'Family Plan',
                'description' => 'Perfect for families with larger portions',
                'price' => 400.00,
                'duration_days' => 7,
            ],
            [
                'name' => 'Monthly Basic',
                'description' => 'Basic plan for a full month',
                'price' => 600.00,
                'duration_days' => 30,
            ],
            [
                'name' => 'Monthly Premium',
                'description' => 'Premium plan for a full month',
                'price' => 1000.00,
                'duration_days' => 30,
            ],
        ];

        foreach ($mealPlans as $plan) {
            MealPlan::firstOrCreate(['name' => $plan['name']], $plan);
        }
    }
}
