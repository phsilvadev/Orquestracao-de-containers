<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Bases extends Model
{
    use HasFactory;

    protected $fillable = ['uuid_code', 'created_at', 'updated_at', 'deleted_at'];


    // Adicione um boot method para gerar UUID ao criar o modelo
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->uuid_code)) {
                $model->uuid_code = (string) Str::uuid();
            }
        });
    }

    
}
