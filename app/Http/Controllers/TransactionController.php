<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with(['user', 'items', 'discount', 'paymentMethod'])->get();
        return Inertia::render('transactions/index', [
            'transactions' => $transactions,
        ]);
    }

    public function create(Request $request)
    {
        $products = Product::all();
        $paymentMethods = PaymentMethod::all();
        $discounts = Discount::all();

        $selectedProduct = null;
        if ($request->has('product_id')) {
            $selectedProduct = Product::find($request->product_id);
        }

        return Inertia::render('transactions/create', [
            'products' => $products,
            'paymentMethods' => $paymentMethods,
            'discounts' => $discounts,
            'selectedProduct' => $selectedProduct,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'discount_id' => 'nullable|exists:discounts,id',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'amount_tendered' => 'required|numeric|min:0',
            'change_due' => 'required|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
        ]);

        $validated['user_id'] = auth()->id();

        $transactionData = collect($validated)->except('items')->toArray();
        $transaction = Transaction::create($transactionData);

        foreach ($validated['items'] as $item) {
            $transaction->items()->create($item);
        }

        return redirect()->route('transactions.receipt', $transaction->id)->with('success', 'Transaction created successfully.');
    }

    public function show($id)
    {
        // Eager load 'items.product' to ensure product details are available
        $transaction = Transaction::with(['user', 'items.product', 'discount', 'paymentMethod'])->findOrFail($id);
        return Inertia::render('transactions/show', [
            'transaction' => $transaction,
        ]);
    }

    public function receipt($id)
    {
        // Eager load 'items.product' to ensure product details are available for the receipt
        $transaction = Transaction::with(['user', 'items.product', 'discount', 'paymentMethod'])->findOrFail($id);
        return Inertia::render('transactions/receipt', [
            'transaction' => $transaction,
        ]);
    }

    public function destroy($id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();
        return redirect()->route('transactions.index')->with('success', 'Transaction deleted successfully.');
    }

    public function trashed()
    {
        $trashedTransactions = Transaction::onlyTrashed()->with(['user', 'items', 'discount', 'paymentMethod'])->get();
        return Inertia::render('Transactions/Trashed', [
            'trashedTransactions' => $trashedTransactions,
        ]);
    }

    public function restore($id)
    {
        $transaction = Transaction::withTrashed()->findOrFail($id);
        $transaction->restore();
        return redirect()->route('transactions.index')->with('success', 'Transaction restored successfully.');
    }
    
    public function forceDelete($id)
    {
        $transaction = Transaction::withTrashed()->findOrFail($id);
        $transaction->forceDelete();
        return redirect()->route('transactions.trashed')->with('success', 'Transaction permanently deleted successfully.');
    }
}
