<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentMethodController extends Controller
{
    public function index()
    {
        $paymentMethods = PaymentMethod::orderBy("id","desc")->get();
        return Inertia::render("PaymentMethods/Index", [
            "paymentMethods" => $paymentMethods
        ]);
    }

    public function create()
    {
        return Inertia::render("PaymentMethods/Create");
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        PaymentMethod::create($validated);

        return redirect()->route('payment-methods.index')->with('success', 'Payment method created successfully.');
    }

    public function destroy(PaymentMethod $paymentMethod)
    {
        $paymentMethod->delete();

        return redirect()->route('payment-methods.index')->with('success', 'Payment method deleted successfully.');
    }

    public function trashed()
    {
        $trashedPaymentMethods = PaymentMethod::onlyTrashed()->get();
        return Inertia::render("PaymentMethods/Trashed", [
            "trashedPaymentMethods" => $trashedPaymentMethods
        ]);
    }

    public function restore($id)
    {
        $paymentMethod = PaymentMethod::withTrashed()->findOrFail($id);
        $paymentMethod->restore();

        return redirect()->route('payment-methods.index')->with('success', 'Payment method restored successfully.');
    }

}
