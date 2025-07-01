<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MealPlan extends Model
{
    /**
     * Get the subscriptions for the meal plan.
     */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }
}
