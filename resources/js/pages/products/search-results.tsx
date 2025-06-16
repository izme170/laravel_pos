import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Product } from '@/types/product';

export default function ProductSearchResults({ products, query }: { products: Product[]; query: string }) {
    return (
        <AppLayout>
            <Head title={`Search Results for "${query}"`} />
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        Search Results for <span className="text-blue-500">"{query}"</span>
                    </h1>
                    <Link href={route('products.index')}>
                        <Button variant="outline">Back to Products</Button>
                    </Link>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-8">
                        <p>No products found matching your search.</p>
                    </div>
                ) : (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Brand</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>{product.brand?.name}</TableCell>
                                        <TableCell>{product.category?.name}</TableCell>
                                        <TableCell>${product.selling_price}</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell className="space-x-2">
                                            <Link href={route('products.show', product.id)}>
                                                <Button variant="outline" size="sm">
                                                    View
                                                </Button>
                                            </Link>
                                            <Link href={route('products.edit', product.id)}>
                                                <Button variant="outline" size="sm">
                                                    Edit
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}