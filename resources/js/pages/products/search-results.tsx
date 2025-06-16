import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
interface Product {
    id: number;
    name: string;
    selling_price: number;
    stock: number;
    barcode: string;
}

interface Props {
    products: Product[];
    query: string;
}

export default function ProductSearchResults({ products, query }: Props) {
    return (
        <AppLayout>
            <Head title={`Search: ${query}`} />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

                {products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <table className="w-full border">
                        <thead>
                            <tr>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Stock</th>
                                <th className="border p-2">Barcode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="border p-2">{product.name}</td>
                                    <td className="border p-2">{product.selling_price}</td>
                                    <td className="border p-2">{product.stock}</td>
                                    <td className="border p-2">{product.barcode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AppLayout>
    );
}
