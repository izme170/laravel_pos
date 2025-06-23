import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { router, usePage } from '@inertiajs/react';
import { Plus, Trash2, Tag, AlertCircle, CheckCircle2, Building2, Edit } from 'lucide-react'; // Import Edit icon


interface Brand {
    id: number;
    name: string;
}

interface PageProps {
    brands: Brand[];
}

export default function Index({ brands }: PageProps) {
    const { flash } = usePage().props as any;

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this brand?')) {
            router.delete(route('brands.destroy', id));
        }
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-full mx-auto">
                    {/* Header Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Building2 className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Brand Management</h1>
                                    <p className="text-gray-600 mt-1">Manage your brand portfolio</p>
                                </div>
                            </div>
                            <a
                                href={route('brands.create')}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Brand
                            </a>
                        </div>
                    </div>

                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                            <p className="text-green-800 font-medium">{flash.success}</p>
                        </div>
                    )}

                    {flash?.error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                            <p className="text-red-800 font-medium">{flash.error}</p>
                        </div>
                    )}

                    {/* Brands Content */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {brands.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="p-3 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Tag className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No brands yet</h3>
                                <p className="text-gray-600 mb-6">Get started by creating your first brand.</p>
                                <a
                                    href={route('brands.create')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Your First Brand
                                </a>
                            </div>
                        ) : (
                            <>
                                {/* Stats Bar */}
                                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {brands.length} Brand{brands.length !== 1 ? 's' : ''} Total
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Brand
                                                </th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    ID
                                                </th>
                                                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {brands.map((brand) => (
                                                <tr key={brand.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                                <Tag className="h-4 w-4 text-blue-600" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">{brand.name}</p>
                                                                <p className="text-xs text-gray-500">Brand Name</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            #{brand.id}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-right space-x-2">
                                                        {/* Edit Button */}
                                                        <a
                                                            href={route('brands.edit', brand.id)}
                                                            className="inline-flex items-center px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium rounded-lg transition-colors duration-200 border border-indigo-200 hover:border-indigo-300"
                                                        >
                                                            <Edit className="h-4 w-4 mr-1.5" />
                                                            Edit
                                                        </a>

                                                        <button
                                                            onClick={() => handleDelete(brand.id)}
                                                            className="inline-flex items-center px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-sm font-medium rounded-lg transition-colors duration-200 border border-red-200 hover:border-red-300"
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-1.5" />
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </AppLayout>
    );
}
