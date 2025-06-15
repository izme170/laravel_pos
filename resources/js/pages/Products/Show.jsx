import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Package, DollarSign, ShoppingCart, Barcode } from 'lucide-react';

export default function Show({ products: product }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('products.destroy', product.id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Product: ${product.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={route('products.index')}>
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Back to Products
                                        </Link>
                                    </Button>
                                    <div>
                                        <h2 className="text-2xl font-bold">{product.name}</h2>
                                        <p className="text-gray-600">Product Details</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" asChild>
                                        <Link href={route('products.edit', product.id)}>
                                            <Edit className="w-4 h-4 mr-2" />
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={handleDelete}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Product Image */}
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                            {product.image ? (
                                                <img
                                                    src={`/storage/images/${product.image}`}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            ) : (
                                                <div className="text-center">
                                                    <Package className="w-16 h-16 mx-auto text-gray-400 mb-2" />
                                                    <p className="text-gray-500">No image available</p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Product Details */}
                                <div className="space-y-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Basic Information</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Brand:</span>
                                                <Badge variant="secondary">{product.brand?.name}</Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Category:</span>
                                                <Badge variant="outline">{product.category?.name}</Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Supplier:</span>
                                                <span className="font-medium">{product.supplier?.name}</span>
                                            </div>
                                            {product.barcode && (
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">Barcode:</span>
                                                    <div className="flex items-center gap-2">
                                                        <Barcode className="w-4 h-4" />
                                                        <span className="font-mono">{product.barcode}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Pricing</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Buying Price:</span>
                                                <span className="font-medium">${product.buying_price}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Selling Price:</span>
                                                <span className="font-medium">${product.selling_price}</span>
                                            </div>
                                            {product.sale_price && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Sale Price:</span>
                                                    <span className="font-medium text-red-600">${product.sale_price}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between text-sm text-gray-500 pt-2 border-t">
                                                <span>Profit Margin:</span>
                                                <span>
                                                    ${(parseFloat(product.selling_price) - parseFloat(product.buying_price)).toFixed(2)}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Stock Information</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <ShoppingCart className="w-5 h-5 text-gray-500" />
                                                    <span className="text-gray-600">Current Stock:</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`text-2xl font-bold ${product.stock <= 10 ? 'text-red-600' : 'text-green-600'}`}>
                                                        {product.stock}
                                                    </span>
                                                    <p className="text-sm text-gray-500">units</p>
                                                </div>
                                            </div>
                                            {product.stock <= 10 && (
                                                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                                    <p className="text-red-700 text-sm font-medium">
                                                        ⚠️ Low stock alert! Only {product.stock} units remaining.
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* Description */}
                            {product.description && (
                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle>Description</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <Card>
                                    <CardContent className="flex items-center p-6">
                                        <DollarSign className="w-8 h-8 text-green-600 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-600">Total Value</p>
                                            <p className="text-xl font-bold">
                                                ${(parseFloat(product.selling_price) * product.stock).toFixed(2)}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="flex items-center p-6">
                                        <Package className="w-8 h-8 text-blue-600 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-600">Stock Status</p>
                                            <p className="text-xl font-bold">
                                                {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="flex items-center p-6">
                                        <ShoppingCart className="w-8 h-8 text-purple-600 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-600">Unit Profit</p>
                                            <p className="text-xl font-bold">
                                                ${(parseFloat(product.selling_price) - parseFloat(product.buying_price)).toFixed(2)}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}