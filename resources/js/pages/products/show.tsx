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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                            <p className="text-gray-500 mt-1 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Product details and information
                            </p>
                        </div>
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

                <Card className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
                    <CardHeader className="border-b bg-gray-50 p-6">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <CardTitle className="text-xl">Product Information</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                            {/* Product Image */}
                            <div className="flex flex-col items-center">
                                <div className="relative aspect-square w-full max-w-md bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                    <img
                                        src={product.image ? `/storage/images/${product.image}` : '/images/placeholder-product.png'}
                                        alt={product.name}
                                        className="w-full h-full object-contain"
                                    />
                                    {product.stock <= 0 && (
                                        <span className="absolute top-4 right-4 bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            Out of Stock
                                        </span>
                                    )}
                                </div>
                                {product.barcode && (
                                    <div className="mt-4 text-center">
                                        <p className="text-sm text-gray-500 mb-1 flex items-center justify-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            Barcode
                                        </p>
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
                                        <h3 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Description
                                        </h3>
                                        <p className="mt-1 text-gray-900 pl-5">
                                            {product.description || (
                                                <span className="text-gray-400">No description available</span>
                                            )}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                Brand
                                            </h3>
                                            <p className="mt-1 text-gray-900 pl-5">
                                                {product.brand?.name || (
                                                    <span className="text-gray-400">No brand</span>
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                                </svg>
                                                Category
                                            </h3>
                                            <p className="mt-1 text-gray-900 pl-5">
                                                {product.category?.name || (
                                                    <span className="text-gray-400">No category</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="border-t border-gray-200 pt-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Pricing
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                            <p className="text-sm font-medium text-blue-600 flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Buying Price
                                            </p>
                                            <p className="text-xl font-semibold text-gray-900">
                                                ₱{Number(product.buying_price).toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                            <p className="text-sm font-medium text-green-600 flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Selling Price
                                            </p>
                                            <p className="text-xl font-semibold text-gray-900">
                                                ₱{Number(product.selling_price).toFixed(2)}
                                            </p>
                                        </div>
                                        {product.sale_price && (
                                            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                                                <p className="text-sm font-medium text-purple-600 flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                                                    </svg>
                                                    Sale Price
                                                </p>
                                                <p className="text-xl font-semibold text-gray-900">
                                                    ₱{Number(product.sale_price).toFixed(2)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Stock */}
                                <div className="border-t border-gray-200 pt-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                        Inventory
                                    </h3>
                                    <div className={`p-3 rounded-lg border ${product.stock <= 5 ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                                        <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            Current Stock
                                        </p>
                                        <p className={`text-2xl font-bold ${product.stock <= 5 ? 'text-red-600' : 'text-gray-900'}`}>
                                            {product.stock} units
                                        </p>
                                        {product.stock <= 5 && (
                                            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
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