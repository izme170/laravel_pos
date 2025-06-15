import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, Plus, Search, Filter } from 'lucide-react';

export default function Index({ products }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('products.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-white">
                            {/* Header & Actions */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold">Products</h2>
                                    <p className="text-gray-600 dark:text-gray-400">Manage your product inventory</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" asChild>
                                        <Link href={route('products.search')}>
                                            <Search className="w-4 h-4 mr-1" />
                                            Search
                                        </Link>
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link href="/products/filter">
                                            <Filter className="w-4 h-4 mr-1" />
                                            Filter
                                        </Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href={route('products.create')}>
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add Product
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            {/* No Products */}
                            {products.length === 0 ? (
                                <Card>
                                    <CardContent className="flex flex-col items-center justify-center py-12">
                                        <div className="text-center">
                                            <h3 className="text-lg font-semibold mb-2">No products found</h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                Get started by adding your first product
                                            </p>
                                            <Button asChild>
                                                <Link href={route('products.create')}>
                                                    <Plus className="w-4 h-4 mr-1" />
                                                    Add Product
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <Card key={product.id} className="hover:shadow-lg transition-shadow">
                                            <CardHeader className="pb-3">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <CardTitle className="text-lg">{product.name}</CardTitle>
                                                        <CardDescription>
                                                            {product.brand?.name || 'No brand'}
                                                        </CardDescription>
                                                    </div>
                                                    <Badge variant="secondary">
                                                        {product.category?.name || 'Uncategorized'}
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2 mb-4 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600 dark:text-gray-400">Stock:</span>
                                                        <span className={`font-medium ${product.stock <= 10 ? 'text-red-600' : 'text-green-600'}`}>
                                                            {product.stock}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600 dark:text-gray-400">Price:</span>
                                                        <span className="font-medium">${product.selling_price}</span>
                                                    </div>
                                                    {product.sale_price && (
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600 dark:text-gray-400">Sale Price:</span>
                                                            <span className="font-medium text-red-600">${product.sale_price}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={route('products.show', product.id)}>
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={route('products.edit', product.id)}>
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleDelete(product.id)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
