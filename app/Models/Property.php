<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [
        'name',
        'category',
        'address',
        'city',
        'contact',
        'phone',
        'email',
        'logo',
        'active',
        'valid_until',
    ];
}
