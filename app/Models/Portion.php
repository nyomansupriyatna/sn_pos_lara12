<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portion extends Model
{
    protected $fillable = [
        'portion',
    ];

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
