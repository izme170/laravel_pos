import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import moment from 'moment'; // Import moment.js for date formatting

// Define interfaces for type safety
interface User {
    id: number;
    name: string;
    email: string;
}

interface Product {
    id: number;
    name: string;
    // Add other product properties if needed for display
}

interface TransactionItem {
    id: number;
    product_id: number;
    quantity: number;
    price: number;
    product: Product; // Eager loaded product details
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
    total_amount: number; // Expecting this to be a number
    created_at: string; // Date string
    updated_at: string; // Date string
    user: User; // Eager loaded user
    items: TransactionItem[]; // Eager loaded items
    discount: Discount | null; // Eager loaded discount
    payment_method: PaymentMethod; // Eager loaded payment method
}

export default function TransactionIndex() {
    // Access page props from Inertia.js
    const { transactions } = usePage<{ transactions: Transaction[] }>().props;

    return (
        <AppLayout>
            <Head title="Transactions" />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">All Transactions</h1>
                        <p className="text-gray-500 mt-1">View a history of all sales transactions.</p>
                    </div>
                    <Link
                        href={route('transactions.create')}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Transaction
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    {transactions.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="mt-4 text-lg">No transactions recorded yet.</p>
                            <p className="mt-1">Start by creating your first transaction!</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total Amount
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Discount
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Payment Method
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Processed By
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                #{transaction.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {moment(transaction.created_at).format('MMM D,YYYY h:mm A')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {transaction.customer_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                                ₱{Number(transaction.total_amount).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {transaction.discount ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        {transaction.discount.name}
                                                    </span>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {transaction.payment_method.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {transaction.user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={route('transactions.receipt', transaction.id)}
                                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                                >
                                                    View Receipt
                                                </Link>
                                                <Link
                                                    href={route('transactions.show', transaction.id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
