<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Testimonial;
use App\Models\User;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role', 'user')->get();

        $testimonials = [
            [
                'name' => 'Michael Johnson',
                'review' => 'The meals are delicious and have helped me a lot in my diet program. Highly recommended!',
                'rating' => 5,
            ],
            [
                'name' => 'Kimberly Smith',
                'review' => 'Excellent service and food quality. The delivery is always on time.',
                'rating' => 5,
            ],
            [
                'name' => 'David Brown',
                'review' => 'A great choice for healthy and practical food. The menu is very varied.',
                'rating' => 4,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create([
                'user_id' => $users->isNotEmpty() ? $users->random()->id : null,
                'name' => $testimonial['name'],
                'review' => $testimonial['review'],
                'rating' => $testimonial['rating'],
            ]);
        }
    }
}
