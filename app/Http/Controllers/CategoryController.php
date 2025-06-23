<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return Inertia::render("categories/index", [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render("categories/create");
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        Category::create($request->all());

        return redirect()->route('categories.index')->with('success', 'Category created successfully.');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }

    public function restore($id)
    {
        $category = Category::withTrashed()->findOrFail($id);
        $category->restore();
        return redirect()->route('categories.trashed')->with('success', 'Category restored successfully.');
    }
    
    public function trashed()
    {
        $categories = Category::onlyTrashed()->get();
        return Inertia::render("categories/trashed", [
            'categories' => $categories
        ]);
    }

    public function forceDelete($id)
    {
        $category = Category::withTrashed()->findOrFail($id);
        $category->forceDelete();
        return redirect()->route('categories.trashed')->with('success', 'Category permanently deleted successfully.');
    }
}
