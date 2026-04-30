<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'outlet_id',
        'group_id',
        'subgroup_id',
        'portion_id',
        'name',
        'descripton',
        'currency_id',
        'price',
        'happy_hour_price',
        'cost_percentage',
        'recipe_code',
        'printer_kitchen_list',
        'image_path',
        'favorite',
        'active',
    ];

    public function outlet()
    {
        return $this->belongsTo(Outlet::class, 'outlet_id');
    }

    public function group()
    {
        return $this->belongsTo(Group::class, 'group_id');
    }

    public function subgroup()
    {
        return $this->belongsTo(Subgroup::class, 'subgroup_id');
    }

    public function portion()
    {
        return $this->belongsTo(Portion::class, 'portion_id');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }
}
