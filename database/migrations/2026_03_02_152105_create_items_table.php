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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('outlet_id')->constrained()->onDelete('restrict');
            $table->foreignId('group_id')->constrained()->onDelete('restrict');
            $table->foreignId('subgroup_id')->constrained()->onDelete('restrict');
            $table->foreignId('portion_id')->constrained()->onDelete('restrict');
            $table->string('name');
            $table->string('description')->nullable();
            $table->foreignId('currency_id')->constrained()->onDelete('restrict');
            $table->decimal('price')->default(0);
            $table->string('happy_hour_price')->nullable();
            $table->decimal('cost_percentage')->nullable();
            $table->string('recipe_code')->nullable();
            $table->string('printer_kitchen_list')->nullable(); //"Printer Kitchen, printer Bar"
            $table->string('image_path')->nullable();
            $table->boolean('favorite')->default(0);
            $table->boolean('active')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
