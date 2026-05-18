<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Outlet extends Model
{
    protected $fillable = [
        'name',
        'tax',
        'service',
        'description',
    ];

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
