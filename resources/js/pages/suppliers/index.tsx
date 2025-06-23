import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { FiPlus, FiEdit2, FiTrash2, FiArchive, FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

interface Supplier {
    id: number;
    name: string;
    email: string;
    contact_number: string;
    address?: string;
}

interface Props {
    suppliers: Supplier[];
}

const Index = ({ suppliers }: Props) => {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this supplier?')) {
            destroy(route('suppliers.destroy', id));
        }
    };

    return (
        <AppLayout>
            <Head title="Suppliers" />

            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div className="mb-3 sm:mb-0">
                        <h1 className="text-xl font-semibold text-gray-800 flex items-center">
                            <FiUser className="mr-2 text-blue-600" size={18} />
                            Suppliers
                        </h1>
                    </div>
                    <Link
                        href={route('suppliers.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md flex items-center text-sm"
                    >
                        <FiPlus className="mr-1.5" size={14} /> Add Supplier
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                    <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {suppliers.map((supplier) => (
                                    <tr key={supplier.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-8 w-8 bg-blue-50 rounded-full flex items-center justify-center">
                                                    <FiUser className="text-blue-600" size={14} />
                                                </div>
                                                <div className="ml-3">
                                                    <div className="font-medium text-gray-900">{supplier.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center text-gray-600">
                                                <FiMail className="mr-1.5 text-gray-400" size={14} />
                                                {supplier.email}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center text-gray-600">
                                                <FiPhone className="mr-1.5 text-gray-400" size={14} />
                                                {supplier.contact_number}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center text-gray-600">
                                                <FiMapPin className="mr-1.5 text-gray-400" size={14} />
                                                {supplier.address || '-'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-right">
                                            <div className="flex justify-end space-x-2">
                                                <Link
                                                    href={route('suppliers.edit', supplier.id)}
                                                    className="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50"
                                                    title="Edit"
                                                >
                                                    <FiEdit2 size={14} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(supplier.id)}
                                                    className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50"
                                                    title="Delete"
                                                >
                                                    <FiTrash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {suppliers.length === 0 && (
                    <div className="bg-white rounded-lg border border-gray-100 p-6 text-center mt-4">
                        <div className="text-gray-300 mb-3">
                            <FiUser className="mx-auto" size={24} />
                        </div>
                        <h3 className="text-base font-medium text-gray-700 mb-1">No suppliers found</h3>
                        <p className="text-gray-500 text-sm mb-3">Get started by adding a new supplier</p>
                        <Link
                            href={route('suppliers.create')}
                            className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md"
                        >
                            <FiPlus className="mr-1.5" size={14} /> Add Supplier
                        </Link>
                    </div>
                )}

                <div className="mt-4 text-sm">
                    <Link
                        href={route('suppliers.trashed')}
                        className="inline-flex items-center text-gray-500 hover:text-gray-700 hover:underline"
                    >
                        <FiArchive className="mr-1.5" size={14} /> View Trashed Suppliers
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;