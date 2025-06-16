import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Product {
    id: number;
    name: string;
    buying_price: number;
    selling_price: number;
    sale_price: number | null;
    stock: number;
    barcode: string;
    image: string | null;
}

export default function ProductIndex() {
    const page = usePage<{ products: Product[] }>();
    const products = page.props.products;

    return (
        <AppLayout>
            <Head title="Products" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <Link href={route('products.create')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        + Add Product
                    </Link>
                </div>

                {products.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">No products found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                            >
                                {product.image ? (
                                    <img
                                        src={`/storage/images/${product.image}`}
                                        alt={product.name}
                                        className="w-full h-32 object-cover rounded mb-3"
                                    />
                                ) : (
                                    <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-sm text-gray-400 rounded mb-3">
                                        No Image
                                    </div>
                                )}

                                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                                <p className="text-xs text-gray-500 mb-2">Barcode: {product.barcode}</p>

                                <div className="text-sm text-gray-700 space-y-1">
                                    <p><strong>Buying:</strong> ₱{Number(product.buying_price).toFixed(2)}</p>
                                    <p><strong>Selling:</strong> ₱{Number(product.selling_price).toFixed(2)}</p>
                                    <p><strong>Sale:</strong> {product.sale_price !== null ? `₱${Number(product.sale_price).toFixed(2)}` : '—'}</p>
                                    <p><strong>Stock:</strong> {product.stock}</p>
                                </div>

                                <div className="mt-4 flex justify-between text-sm text-blue-600">
                                    <Link href={route('products.edit', product.id)} className="hover:underline">Edit</Link>
                                    <Link href={route('products.show', product.id)} className="text-gray-600 hover:underline">View</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
