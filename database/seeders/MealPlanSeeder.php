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
                'details' => 'Includes 3 meals per day with balanced nutrition for weight management.',
            ],
            [
                'name' => 'Premium Plan',
                'description' => 'High-quality ingredients with premium recipes',
                'price' => 250.00,
                'details' => 'Premium ingredients, chef-prepared meals with exotic flavors and superfoods.',
            ],
            [
                'name' => 'Family Plan',
                'description' => 'Perfect for families with larger portions',
                'price' => 400.00,
                'details' => 'Family-sized portions for 4 people, kid-friendly options included.',
            ],
            [
                'name' => 'Monthly Basic',
                'description' => 'Basic plan for a full month',
                'price' => 600.00,
                'details' => 'Cost-effective monthly subscription with consistent daily meals.',
            ],
            [
                'name' => 'Monthly Premium',
                'description' => 'Premium plan for a full month',
                'price' => 1000.00,
                'details' => 'Monthly premium subscription with variety and luxury meal options.',
            ],
        ];

        foreach ($mealPlans as $plan) {
            MealPlan::firstOrCreate(['name' => $plan['name']], $plan);
        }
    }
}
