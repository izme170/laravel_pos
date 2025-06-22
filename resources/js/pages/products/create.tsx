import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';

interface SelectOption {
    id: number;
    name: string;
}

interface PageProps {
    brands: SelectOption[];
    categories: SelectOption[];
    suppliers: SelectOption[];
}

export default function ProductCreate({ brands, categories, suppliers }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        brand: '',
        category_id: '',
        supplier_id: '',
        description: '',
        buying_price: '',
        selling_price: '',
        sale_price: '',
        stock: '',
        barcode: '',
        image: null as File | null,
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('image', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('brand', data.brand);
        formData.append('category_id', data.category_id);
        formData.append('supplier_id', data.supplier_id);
        formData.append('description', data.description || '');
        formData.append('buying_price', data.buying_price);
        formData.append('selling_price', data.selling_price);
        formData.append('sale_price', data.sale_price || '');
        formData.append('stock', data.stock);
        formData.append('barcode', data.barcode || '');

        if (data.image) {
            formData.append('image', data.image);
        }

        router.post(route('products.store'), formData, {
            forceFormData: true,
            onError: (errs) => {
                console.error('Validation Errors:', errs);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Add Product" />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
                        <p className="text-gray-500 mt-2">Fill in the details below to create a new product</p>
                    </div>
                    <Link
                        href={route('products.index')}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Products
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Product Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={`w-full px-4 py-3 text-base rounded-lg border ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} shadow-sm`}
                                        placeholder="Enter product name"
                                    />
                                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                {/* Brand, Category, Supplier */}
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                                        
                                        <div className="flex gap-2">
                                            <select
                                                value={data.brand}
                                                onChange={e => setData('brand', e.target.value)}
                                                className="w-1/2 px-4 py-3 text-base rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                            >
                                                <option value="">Select Brand</option>
                                                {brands.map(b => (
                                                    <option key={b.id} value={b.name}>{b.name}</option>
                                                ))}
                                            </select>

                                            <input
                                                type="text"
                                                value={data.brand}
                                                onChange={e => setData('brand', e.target.value)}
                                                placeholder="Or type new brand"
                                                className="w-1/2 px-4 py-3 text-base rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                            />
                                        </div>
                                        {errors.brand && <p className="mt-2 text-sm text-red-600">{errors.brand}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                        <select
                                            value={data.category_id}
                                            onChange={e => setData('category_id', e.target.value)}
                                            className={`w-full px-4 py-3 text-base rounded-lg border ${errors.category_id ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} shadow-sm`}
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                        {errors.category_id && <p className="mt-2 text-sm text-red-600">{errors.category_id}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                                        <select
                                            value={data.supplier_id}
                                            onChange={e => setData('supplier_id', e.target.value)}
                                            className={`w-full px-4 py-3 text-base rounded-lg border ${errors.supplier_id ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} shadow-sm`}
                                        >
                                            <option value="">Select Supplier</option>
                                            {suppliers.map(s => (
                                                <option key={s.id} value={s.id}>{s.name}</option>
                                            ))}
                                        </select>
                                        {errors.supplier_id && <p className="mt-2 text-sm text-red-600">{errors.supplier_id}</p>}
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 text-base rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                        placeholder="Enter product description"
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                                    <div className="mt-1 flex items-center gap-6">
                                        <div className="relative w-40 h-40 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                                            {previewImage ? (
                                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-center p-4">
                                                    <svg className="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="mt-2 text-xs text-gray-500">Upload an image</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <label className="cursor-pointer">
                                                <div className="px-5 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 inline-flex items-center transition-colors">
                                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    Choose File
                                                </div>
                                                <input
                                                    type="file"
                                                    onChange={handleImageChange}
                                                    className="sr-only"
                                                    accept="image/*"
                                                />
                                            </label>
                                            <p className="text-xs text-gray-500 mt-3">PNG, JPG up to 5MB</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700 mb-3">Pricing Information</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-2">Buying Price</label>
                                                <div className="relative rounded-lg shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500">₱</span>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        value={data.buying_price}
                                                        onChange={e => setData('buying_price', e.target.value)}
                                                        className={`block w-full pl-9 pr-4 py-3 rounded-lg border ${errors.buying_price ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} shadow-sm`}
                                                        placeholder="0.00"
                                                        step="0.01"
                                                    />
                                                </div>
                                                {errors.buying_price && <p className="mt-2 text-sm text-red-600">{errors.buying_price}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-2">Selling Price</label>
                                                <div className="relative rounded-lg shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500">₱</span>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        value={data.selling_price}
                                                        onChange={e => setData('selling_price', e.target.value)}
                                                        className={`block w-full pl-9 pr-4 py-3 rounded-lg border ${errors.selling_price ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} shadow-sm`}
                                                        placeholder="0.00"
                                                        step="0.01"
                                                    />
                                                </div>
                                                {errors.selling_price && <p className="mt-2 text-sm text-red-600">{errors.selling_price}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-2">Sale Price</label>
                                                <div className="relative rounded-lg shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500">₱</span>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        value={data.sale_price}
                                                        onChange={e => setData('sale_price', e.target.value)}
                                                        className="block w-full pl-9 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                                        placeholder="0.00"
                                                        step="0.01"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stock & Barcode */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                                            <input
                                                type="number"
                                                value={data.stock}
                                                onChange={e => setData('stock', e.target.value)}
                                                className={`w-full px-4 py-3 rounded-lg border ${errors.stock ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} shadow-sm`}
                                            />
                                            {errors.stock && <p className="mt-2 text-sm text-red-600">{errors.stock}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Barcode</label>
                                            <input
                                                type="text"
                                                value={data.barcode}
                                                onChange={e => setData('barcode', e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                                placeholder="Optional barcode"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
                            <Link
                                href={route('products.index')}
                                className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    'Save Product'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}