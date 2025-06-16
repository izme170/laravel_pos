import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types/product';

export default function ProductShow({ product }: { product: Product }) {
    return (
        <AppLayout>
            <Head title={product.name} />
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Product Details</h1>
                    <div className="space-x-2">
                        <Link href={route('products.index')}>
                            <Button variant="outline">Back</Button>
                        </Link>
                        <Link href={route('products.edit', product.id)}>
                            <Button>Edit</Button>
                        </Link>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <img
                                src={product.image ? `/storage/images/${product.image}` : '/images/placeholder-product.png'}
                                alt={product.name}
                                className="rounded-md w-full max-w-xs"
                            />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold">Description</h3>
                                <p>{product.description || 'No description available'}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Brand</h3>
                                <p>{product.brand?.name || 'No brand'}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Category</h3>
                                <p>{product.category?.name || 'No category'}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Pricing</h3>
                                <p>Buying Price: ${product.buying_price}</p>
                                <p>Selling Price: ${product.selling_price}</p>
                                {product.sale_price && <p>Sale Price: ${product.sale_price}</p>}
                            </div>
                            <div>
                                <h3 className="font-semibold">Stock</h3>
                                <p>{product.stock} units available</p>
                            </div>
                            {product.barcode && (
                                <div>
                                    <h3 className="font-semibold">Barcode</h3>
                                    <p>{product.barcode}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}