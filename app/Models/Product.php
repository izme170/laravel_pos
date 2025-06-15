<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    protected $fillable = [
        "name",
        "brand_id",
        "category_id",
        "supplier_id",
        "description",
        "buying_price",
        "selling_price",
        "sale_price",
        "stock",
        "barcode"
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
