import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Category {
    id: number;
    name: string;
    deleted_at: string;
}

export default function TrashedCategories() {
    const page = usePage<{ categories?: Category[] }>();
    const { categories = [] } = page.props;

    const handleRestore = (id: number) => {
        if (confirm('Restore this category?')) {
            router.put(route('categories.restore', id));
        }
    };

    const handleForceDelete = (id: number) => {
        if (confirm('Permanently delete this category? This cannot be undone.')) {
            router.delete(route('categories.forceDelete', id));
        }
    };

    return (
        <AppLayout>
            <Head title="Trashed Categories" />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Trashed Categories</h1>
                    <Link
                        href={route('categories.index')}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Categories
                    </Link>
                </div>
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deleted At</th>
                                <th className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-gray-500">
                                        No trashed categories found.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category, idx) => (
                                    <tr key={category.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{idx + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 font-medium">{category.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.deleted_at}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right flex gap-2 justify-end">
                                            <button
                                                onClick={() => handleRestore(category.id)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded text-sm font-medium transition"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3-8v18" />
                                                </svg>
                                                Restore
                                            </button>
                                            <button
                                                onClick={() => handleForceDelete(category.id)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded text-sm font-medium transition"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}