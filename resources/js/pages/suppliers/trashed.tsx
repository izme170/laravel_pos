import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Supplier {
    id: number;
    name: string;
    email: string;
    contact_number: string;
    address?: string;
    deleted_at: string;
}

interface Props {
    trashedSuppliers: Supplier[];
}

const Trash = ({ trashedSuppliers }: Props) => {
    const { post } = useForm();

    const handleRestore = (id: number) => {
        if (confirm('Restore this supplier?')) {
            post(route('suppliers.restore', id));
        }
    };

    return (
        <AppLayout>
            <Head title="Trashed Suppliers" />

            <h1 className="text-2xl font-bold mb-4">Trashed Suppliers</h1>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Contact</th>
                        <th className="p-2">Deleted At</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trashedSuppliers.map((supplier) => (
                        <tr key={supplier.id} className="border-t">
                            <td className="p-2">{supplier.name}</td>
                            <td className="p-2">{supplier.email}</td>
                            <td className="p-2">{supplier.contact_number}</td>
                            <td className="p-2">{new Date(supplier.deleted_at).toLocaleString()}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => handleRestore(supplier.id)}
                                    className="text-green-500 hover:underline"
                                >
                                    Restore
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Link
                href={route('suppliers.index')}
                className="text-sm mt-4 inline-block text-gray-600 hover:underline"
            >
                Back to Supplier List
            </Link>
        </AppLayout>
    );
};

export default Trash;
