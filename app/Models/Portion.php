<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portion extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
