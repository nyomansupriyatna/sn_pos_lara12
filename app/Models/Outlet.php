<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Outlet extends Model
{
    protected $fillable = [
        'outlet',
        'tax',
        'service',
    ];

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
