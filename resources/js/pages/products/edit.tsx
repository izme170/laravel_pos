import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from 'node_modules/@headlessui/react/dist/components/textarea/textarea';


export default function ProductEdit({ product, brands, categories, suppliers }: { product: any; brands: any[]; categories: any[]; suppliers: any[] }) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        brand_id: product.brand_id,
        category_id: product.category_id,
        supplier_id: product.supplier_id,
        description: product.description,
        buying_price: product.buying_price,
        selling_price: product.selling_price,
        sale_price: product.sale_price,
        stock: product.stock,
        barcode: product.barcode,
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    };

    return (
        <AppLayout>
            <Head title={`Edit ${product.name}`} />
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Edit Product</h1>
                    <Link href={route('products.index')}>
                        <Button variant="outline">Cancel</Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter product name"
                                required
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="brand_id">Brand</Label>
                            <Select value={data.brand_id} onValueChange={(value) => setData('brand_id', value)} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    {brands.map((brand) => (
                                        <SelectItem key={brand.id} value={brand.id.toString()}>
                                            {brand.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.brand_id && <p className="text-sm text-red-500">{errors.brand_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category_id">Category</Label>
                            <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id && <p className="text-sm text-red-500">{errors.category_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="supplier_id">Supplier</Label>
                            <Select value={data.supplier_id} onValueChange={(value) => setData('supplier_id', value)} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a supplier" />
                                </SelectTrigger>
                                <SelectContent>
                                    {suppliers.map((supplier) => (
                                        <SelectItem key={supplier.id} value={supplier.id.toString()}>
                                            {supplier.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.supplier_id && <p className="text-sm text-red-500">{errors.supplier_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="buying_price">Buying Price</Label>
                            <Input
                                id="buying_price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.buying_price}
                                onChange={(e) => setData('buying_price', e.target.value)}
                                placeholder="0.00"
                                required
                            />
                            {errors.buying_price && <p className="text-sm text-red-500">{errors.buying_price}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="selling_price">Selling Price</Label>
                            <Input
                                id="selling_price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.selling_price}
                                onChange={(e) => setData('selling_price', e.target.value)}
                                placeholder="0.00"
                                required
                            />
                            {errors.selling_price && <p className="text-sm text-red-500">{errors.selling_price}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sale_price">Sale Price (optional)</Label>
                            <Input
                                id="sale_price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.sale_price}
                                onChange={(e) => setData('sale_price', e.target.value)}
                                placeholder="0.00"
                            />
                            {errors.sale_price && <p className="text-sm text-red-500">{errors.sale_price}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                                id="stock"
                                type="number"
                                min="0"
                                value={data.stock}
                                onChange={(e) => setData('stock', e.target.value)}
                                placeholder="0"
                                required
                            />
                            {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="barcode">Barcode (optional)</Label>
                            <Input
                                id="barcode"
                                value={data.barcode}
                                onChange={(e) => setData('barcode', e.target.value)}
                                placeholder="Enter barcode"
                            />
                            {errors.barcode && <p className="text-sm text-red-500">{errors.barcode}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Product Image (optional)</Label>
                            <Input
                                id="image"
                                type="file"
                                onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                accept="image/*"
                            />
                            {product.image && (
                                <div className="mt-2">
                                    <img
                                        src={`/storage/images/${product.image}`}
                                        alt={product.name}
                                        className="h-20 w-20 object-cover rounded"
                                    />
                                </div>
                            )}
                            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="description">Description (optional)</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Enter product description"
                                rows={4}
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Link href={route('products.show', product.id)}>
                            <Button variant="outline">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}