import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Upload } from 'lucide-react';

export default function Create({ brands, categories, suppliers }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        brand_id: '',
        category_id: '',
        supplier_id: '',
        description: '',
        buying_price: '',
        selling_price: '',
        sale_price: '',
        stock: '',
        barcode: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('products.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Product" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex items-center gap-4 mb-6">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={route('products.index')}>
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back
                                    </Link>
                                </Button>
                                <div>
                                    <h2 className="text-2xl font-bold">Add New Product</h2>
                                    <p className="text-gray-600">Create a new product for your inventory</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Basic Information */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Basic Information</CardTitle>
                                            <CardDescription>Enter the basic product details</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <Label htmlFor="name">Product Name *</Label>
                                                <Input
                                                    id="name"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    className={errors.name ? 'border-red-500' : ''}
                                                />
                                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                            </div>

                                            <div>
                                                <Label htmlFor="brand_id">Brand *</Label>
                                                <Select value={data.brand_id} onValueChange={(value) => setData('brand_id', value)}>
                                                    <SelectTrigger className={errors.brand_id ? 'border-red-500' : ''}>
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
                                                {errors.brand_id && <p className="text-red-500 text-sm mt-1">{errors.brand_id}</p>}
                                            </div>

                                            <div>
                                                <Label htmlFor="category_id">Category *</Label>
                                                <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                                                    <SelectTrigger className={errors.category_id ? 'border-red-500' : ''}>
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
                                                {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
                                            </div>

                                            <div>
                                                <Label htmlFor="supplier_id">Supplier *</Label>
                                                <Select value={data.supplier_id} onValueChange={(value) => setData('supplier_id', value)}>
                                                    <SelectTrigger className={errors.supplier_id ? 'border-red-500' : ''}>
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
                                                {errors.supplier_id && <p className="text-red-500 text-sm mt-1">{errors.supplier_id}</p>}
                                            </div>

                                            <div>
                                                <Label htmlFor="description">Description</Label>
                                                <Textarea
                                                    id="description"
                                                    value={data.description}
                                                    onChange={(e) => setData('description', e.target.value)}
                                                    className={errors.description ? 'border-red-500' : ''}
                                                    rows={3}
                                                />
                                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Pricing & Stock */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Pricing & Stock</CardTitle>
                                            <CardDescription>Set prices and stock levels</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <Label htmlFor="buying_price">Buying Price *</Label>
                                                <Input
                                                    id="buying_price"
                                                    type="number"
                                                    step="0.01"
                                                    value={data.buying_price}
                                                    onChange={(e) => setData('buying_price', e.target.value)}
                                                    className={errors.buying_price ? 'border-red-500' : ''}
                                                />
                                                {errors.buying_price && <p className="text-red-500 text-sm mt-1">{errors.buying_price}</p>}
                                            </div>

                                            <div>
                                                <Label htmlFor="selling_price">Selling Price *</Label>
                                                <Input
                                                    id="selling_price"
                                                    type="number"
                                                    step="0.01"
                                                    value={data.selling_price}
                                                    onChange={(e) => setData('selling_price', e.target.value)}
                                                    className={errors.selling_price ? 'border-red-500' : ''}
                                                />
                                                {errors.selling_price && <p className="text-red-500 text-sm mt-1">{errors.selling_price}</p>}
                                            </div>

                                            <div>
                                                <Label htmlFor="sale_price">Sale Price</Label>
                                                <Input
                                                    id="sale_price"
                                                    type="number"
                                                    step="0.01"
                                                    value={data.sale_price}
                                                    onChange={(e) => setData('sale_price', e.target.value)}
                                                    className={errors.sale_price ? 'border-red-500' : ''}
                                                />
                                                {errors.sale_price && <p className="text-red-500 text-sm mt-1">{errors.sale_price}</p>}
                                            </div>

                                            <div>
                                                <Label htmlFor="stock">Stock Quantity *</Label>
                                                <Input
                                                    id="stock"
                                                    type="number"
                                                    value={data.stock}
                                                    onChange={(e) => setData('stock', e.target.value)}
                                                    className={errors.stock ? 'border-red-500' : ''}
                                                />
                                                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                                            </div>

                                            <div>
                                                <Label htmlFor="barcode">Barcode</Label>
                                                <Input
                                                    id="barcode"
                                                    value={data.barcode}
                                                    onChange={(e) => setData('barcode', e.target.value)}
                                                    className={errors.barcode ? 'border-red-500' : ''}
                                                />
                                                {errors.barcode && <p className="text-red-500 text-sm mt-1">{errors.barcode}</p>}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Image Upload */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Product Image</CardTitle>
                                        <CardDescription>Upload a product image (optional)</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1">
                                                <Label htmlFor="image">Image</Label>
                                                <Input
                                                    id="image"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className={errors.image ? 'border-red-500' : ''}
                                                />
                                                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                                            </div>
                                            {imagePreview && (
                                                <div className="w-20 h-20 border rounded-lg overflow-hidden">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="flex justify-end gap-4">
                                    <Button type="button" variant="outline" asChild>
                                        <Link href={route('products.index')}>Cancel</Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        <Save className="w-4 h-4 mr-2" />
                                        {processing ? 'Creating...' : 'Create Product'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}