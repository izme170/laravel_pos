<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = [
        "name",
        "address",
        "contact_number",
        "email"
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
