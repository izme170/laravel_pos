<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index()
    {
        $brand = Brand::all();
        return Inertia::render("brands/index", [
            'brands' => $brand
        ]);
    }

    public function create()
    {
        return Inertia::render("brands/create");
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        Brand::create($request->all());

        return redirect()->route('brands.index')->with('success', 'Brand created successfully.');
    }


        public function edit(Brand $brand)
    {
        return Inertia::render("brands/edit", [
            'brand' => $brand,
        ]);
    }


    public function update(Request $request, Brand $brand)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $brand->update($request->all());

        return redirect()->route('brands.index')->with('success', 'Brand updated successfully.');
    }

    public function destroy(Brand $brand)
    {
        $brand->delete();
        return redirect()->route('brands.index')->with('success', 'Brand deleted successfully.');
    }

    public function restore($id)
    {
        $brand = Brand::withTrashed()->findOrFail($id);
        $brand->restore();
        return redirect()->route('brands.index')->with('success', 'Brand restored successfully.');
    }

    public function trashed()
    {
        $trashedBrands = Brand::onlyTrashed()->get();
        return Inertia::render("brands/trash", [
            'trashedBrands' => $trashedBrands
        ]);
    }
}
