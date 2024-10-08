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
        Schema::create('eventGuests', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('event_id');
            $table->uuid('uuid_code')->unique();
            $table->timestamps();
            $table->softDeletes();
            $table->unsignedInteger('user_id');

            $table->foreign('event_id')->references('id')->on('event')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eventGuests');
    }
    
};
