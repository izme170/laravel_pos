<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    public function index()
    {
        $discounts = Discount::all();
        return inertia('Discounts/Index', [
            'discounts' => $discounts
        ]);
    }

    public function create()
    {
        return inertia('Discounts/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'in:percentage,amount'],
            'value' => ['required', 'numeric', 'min:0'],
        ]);

        if ($validated['type'] === 'percentage' && $validated['value'] > 100) {
            return back()->withErrors(['value' => 'Percentage cannot exceed 100%.'])->withInput();
        }

        Discount::create($validated);

        return redirect()->route('discounts.index')->with('success', 'Discount created successfully.');
    }

    public function destroy(Discount $discount)
    {
        $discount->delete();

        return redirect()->route('discounts.index')->with('success', 'Discount deleted successfully.');
    }

    public function trashed()
    {
        $trashedDiscounts = Discount::onlyTrashed()->get();
        return inertia('Discounts/Trashed', [
            'trashedDiscounts' => $trashedDiscounts
        ]);
    }

    public function restore($id)
    {
        $discount = Discount::withTrashed()->findOrFail($id);
        $discount->restore();

        return redirect()->route('discounts.index')->with('success', 'Discount restored successfully.');
    }

}
