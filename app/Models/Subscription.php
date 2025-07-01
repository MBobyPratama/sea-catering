<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscription extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'meal_plan_id',
        'name',
        'phone',
        'plan',
        'meal_types',
        'delivery_days',
        'allergies',
        'total_price',
        'status',
        'cancelled_at',
        'reactivated_at',
        'paused_from',
        'paused_until',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'meal_types' => 'array',
        'delivery_days' => 'array',
        'cancelled_at' => 'datetime',
        'reactivated_at' => 'datetime',
        'paused_from' => 'datetime',
        'paused_until' => 'datetime',
    ];

    /**
     * Get the user that owns the subscription.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the meal plan for the subscription.
     */
    public function mealPlan(): BelongsTo
    {
        return $this->belongsTo(MealPlan::class);
    }

    /**
     * Check if the subscription is currently paused.
     */
    public function isPaused(): bool
    {
        if (!$this->paused_from || !$this->paused_until) {
            return false;
        }

        $now = now();
        return $now->between($this->paused_from, $this->paused_until);
    }

    /**
     * Pause the subscription for a specific date range.
     */
    public function pause(\DateTime $from, \DateTime $until): void
    {
        $this->update([
            'paused_from' => $from,
            'paused_until' => $until,
        ]);
    }

    /**
     * Cancel the subscription.
     */
    public function cancel(): void
    {
        $this->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
        ]);
    }

    /**
     * Check if the subscription is cancelled.
     */
    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }
}
