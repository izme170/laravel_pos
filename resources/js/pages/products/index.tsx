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
}

export default function ProductIndex() {
    const page = usePage<{ products: Product[] }>();
    const products = page.props.products;

    return (
        <AppLayout>
            <Head title="Products" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <Link href={route('products.create')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        + Add Product
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Buying</th>
                                <th className="px-4 py-2 border">Selling</th>
                                <th className="px-4 py-2 border">Sale</th>
                                <th className="px-4 py-2 border">Stock</th>
                                <th className="px-4 py-2 border">Barcode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-4 py-2 border">{product.name}</td>
                                    <td className="px-4 py-2 border">{product.buying_price}</td>
                                    <td className="px-4 py-2 border">{product.selling_price}</td>
                                    <td className="px-4 py-2 border">{product.sale_price || '-'}</td>
                                    <td className="px-4 py-2 border">{product.stock}</td>
                                    <td className="px-4 py-2 border">{product.barcode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
