<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return Inertia::render('products/index', [
            'products' => $products,
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

    public function show($id)
    {
        $product = Product::find($id);
        if(!$product){
            return redirect()->route('products.index')->with('error', 'Product not found');
        }
        return Inertia::render('products/show', [
            'product' => $product
        ]);
    }

    public function create()
    {
        $brands = Brand::all();
        $categories = Category::all();
        $suppliers = Supplier::all();
        return Inertia::render('products/create', [
            'brands' => $brands,
            'categories' => $categories,
            'suppliers' => $suppliers
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
            'barcode' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
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
        return Inertia::render('products/edit', [
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
            'barcode' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
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
        return Inertia::render('products/trashed', [
            'products' => $trashedProducts
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $products = Product::where('name', 'like', '%' . $query . '%')
            ->orWhere('barcode', 'like', '%' . $query . '%')
            ->get();

        return Inertia::render('products/search-results', [
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

        return Inertia::render('products/filter-results', [
            'products' => $products,
            'filters' => $filters
        ]);
    }

    // New method for adding to cart
    public function addToCart(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::find($id);
        if (!$product) {
            return redirect()->route('products.index')->with('error', 'Product not found');
        }

        if ($product->stock < $validated['quantity']) {
            return redirect()->route('products.index')->with('error', 'Insufficient stock available');
        }

        // Here you would typically save to a cart table or session
        // For now, we'll just return success with a flash message
        $message = "{$validated['quantity']} x {$product->name} added to cart successfully";
        
        return redirect()->route('products.index')->with('success', $message);
    }
}