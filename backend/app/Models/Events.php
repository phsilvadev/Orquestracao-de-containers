<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Events extends Bases
{
    use HasFactory;

    protected $table = 'event';

    protected $fillable = [
        'owner_id', 'name', 'description', 'address', 'complement', 'zipcode',
        'number', 'city', 'state', 'starts_at', 'ends_at', 'max_subscription', 'is_active', 'neighborhood'
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
