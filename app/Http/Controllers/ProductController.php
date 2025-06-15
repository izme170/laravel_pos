<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return Inertia::render('products/index', compact(['products']));
    }

    public function show($id)
    {
        $product = Product::find($id);
        if(!$product){
            return redirect()->route('products.index')->with('error', 'Product not found');
        }
        return Inertia::render('Products/Show', [
            'products' => $product
        ]);
    }

    public function create()
    {
        $brands = Brand::all();
        $category = Category::all();
        $supplier = Supplier::all();
        return Inertia::render('Products/Create', [
            'brands' => $brands,
            'categories' => $category,
            'suppliers' => $supplier
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand_id' => 'required|exists:brands,id',
            'category_id' => 'required|exists:categories,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'description' => 'nullable|string',
            'buying_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0|lte:selling_price',
            'stock' => 'required|integer|min:0',
            'barcode' => 'nullable|string|max:255'
        ]);

        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            $imageName = Str::uuid() . '.' . $request->image->extension();
            $request->image->storeAs('images', $imageName, 'public');
            $validated['image'] = $imageName;
        }

        Product::create($validated);

        return redirect()->route('products.index')->with('success', 'Product created successfully');
    }

    public function edit($id)
    {
        $product = Product::find($id);
        if(!$product){
            return redirect()->route('products.index')->with('error', 'Product not found');
        }
        $brands = Brand::all();
        $categories = Category::all();
        $suppliers = Supplier::all();
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'brands' => $brands,
            'categories' => $categories,
            'suppliers' => $suppliers
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand_id' => 'required|exists:brands,id',
            'category_id' => 'required|exists:categories,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'description' => 'nullable|string',
            'buying_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'barcode' => 'nullable|string|max:255'
        ]);

        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            $imageName = Str::uuid() . '.' . $request->image->extension();
            $request->image->storeAs('images', $imageName, 'public');
            $validated['image'] = $imageName;
        }

        $product = Product::find($id);
        if(!$product){
            return redirect()->route('products.index')->with('error', 'Product not found');
        }

        $product->update($validated);

        return redirect()->route('products.index')->with('success', 'Product updated successfully');
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if(!$product){
            return redirect()->route('products.index')->with('error', 'Product not found');
        }

        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully');
    }

    public function restore($id)
    {
        $product = Product::withTrashed()->find($id);
        if(!$product){
            return redirect()->route('products.index')->with('error', 'Product not found');
        }

        $product->restore();

        return redirect()->route('products.index')->with('success', 'Product restored successfully');
    }

    public function forceDelete($id)
    {
        $product = Product::withTrashed()->find($id);
        if(!$product){
            return redirect()->route('products.index')->with('error', 'Product not found');
        }

        $product->forceDelete();

        return redirect()->route('products.index')->with('success', 'Product permanently deleted successfully');
    }

    public function trashed()
    {
        $trashedProducts = Product::onlyTrashed()->get();
        return Inertia::render('Products/Trashed', [
            'products' => $trashedProducts
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $products = Product::where('name', 'like', '%' . $query . '%')
            ->orWhere('barcode', 'like', '%' . $query . '%')
            ->get();

        return Inertia::render('Products/SearchResults', [
            'products' => $products,
            'query' => $query
        ]);
    }
    public function filter(Request $request)
    {
        $filters = $request->only(['brand_id', 'category_id', 'supplier_id']);
        $query = Product::query();

        if ($filters['brand_id']) {
            $query->where('brand_id', $filters['brand_id']);
        }
        if ($filters['category_id']) {
            $query->where('category_id', $filters['category_id']);
        }
        if ($filters['supplier_id']) {
            $query->where('supplier_id', $filters['supplier_id']);
        }

        $products = $query->get();

        return Inertia::render('Products/FilterResults', [
            'products' => $products,
            'filters' => $filters
        ]);
    }
}
