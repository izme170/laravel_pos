<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Discount extends Model
{
    use SoftDeletes;
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
