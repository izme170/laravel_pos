import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave, FiArrowLeft, FiCheck } from 'react-icons/fi';

interface Props {
    supplier: {
        id: number;
        name: string;
        email: string;
        contact_number: string;
        address?: string;
    };
}

const Edit = ({ supplier }: Props) => {
    const { data, setData, put, processing, errors } = useForm({
        name: supplier.name,
        email: supplier.email,
        contact_number: supplier.contact_number,
        address: supplier.address || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('suppliers.update', supplier.id));
    };

    return (
        <AppLayout>
            <Head title={`Edit ${supplier.name}`} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <Link
                        href={route('suppliers.index')}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
                    >
                        <FiArrowLeft className="mr-2" />
                        Back to Suppliers
                    </Link>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                                <FiUser className="mr-3 text-blue-500" size={24} />
                                Edit Supplier
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Update the supplier information below
                            </p>
                        </div>
                        <div className="bg-blue-50 px-3 py-1.5 rounded-full flex items-center">
                            <span className="text-blue-800 text-sm font-medium">
                                ID: {supplier.id}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                            {/* Name Field */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <FiUser className="mr-2 text-gray-400" />
                                    Supplier Name
                                </label>
                                <div className="relative">
                                    <input
                                        className={`block w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300' : 'border-gray-300'
                                            } focus:ring-blue-500 focus:border-blue-500 transition`}
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter supplier name"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <FiCheck className="mr-1" size={14} />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <FiMail className="mr-2 text-gray-400" />
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        className={`block w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-300' : 'border-gray-300'
                                            } focus:ring-blue-500 focus:border-blue-500 transition`}
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="supplier@example.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <FiCheck className="mr-1" size={14} />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Contact Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <FiPhone className="mr-2 text-gray-400" />
                                    Contact Number
                                </label>
                                <div className="relative">
                                    <input
                                        className={`block w-full px-4 py-3 rounded-lg border ${errors.contact_number ? 'border-red-300' : 'border-gray-300'
                                            } focus:ring-blue-500 focus:border-blue-500 transition`}
                                        value={data.contact_number}
                                        onChange={(e) => setData('contact_number', e.target.value)}
                                        placeholder="+1 (123) 456-7890"
                                    />
                                    {errors.contact_number && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <FiCheck className="mr-1" size={14} />
                                            {errors.contact_number}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Address Field */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <FiMapPin className="mr-2 text-gray-400" />
                                    Physical Address
                                </label>
                                <div className="relative">
                                    <input
                                        className={`block w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-300' : 'border-gray-300'
                                            } focus:ring-blue-500 focus:border-blue-500 transition`}
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="123 Main St, City, Country"
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <FiCheck className="mr-1" size={14} />
                                            {errors.address}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Form Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
                            <div className="flex space-x-3">
                                <Link
                                    href={route('suppliers.index')}
                                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`inline-flex items-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${processing ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                >
                                    <FiSave className="mr-2" />
                                    {processing ? 'Saving Changes...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Edit;