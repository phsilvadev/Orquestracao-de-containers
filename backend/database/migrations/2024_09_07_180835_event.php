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
        Schema::create('event', function (Blueprint $table) {
            $table->increments('id');
            $table->string('uuid_code');
            $table->unsignedInteger('owner_id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->text('neighborhood')->nullable();
            $table->string('address');
            $table->string('complement')->nullable();
            $table->string('zipcode');
            $table->string('number');
            $table->string('city');
            $table->string('state');
            $table->dateTime('starts_at');
            $table->dateTime('ends_at');
            $table->integer('max_subscription')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('owner_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event');
    }
};
