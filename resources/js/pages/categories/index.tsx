import React, { useState, useEffect } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Category {
    id: number;
    name: string;
}

export default function CategoryIndex() {
    const page = usePage<{ categories: Category[], flash: { success?: string, error?: string } }>();
    const { categories: allCategories } = page.props;
    const flash = page.props.flash;

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState<Category[]>(allCategories);

    useEffect(() => {
        let filtered = allCategories;
        if (searchTerm) {
            filtered = filtered.filter(category =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredCategories(filtered);
    }, [searchTerm, allCategories]);

    const clearFilters = () => setSearchTerm('');

    const handleTrashCategory = (categoryId: number) => {
        if (confirm('Are you sure you want to trash this category?')) {
            router.delete(route('categories.destroy', categoryId));
        }
    };

    return (
        <AppLayout>
            <Head title="Categories" />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
                            <p className="text-gray-500 mt-1 flex items-center gap-1">
                                Manage your product categories
                            </p>
                        </div>
                    </div>
                    <Link
                        href={route('categories.create')}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Category
                    </Link>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">{flash.success}</p>
                            </div>
                        </div>
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{flash.error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {filteredCategories.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No categories found</h3>
                        <p className="mt-1 text-gray-500">
                            {searchTerm
                                ? 'Try adjusting your search.'
                                : 'Get started by adding a new category.'
                            }
                        </p>
                        {!searchTerm && (
                            <div className="mt-6">
                                <Link
                                    href={route('categories.create')}
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    New Category
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category Name
                                    </th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredCategories.map((category, idx) => (
                                    <tr key={category.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{idx + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 font-medium">{category.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button
                                                onClick={() => handleTrashCategory(category.id)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded text-sm font-medium transition"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}