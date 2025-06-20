import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types/product';

export default function ProductShow({ product }: { product: Product }) {
    return (
        <AppLayout>
            <Head title={product.name} />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <p className="text-gray-500 mt-1">Product details and information</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Link href={route('products.index')} className="w-full sm:w-auto">
                            <Button variant="outline" className="w-full sm:w-auto gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Products
                            </Button>
                        </Link>
                        <Link href={route('products.edit', product.id)} className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Product
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card className="overflow-hidden">
                    <CardHeader className="border-b bg-gray-50">
                        <CardTitle className="text-xl">Product Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                            {/* Product Image */}
                            <div className="flex flex-col items-center">
                                <div className="relative aspect-square w-full max-w-md bg-gray-100 rounded-lg overflow-hidden">
                                    <img
                                        src={product.image ? `/storage/images/${product.image}` : '/images/placeholder-product.png'}
                                        alt={product.name}
                                        className="w-full h-full object-contain"
                                    />
                                    {product.stock <= 0 && (
                                        <span className="absolute top-4 right-4 bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>
                                {product.barcode && (
                                    <div className="mt-4 text-center">
                                        <p className="text-sm text-gray-500 mb-1">Barcode</p>
                                        <p className="font-mono bg-gray-100 px-3 py-1 rounded-md inline-block">
                                            {product.barcode}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="space-y-6">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Description</h3>
                                        <p className="mt-1 text-gray-900">
                                            {product.description || (
                                                <span className="text-gray-400">No description available</span>
                                            )}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Brand</h3>
                                            <p className="mt-1 text-gray-900">
                                                {product.brand?.name || (
                                                    <span className="text-gray-400">No brand</span>
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Category</h3>
                                            <p className="mt-1 text-gray-900">
                                                {product.category?.name || (
                                                    <span className="text-gray-400">No category</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="border-t border-gray-200 pt-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Pricing</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                            <p className="text-sm font-medium text-blue-600">Buying Price</p>
                                            <p className="text-xl font-semibold text-gray-900">
                                                ₱{Number(product.buying_price).toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="bg-green-50 p-3 rounded-lg">
                                            <p className="text-sm font-medium text-green-600">Selling Price</p>
                                            <p className="text-xl font-semibold text-gray-900">
                                                ₱{Number(product.selling_price).toFixed(2)}
                                            </p>
                                        </div>
                                        {product.sale_price && (
                                            <div className="bg-purple-50 p-3 rounded-lg">
                                                <p className="text-sm font-medium text-purple-600">Sale Price</p>
                                                <p className="text-xl font-semibold text-gray-900">
                                                    ₱{Number(product.sale_price).toFixed(2)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Stock */}
                                <div className="border-t border-gray-200 pt-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Inventory</h3>
                                    <div className={`p-3 rounded-lg ${product.stock <= 5 ? 'bg-red-50' : 'bg-gray-50'
                                        }`}>
                                        <p className="text-sm font-medium text-gray-600">Current Stock</p>
                                        <p className={`text-2xl font-bold ${product.stock <= 5 ? 'text-red-600' : 'text-gray-900'
                                            }`}>
                                            {product.stock} units
                                        </p>
                                        {product.stock <= 5 && (
                                            <p className="text-xs text-red-500 mt-1">
                                                {product.stock === 0 ? 'Out of stock' : 'Low stock alert'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}