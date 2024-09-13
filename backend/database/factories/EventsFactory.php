<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Events>
 */
class EventsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = \App\Models\User::first();

        return [
            'owner_id' => $user->id, // Gera um usuário associado
            'name' => $this->faker->sentence(3), // Nome do evento com 3 palavras
            'description' => $this->faker->paragraph(), // Descrição do evento
            'address' => $this->faker->streetAddress(), // Endereço fictício
            'complement' => $this->faker->secondaryAddress(), // Complemento
            'zipcode' => $this->faker->postcode(), // CEP
            'number' => $this->faker->buildingNumber(), // Número do endereço
            'city' => $this->faker->city(), // Cidade
            'state' => $this->faker->stateAbbr(), // Estado com abreviação
            'starts_at' => $this->faker->dateTimeBetween('now', '+1 week'), // Data de início
            'ends_at' => $this->faker->dateTimeBetween('+1 week', '+2 weeks'), // Data de término
            'max_subscription' => $this->faker->numberBetween(10, 100), // Limite máximo de inscrições
            'is_active' => $this->faker->boolean(), // Se o evento está ativo ou não
        ];
    }
}
