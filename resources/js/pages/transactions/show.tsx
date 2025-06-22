import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import moment from 'moment';

// Define interfaces for type safety (keep these as they are correct)
interface User {
    id: number;
    name: string;
    email: string;
}

interface Product {
    id: number;
    name: string;
    selling_price: number;
    sale_price: number | null;
    stock: number;
    image: string | null;
}

interface TransactionItem {
    id: number;
    product_id: number;
    quantity: number;
    // Keep price as number in interface, but handle potential string value from backend
    price: number;
    product: Product;
}

interface Discount {
    id: number;
    name: string;
    type: 'percentage' | 'amount';
    value: number;
}

interface PaymentMethod {
    id: number;
    name: string;
}

interface Transaction {
    id: number;
    user_id: number;
    customer_name: string;
    customer_email: string;
    discount_id: number | null;
    payment_method_id: number;
    amount_tendered: number;
    change_due: number;
    total_amount: number;
    created_at: string;
    updated_at: string;
    user: User;
    items: TransactionItem[];
    discount: Discount | null;
    payment_method: PaymentMethod;
}

export default function TransactionShow() {
    const { transaction } = usePage<{ transaction: Transaction }>().props;

    // Calculate subtotal from items
    const subtotal = transaction.items.reduce((sum, item) => sum + (parseFloat(item.price as any) * item.quantity), 0);

    // Calculate discount amount
    const discountAmount = transaction.discount
        ? (transaction.discount.type === 'percentage'
            ? subtotal * (transaction.discount.value / 100)
            : transaction.discount.value)
        : 0;

    return (
        <AppLayout>
            <Head title={`Transaction #${transaction.id} Details`} />
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Transaction Details</h1>
                        <p className="text-gray-500 mt-1">Transaction #{transaction.id}</p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href={route('transactions.receipt', transaction.id)}
                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            View Receipt
                        </Link>
                        <Link
                            href={route('transactions.index')}
                            className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Transactions
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Transaction Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Transaction Overview */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4">Transaction Overview</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Transaction ID</h3>
                                    <p className="text-lg font-semibold text-gray-900">#{transaction.id}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {moment(transaction.created_at).format('MMM D, YYYY h:mm A')}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Processed By</h3>
                                    <p className="text-lg font-semibold text-gray-900">{transaction.user.name}</p>
                                    <p className="text-sm text-gray-500">{transaction.user.email}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Completed
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Customer Information */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Customer Name</h3>
                                    <p className="text-lg font-semibold text-gray-900">{transaction.customer_name}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-500">Email Address</h3>
                                    <p className="text-lg font-semibold text-gray-900">{transaction.customer_email || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Items Purchased */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4">Items Purchased</h2>
                            <div className="space-y-4">
                                {transaction.items.map((item) => (
                                    <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                                        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                                            {item.product.image ? (
                                                <img
                                                    src={`/storage/images/${item.product.image}`}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                                            <div className="mt-1 space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Unit Price:</span> ₱{parseFloat(item.price as any).toFixed(2)}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Quantity:</span> {item.quantity}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Product ID:</span> #{item.product.id}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-gray-900">
                                                ₱{(parseFloat(item.price as any) * item.quantity).toFixed(2)}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {item.quantity} × ₱{parseFloat(item.price as any).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="space-y-6">
                        {/* Payment Method */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-900">{transaction.payment_method.name}</p>
                                    <p className="text-sm text-gray-500">Payment method used</p>
                                </div>
                            </div>
                        </div>

                        {/* Discount Applied */}
                        {transaction.discount && (
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                <h2 className="text-xl font-semibold mb-4">Discount Applied</h2>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-gray-900">{transaction.discount.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {transaction.discount.type === 'percentage'
                                                ? `${transaction.discount.value}% discount`
                                                : `₱${transaction.discount.value} discount`
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Order Summary */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">₱{subtotal.toFixed(2)}</span>
                                </div>
                                {transaction.discount && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Discount</span>
                                        <span className="text-red-600 font-medium">-₱{discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-semibold">Total Amount</span>
                                        <span className="text-lg font-bold text-gray-900">₱{Number(transaction.total_amount).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Amount Tendered</span>
                                    <span className="font-medium">₱{Number(transaction.amount_tendered).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Change Due</span>
                                    <span className="font-medium text-green-600">₱{Number(transaction.change_due).toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-500">Items Count</span>
                                        <span className="text-sm font-medium">{transaction.items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}