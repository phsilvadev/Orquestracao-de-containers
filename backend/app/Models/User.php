<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;


class User extends Bases implements JWTSubject, Authenticatable
{
    use Notifiable, AuthenticableTrait;

    protected $table = 'users';

    protected $fillable = ['username', 'password', 'email', 'last_login'];


    public function events()
    {
        return $this->hasMany(Events::class, 'owner_id');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
