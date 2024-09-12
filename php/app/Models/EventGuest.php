<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventGuest extends Bases
{
    use HasFactory;

    protected $table = 'eventGuests';

    protected $fillable = ['event_id', 'uuid_code', 'user_id'];

    public function event()
    {
        return $this->belongsTo(Events::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
