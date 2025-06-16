import React from 'react';
import { Head, usePage } from '@inertiajs/react';
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
    filters: {
        brand_id?: string;
        category_id?: string;
        supplier_id?: string;
    };
}

export default function FilterResults({ products, filters }: Props) {
    return (
        <AppLayout>
            <Head title="Filtered Products" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Filtered Results</h1>

                <div className="mb-4 text-gray-600 text-sm">
                    <p>Filters applied:</p>
                    <ul className="list-disc ml-4">
                        {filters.brand_id && <li>Brand ID: {filters.brand_id}</li>}
                        {filters.category_id && <li>Category ID: {filters.category_id}</li>}
                        {filters.supplier_id && <li>Supplier ID: {filters.supplier_id}</li>}
                    </ul>
                </div>

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
