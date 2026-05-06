<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    // protected $table = 'currencies';

    protected $fillable = [
        'currency',
        'exc_rate',
    ];

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
