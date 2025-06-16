import React from 'react';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface SelectOption {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    brand_id: number;
    category_id: number;
    supplier_id: number;
    description: string;
    buying_price: number;
    selling_price: number;
    sale_price: number | null;
    stock: number;
    barcode: string;
    image: string | null;
}

interface PageProps {
    product: Product;
    brands: SelectOption[];
    categories: SelectOption[];
    suppliers: SelectOption[];
}

export default function ProductEdit({ product, brands, categories, suppliers }: PageProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        brand_id: product.brand_id,
        category_id: product.category_id,
        supplier_id: product.supplier_id,
        description: product.description,
        buying_price: product.buying_price,
        selling_price: product.selling_price,
        sale_price: product.sale_price ?? '',
        stock: product.stock,
        barcode: product.barcode ?? '',
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    };

    return (
        <AppLayout>
            <Head title="Edit Product" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                    <div>
                        <label className="block mb-1">Product Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full border p-2 rounded" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label>Brand</label>
                            <select value={data.brand_id} onChange={e => setData('brand_id', Number(e.target.value))} className="w-full border p-2 rounded">
                                <option value="">Select Brand</option>
                                {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                            {errors.brand_id && <p className="text-red-500 text-sm">{errors.brand_id}</p>}
                        </div>

                        <div>
                            <label>Category</label>
                            <select value={data.category_id} onChange={e => setData('category_id', Number(e.target.value))} className="w-full border p-2 rounded">
                                <option value="">Select Category</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
                        </div>

                        <div>
                            <label>Supplier</label>
                            <select value={data.supplier_id} onChange={e => setData('supplier_id', Number(e.target.value))} className="w-full border p-2 rounded">
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
                            <input type="number" value={data.buying_price} onChange={e => setData('buying_price', parseFloat(e.target.value))} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Selling Price</label>
                            <input type="number" value={data.selling_price} onChange={e => setData('selling_price', parseFloat(e.target.value))} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Sale Price</label>
                            <input type="number" value={data.sale_price ?? ''} onChange={e => setData('sale_price', e.target.value)} className="w-full border p-2 rounded" />
                        </div>
                    </div>

                    <div>
                        <label>Stock</label>
                        <input type="number" value={data.stock} onChange={e => setData('stock', parseInt(e.target.value))} className="w-full border p-2 rounded" />
                    </div>

                    <div>
                        <label>Barcode</label>
                        <input type="text" value={data.barcode} onChange={e => setData('barcode', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    <div>
                        <label>Image (optional)</label>
                        <input type="file" onChange={e => setData('image', e.target.files?.[0] ?? null)} className="w-full border p-2 rounded" />
                    </div>

                    <div className="flex items-center gap-4">
                        <button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Update Product
                        </button>
                        <Link href={route('products.index')} className="text-gray-600 underline">Cancel</Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
