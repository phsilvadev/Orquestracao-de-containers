<?php

namespace Database\Seeders;

use Database\Factories\Database\Factories\EventsFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Model\Events;

class EventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Events::factory()->count(10)->create();
    }
}
