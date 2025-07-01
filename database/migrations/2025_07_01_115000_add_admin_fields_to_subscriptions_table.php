<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('meal_plan_id')->nullable()->constrained()->onDelete('set null');
            // Only add status column if it doesn't exist
            if (!Schema::hasColumn('subscriptions', 'status')) {
                $table->string('status')->default('active');
            }
            if (!Schema::hasColumn('subscriptions', 'cancelled_at')) {
                $table->timestamp('cancelled_at')->nullable();
            }
            if (!Schema::hasColumn('subscriptions', 'reactivated_at')) {
                $table->timestamp('reactivated_at')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['meal_plan_id']);
            $table->dropColumn(['user_id', 'meal_plan_id']);
            if (Schema::hasColumn('subscriptions', 'status')) {
                $table->dropColumn('status');
            }
            if (Schema::hasColumn('subscriptions', 'cancelled_at')) {
                $table->dropColumn('cancelled_at');
            }
            if (Schema::hasColumn('subscriptions', 'reactivated_at')) {
                $table->dropColumn('reactivated_at');
            }
        });
    }
};
