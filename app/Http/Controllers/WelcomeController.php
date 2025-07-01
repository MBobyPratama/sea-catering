<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    /**
     * Show the welcome page with testimonials.
     */
    public function index(): Response
    {
        $testimonials = Testimonial::with('user')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($testimonial) {
                return [
                    'name' => $testimonial->name,
                    'review' => $testimonial->review,
                    'rating' => $testimonial->rating,
                ];
            });

        return Inertia::render('welcome', [
            'testimonials' => $testimonials,
        ]);
    }
}
