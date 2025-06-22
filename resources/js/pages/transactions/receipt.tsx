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
    price: number; // Price at the time of transaction
    product: Product; // Full product details
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
    // Access page props from Inertia.js
    const { transaction } = usePage<{ transaction: Transaction }>().props;

    // Helper function to format date
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
        <div className="min-h-screen bg-gray-100 text-gray-900 font-sans antialiased">
            <Head title={`Receipt for Transaction #${transaction.id}`} />

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100 print:shadow-none print:border-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 print:hidden">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Transaction Receipt</h1>
                            <p className="text-gray-500 mt-1">Details for transaction #{transaction.id}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
                            <button
                                onClick={() => window.print()}
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0l-1 1h8l-1-1m0 0h2a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2" />
                                </svg>
                                Print Receipt
                            </button>
                            <a
                                href="/transactions/create" // Hardcoded path since route() helper is unavailable
                                className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Transaction
                            </a>
                        </div>
                    </div>

                    <div className="space-y-6 text-gray-800">
                        {/* Receipt Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-extrabold text-blue-700 mb-2">My Shop Receipt</h2>
                            <p className="text-lg text-gray-600">Thank you for your purchase!</p>
                            <p className="text-sm text-gray-500 mt-2">Date: {formatDate(transaction.created_at)}</p>
                            <p className="text-sm text-gray-500">Transaction ID: <span className="font-semibold">#{transaction.id}</span></p>
                        </div>

                        {/* Customer Information */}
                        <div className="border-t border-b border-dashed border-gray-300 py-4">
                            <h3 className="font-semibold text-lg mb-3">Customer Details</h3>
                            <p><strong>Name:</strong> {transaction.customer_name}</p>
                            {transaction.customer_email && <p><strong>Email:</strong> {transaction.customer_email}</p>}
                        </div>

                        {/* Items List */}
                        <div className="border-b border-dashed border-gray-300 pb-4">
                            <h3 className="font-semibold text-lg mb-3">Items Purchased</h3>
                            <div className="space-y-3">
                                {transaction.items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex-1">
                                            <p className="font-medium">{item.product.name}</p>
                                            {/* Ensure item.price is a number before calling toFixed */}
                                            <p className="text-gray-600">{item.quantity} x ₱{Number(item.price).toFixed(2)}</p>
                                        </div>
                                        {/* Ensure item.price is a number before multiplication */}
                                        <p className="font-semibold">₱{(item.quantity * Number(item.price)).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="space-y-2 py-4">
                            <div className="flex justify-between text-lg">
                                <span>Subtotal:</span>
                                <span className="font-semibold">₱{
                                    transaction.items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0).toFixed(2)
                                }</span>
                            </div>
                            {transaction.discount && (
                                <div className="flex justify-between text-lg text-red-600">
                                    <span>Discount ({transaction.discount.name}):</span>
                                    <span className="font-semibold">-₱{
                                        // Recalculate discount amount based on initial subtotal and discount value/type
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
                                <span>Total Amount:</span>
                                <span>₱{Number(transaction.total_amount).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span>Amount Tendered:</span>
                                <span>₱{Number(transaction.amount_tendered).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-green-700">
                                <span>Change Due:</span>
                                <span>₱{Number(transaction.change_due).toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="border-t border-dashed border-gray-300 pt-4 text-center">
                            <p className="text-sm text-gray-600">Payment Method: <span className="font-semibold">{transaction.payment_method.name}</span></p>
                            <p className="text-sm mt-4">Thank you for shopping with us!</p>
                            <p className="text-xs text-gray-500">A copy of this receipt has been sent to {transaction.customer_email || 'your provided email'}.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}