<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subgroup extends Model
{
    protected $fillable = [
        'group_id',
        'name',
        'description',
    ];

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function groups()
    {
        return $this->belongsTo(Group::class, 'group_id');
    }
}
