import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Product {
    id: number;
    name: string;
    selling_price: number;
    stock: number;
    barcode: string;
    deleted_at: string;
}

export default function TrashedProducts() {
    const { products } = usePage().props as unknown as { products: Product[] };

    return (
        <AppLayout>
            <Head title="Trashed Products" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Trashed Products</h1>
                <table className="w-full border">
                    <thead>
                        <tr>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Stock</th>
                            <th className="border p-2">Barcode</th>
                            <th className="border p-2">Deleted At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="border p-2">{product.name}</td>
                                <td className="border p-2">{product.selling_price}</td>
                                <td className="border p-2">{product.stock}</td>
                                <td className="border p-2">{product.barcode}</td>
                                <td className="border p-2">{new Date(product.deleted_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
