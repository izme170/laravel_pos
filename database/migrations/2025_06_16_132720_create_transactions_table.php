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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('customer_name')->nullable(); 
            $table->string('customer_email')->nullable(); 
            $table->foreignId('discount_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('payment_method_id')->constrained()->onDelete('cascade');
            $table->decimal('amount_tendered', 10, 2);
            $table->decimal('change_due', 10, 2);
            $table->decimal('total_amount', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
