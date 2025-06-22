import React from 'react';
import { Head, usePage } from '@inertiajs/react';

// Define interfaces for clarity and type safety
interface Product {
    id: number;
    name: string;
    selling_price: number;
    sale_price: number | null;
    image: string | null;
}

interface TransactionItem {
    id: number;
    product_id: number;
    quantity: number;
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

interface User {
    id: number;
    name: string;
    email: string;
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

export default function TransactionReceipt() {
    const { transaction } = usePage<{ transaction: Transaction }>().props;

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
            <Head title={`Receipt for Transaction #${transaction.id}`} />

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100 print:shadow-none print:border-0">
                    {/* Header with actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 print:hidden">
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Transaction Receipt</h1>
                                <p className="text-gray-500 mt-1 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Transaction #{transaction.id}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
                            <button
                                onClick={() => window.print()}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2zm2-4h6a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4a2 2 0 012-2z" />
                                </svg>
                                Print Receipt
                            </button>
                            <a
                                href="/transactions/create"
                                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Transaction
                            </a>
                        </div>
                    </div>

                    {/* Receipt Content */}
                    <div className="space-y-6 text-gray-800">
                        {/* Receipt Header */}
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-extrabold text-blue-700 mb-2">My Shop</h2>
                            <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Thank you for your purchase!
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 text-sm text-gray-500">
                                <p className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {formatDate(transaction.created_at)}
                                </p>
                                <p className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Transaction #{transaction.id}
                                </p>
                            </div>
                        </div>

                        {/* Customer Information */}
                        <div className="border-t border-b border-dashed border-gray-300 py-4">
                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Customer Details
                            </h3>
                            <div className="space-y-2 pl-7">
                                <p className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span><strong>Name:</strong> {transaction.customer_name}</span>
                                </p>
                                {transaction.customer_email && (
                                    <p className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span><strong>Email:</strong> {transaction.customer_email}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="border-b border-dashed border-gray-300 pb-4">
                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Items Purchased
                            </h3>
                            <div className="space-y-3">
                                {transaction.items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm pl-7">
                                        <div className="flex-1">
                                            <p className="font-medium flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {item.product.name}
                                            </p>
                                            <p className="text-gray-600 ml-6">{item.quantity} x ₱{Number(item.price).toFixed(2)}</p>
                                        </div>
                                        <p className="font-semibold">₱{(item.quantity * Number(item.price)).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="space-y-2 py-4">
                            <div className="flex justify-between text-lg">
                                <span className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Subtotal:
                                </span>
                                <span className="font-semibold">₱{
                                    transaction.items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0).toFixed(2)
                                }</span>
                            </div>
                            {transaction.discount && (
                                <div className="flex justify-between text-lg text-red-600">
                                    <span className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                                        </svg>
                                        Discount ({transaction.discount.name}):
                                    </span>
                                    <span className="font-semibold">-₱{
                                        (() => {
                                            const subtotal = transaction.items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
                                            return transaction.discount.type === 'percentage'
                                                ? (subtotal * (transaction.discount.value / 100)).toFixed(2)
                                                : transaction.discount.value.toFixed(2);
                                        })()
                                    }</span>
                                </div>
                            )}
                            <div className="flex justify-between text-xl font-bold border-t border-gray-300 pt-3 mt-3">
                                <span className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Total Amount:
                                </span>
                                <span>₱{Number(transaction.total_amount).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Amount Tendered:
                                </span>
                                <span>₱{Number(transaction.amount_tendered).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-green-700">
                                <span className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Change Due:
                                </span>
                                <span>₱{Number(transaction.change_due).toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="border-t border-dashed border-gray-300 pt-4 text-center">
                            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                Payment Method: <span className="font-semibold">{transaction.payment_method.name}</span>
                            </p>
                            <p className="text-sm mt-4 flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Thank you for shopping with us!
                            </p>
                            {transaction.customer_email && (
                                <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    A copy of this receipt has been sent to {transaction.customer_email}.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}