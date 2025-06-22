import React, { useState, useEffect } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Product {
    id: number;
    name: string;
    buying_price: number;
    selling_price: number;
    sale_price: number | null;
    stock: number;
    barcode: string;
    image: string | null;
    brand_id?: number;
    category_id?: number;
    supplier_id?: number;
}

interface Brand {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
}

interface Supplier {
    id: number;
    name: string;
}

export default function ProductIndex() {
    const page = usePage<{
        products: Product[],
        brands?: Brand[],
        categories?: Category[],
        suppliers?: Supplier[],
        flash: { success?: string, error?: string }
    }>();

    const { products: allProducts, brands = [], categories = [], suppliers = [] } = page.props;
    const flash = page.props.flash;

    // Search and filter state
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [stockFilter, setStockFilter] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

    // Filter products based on search and filter criteria
    useEffect(() => {
        let filtered = allProducts;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.barcode.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Brand filter
        if (selectedBrand) {
            filtered = filtered.filter(product => product.brand_id === parseInt(selectedBrand));
        }

        // Category filter
        if (selectedCategory) {
            filtered = filtered.filter(product => product.category_id === parseInt(selectedCategory));
        }

        // Supplier filter
        if (selectedSupplier) {
            filtered = filtered.filter(product => product.supplier_id === parseInt(selectedSupplier));
        }

        // Stock filter
        if (stockFilter) {
            if (stockFilter === 'in-stock') {
                filtered = filtered.filter(product => product.stock > 0);
            } else if (stockFilter === 'out-of-stock') {
                filtered = filtered.filter(product => product.stock === 0);
            } else if (stockFilter === 'low-stock') {
                filtered = filtered.filter(product => product.stock > 0 && product.stock < 10);
            }
        }

        // Price range filter
        if (priceRange.min || priceRange.max) {
            filtered = filtered.filter(product => {
                const price = product.selling_price;
                const min = priceRange.min ? parseFloat(priceRange.min) : 0;
                const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
                return price >= min && price <= max;
            });
        }

        setFilteredProducts(filtered);
    }, [searchTerm, selectedBrand, selectedCategory, selectedSupplier, stockFilter, priceRange, allProducts]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedBrand('');
        setSelectedCategory('');
        setSelectedSupplier('');
        setStockFilter('');
        setPriceRange({ min: '', max: '' });
    };

    const handleTrashProduct = (productId: number) => {
        if (confirm('Are you sure you want to trash this product?')) {
            router.delete(route('products.destroy', productId));
        }
    };

    return (
        <AppLayout>
            <Head title="Products" />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                        <p className="text-gray-500 mt-1">Manage your inventory</p>
                    </div>
                    <Link
                        href={route('products.create')}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Product
                    </Link>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search products by name or barcode..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Filter Dropdowns */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:w-auto">
                            {/* Brand Filter */}
                            <select
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            >
                                <option value="">All Brands</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>

                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            {/* Supplier Filter */}
                            <select
                                value={selectedSupplier}
                                onChange={(e) => setSelectedSupplier(e.target.value)}
                                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            >
                                <option value="">All Suppliers</option>
                                {suppliers.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>

                            {/* Stock Filter */}
                            <select
                                value={stockFilter}
                                onChange={(e) => setStockFilter(e.target.value)}
                                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            >
                                <option value="">All Stock</option>
                                <option value="in-stock">In Stock</option>
                                <option value="out-of-stock">Out of Stock</option>
                                <option value="low-stock">Low Stock (&lt;10)</option>
                            </select>
                        </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Price Range:</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                    className="w-20 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <span className="text-gray-500">-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                    className="w-20 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Clear Filters & Results Count */}
                        <div className="flex items-center gap-4 sm:ml-auto">
                            <span className="text-sm text-gray-500">
                                {filteredProducts.length} of {allProducts.length} products
                            </span>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">{flash.success}</p>
                            </div>
                        </div>
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{flash.error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                        <p className="mt-1 text-gray-500">
                            {searchTerm || selectedBrand || selectedCategory || selectedSupplier || stockFilter || priceRange.min || priceRange.max
                                ? 'Try adjusting your search or filter criteria.'
                                : 'Get started by adding a new product.'
                            }
                        </p>
                        {!(searchTerm || selectedBrand || selectedCategory || selectedSupplier || stockFilter || priceRange.min || priceRange.max) && (
                            <div className="mt-6">
                                <Link
                                    href={route('products.create')}
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    New Product
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                            >
                                <div className="relative aspect-square bg-gray-50">
                                    {product.image ? (
                                        <img
                                            src={`/storage/images/${product.image}`}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    {product.stock === 0 && (
                                        <span className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            Out of stock
                                        </span>
                                    )}
                                </div>

                                <div className="p-4">
                                    <div className="flex justify-between items-start gap-2">
                                        <h2 className="font-semibold text-gray-900 truncate">{product.name}</h2>
                                        <span className="text-xs text-gray-500">#{product.barcode}</span>
                                    </div>

                                    <div className="mt-3 space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Buying Price</span>
                                            <span className="font-medium">₱{Number(product.buying_price).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Selling Price</span>
                                            <span className="font-medium">₱{Number(product.selling_price).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Sale Price</span>
                                            <span className="font-medium">
                                                {product.sale_price !== null ? `₱${Number(product.sale_price).toFixed(2)}` : '—'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Stock</span>
                                            <span className={`font-medium ${product.stock < 5 ? 'text-red-600' : 'text-gray-900'}`}>
                                                {product.stock} units
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('products.edit', product.id)}
                                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={route('products.show', product.id)}
                                                className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                                            >
                                                View
                                            </Link>
                                        </div>

                                        <div className="flex gap-1">
                                            <Link
                                                href={route('transactions.create', { product_id: product.id })}
                                                className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                                                title="Checkout"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </Link>
                                            <button
                                                onClick={() => handleTrashProduct(product.id)}
                                                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                                title="Move to Trash"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}