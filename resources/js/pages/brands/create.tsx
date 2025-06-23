import React, { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { FiPlusCircle, FiSave, FiTag, FiX } from 'react-icons/fi';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('brands.store'));
    };

    return (
        <AppLayout>
            <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
                <div className="flex items-center space-x-3 mb-6">
                    <FiPlusCircle className="w-6 h-6 text-indigo-600" />
                    <h1 className="text-2xl font-bold text-gray-800">Create Brand</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiTag className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Brand name"
                            />
                        </div>
                        {errors.name && (
                            <div className="flex items-center mt-2 text-sm text-red-600">
                                <FiX className="mr-1" />
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${processing ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white transition-colors`}
                        >
                            <FiSave className="h-5 w-5" />
                            <span>{processing ? 'Saving...' : 'Save'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}