<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subgroup extends Model
{
    protected $fillable = [
        'group_id',
        'subgroup',
    ];

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
