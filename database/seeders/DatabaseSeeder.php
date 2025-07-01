<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User if it doesn't exist
        if (!User::where('email', 'admin@seacatering.com')->exists()) {
            User::factory()->create([
                'name' => 'Admin',
                'email' => 'admin@seacatering.com',
                'password' => bcrypt('admin123'),
                'role' => 'admin',
            ]);
        }

        // Create Test User if it doesn't exist
        if (!User::where('email', 'user@seacatering.com')->exists()) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'user@seacatering.com',
                'password' => bcrypt('password'),
                'role' => 'user',
            ]);
        }
    }
}
