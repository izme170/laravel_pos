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
        brand_id: '',
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('brand_id', data.brand_id);
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
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-xl" encType="multipart/form-data">
                    <div>
                        <label className="block mb-1">Product Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full border p-2 rounded" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label>Brand</label>
                            <select value={data.brand_id} onChange={e => setData('brand_id', e.target.value)} className="w-full border p-2 rounded">
                                <option value="">Select Brand</option>
                                {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                            {errors.brand_id && <p className="text-red-500 text-sm">{errors.brand_id}</p>}
                        </div>

                        <div>
                            <label>Category</label>
                            <select value={data.category_id} onChange={e => setData('category_id', e.target.value)} className="w-full border p-2 rounded">
                                <option value="">Select Category</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
                        </div>

                        <div>
                            <label>Supplier</label>
                            <select value={data.supplier_id} onChange={e => setData('supplier_id', e.target.value)} className="w-full border p-2 rounded">
                                <option value="">Select Supplier</option>
                                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                            {errors.supplier_id && <p className="text-red-500 text-sm">{errors.supplier_id}</p>}
                        </div>
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label>Buying Price</label>
                            <input type="number" value={data.buying_price} onChange={e => setData('buying_price', e.target.value)} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Selling Price</label>
                            <input type="number" value={data.selling_price} onChange={e => setData('selling_price', e.target.value)} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Sale Price (Optional)</label>
                            <input type="number" value={data.sale_price} onChange={e => setData('sale_price', e.target.value)} className="w-full border p-2 rounded" />
                        </div>
                    </div>

                    <div>
                        <label>Stock</label>
                        <input type="number" value={data.stock} onChange={e => setData('stock', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    <div>
                        <label>Barcode</label>
                        <input type="text" value={data.barcode} onChange={e => setData('barcode', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    <div>
                        <label>Image</label>
                        <input type="file" onChange={e => setData('image', e.target.files?.[0] ?? null)} className="w-full border p-2 rounded" />
                    </div>

                    <div className="flex items-center gap-4">
                        <button type="submit" disabled={processing} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            Save Product
                        </button>
                        <Link href={route('products.index')} className="text-gray-600 underline">Cancel</Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
