import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Product } from '@/types/product';

export default function ProductTrashed({ products }: { products: Product[] }) {
    return (
        <AppLayout>
            <Head title="Trashed Products" />
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Trashed Products</h1>
                    <Link href={route('products.index')}>
                        <Button variant="outline">Back to Products</Button>
                    </Link>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Brand</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Deleted At</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.brand?.name}</TableCell>
                                    <TableCell>{product.category?.name}</TableCell>
                                    <TableCell>{new Date(product.deleted_at).toLocaleString()}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Link
                                            href={route('products.restore', product.id)}
                                            method="post"
                                            as="button"
                                            className="text-sm text-blue-500 hover:text-blue-700"
                                        >
                                            Restore
                                        </Link>
                                        <Link
                                            href={route('products.forceDelete', product.id)}
                                            method="delete"
                                            as="button"
                                            className="text-sm text-red-500 hover:text-red-700"
                                        >
                                            Delete Permanently
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}