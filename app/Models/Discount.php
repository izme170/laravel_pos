<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    protected $fillable = [
        'name',
        'type',
        'value',
    ];

    public function transactions()
    {
        return $this->belongsToMany(Transaction::class);
    }
}
