<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class TestimonialController extends Controller
{
    /**
     * Store a newly created testimonial.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'review' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        Testimonial::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'review' => $request->review,
            'rating' => $request->rating,
        ]);

        return redirect()->route('home')->with('success', 'Thank you for your testimonial!');
    }
}
