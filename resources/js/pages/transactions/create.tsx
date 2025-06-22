import React, { useState, useEffect } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Product {
    id: number;
    name: string;
    selling_price: number;
    sale_price: number | null;
    stock: number;
    image: string | null;
}

interface Discount {
    id: number;
    name: string;
    type: 'percentage' | 'amount';
    value: number;
}

interface PaymentMethod {
    id: number;
    name: string;
}

interface CartItem {
    product_id: number;
    quantity: number;
    price: number;
    product: Product;
}

export default function TransactionCreate() {
    const page = usePage<{
        products: Product[];
        paymentMethods: PaymentMethod[];
        discounts: Discount[];
        selectedProduct: Product | null;
    }>();

    const { products, paymentMethods, discounts, selectedProduct } = page.props;

    // State
    const [items, setItems] = useState<CartItem[]>([]);
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number | null>(null);
    const [amountTendered, setAmountTendered] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    // Calculations
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = selectedDiscount ? discounts.find(d => d.id === selectedDiscount) : null;
    const discountAmount = discount ?
        (discount.type === 'percentage' ? subtotal * (discount.value / 100) : discount.value) :
        0;
    const totalAmount = subtotal - discountAmount;
    const changeDue = amountTendered - totalAmount;

    // Effects
    useEffect(() => {
        if (selectedProduct && !items.some(item => item.product_id === selectedProduct.id)) {
            addToCart(selectedProduct);
        }
    }, [selectedProduct]);

    // Cart Functions
    const addToCart = (product: Product) => {
        const existingItem = items.find(item => item.product_id === product.id);
        const priceToUse = product.sale_price !== null ? product.sale_price : product.selling_price;

        if (existingItem) {
            updateQuantity(product.id, existingItem.quantity + 1);
        } else {
            setItems([...items, {
                product_id: product.id,
                quantity: 1,
                price: Number(priceToUse),
                product: product
            }]);
        }
    };

    const removeFromCart = (productId: number) => {
        setItems(items.filter(item => item.product_id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity < 1) return;
        setItems(items.map(item =>
            item.product_id === productId ? { ...item, quantity } : item
        ));
    };

    // Form Submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (items.length === 0) {
            alert('Please add at least one product to the transaction.');
            return;
        }

        if (!selectedPaymentMethod) {
            alert('Please select a payment method.');
            return;
        }

        if (amountTendered < totalAmount) {
            alert('Amount tendered must be greater than or equal to the total amount.');
            return;
        }

        const transactionData = {
            items: items.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price
            })),
            customer_name: customerName,
            customer_email: customerEmail,
            discount_id: selectedDiscount,
            payment_method_id: selectedPaymentMethod,
            amount_tendered: amountTendered,
            change_due: changeDue,
            total_amount: totalAmount,
        };

        router.post(route('transactions.store'), transactionData);
    };

    // Product Filtering
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout>
            <Head title="Create Transaction" />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">New Transaction</h1>
                            <p className="text-gray-500 mt-1 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                Process a new sale
                            </p>
                        </div>
                    </div>
                    <Link
                        href={route('transactions.index')}
                        className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Transactions
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Product Selection */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Available Products */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Products
                                </h2>
                                <div className="relative w-64">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {filteredProducts.length === 0 && searchTerm !== '' ? (
                                    <div className="col-span-full text-center text-gray-500 py-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="mt-2">No products found matching "{searchTerm}"</p>
                                    </div>
                                ) : (
                                    filteredProducts.map(product => (
                                        <div
                                            key={product.id}
                                            className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-colors group"
                                            onClick={() => addToCart(product)}
                                        >
                                            <div className="aspect-square bg-white rounded-md mb-2 flex items-center justify-center overflow-hidden">
                                                {product.image ? (
                                                    <img
                                                        src={`/storage/images/${product.image}`}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <svg className="h-10 w-10 text-gray-400 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                )}
                                            </div>
                                            <h3 className="font-medium text-sm truncate">{product.name}</h3>
                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-sm font-semibold text-blue-600">
                                                    ₱{Number(product.sale_price !== null ? product.sale_price : product.selling_price).toFixed(2)}
                                                </p>
                                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                    </svg>
                                                    {product.stock}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Customer Information */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Customer Information
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Customer Name
                                    </label>
                                    <input
                                        type="text"
                                        id="customerName"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Customer Email
                                    </label>
                                    <input
                                        type="email"
                                        id="customerEmail"
                                        value={customerEmail}
                                        onChange={(e) => setCustomerEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        {/* Cart Items */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Order Summary
                            </h2>

                            {items.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <p className="mt-2">Your cart is empty</p>
                                    <p className="text-sm mt-1">Add products from the list</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map(item => (
                                        <div key={item.product_id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                                            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                                                {item.product.image ? (
                                                    <img
                                                        src={`/storage/images/${item.product.image}`}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium">{item.product.name}</h3>
                                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    ₱{item.price.toFixed(2)}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                        className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                        </svg>
                                                    </button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                        className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <p className="font-semibold flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    ₱{(item.price * item.quantity).toFixed(2)}
                                                </p>
                                                <button
                                                    onClick={() => removeFromCart(item.product_id)}
                                                    className="text-red-500 hover:text-red-700 mt-1"
                                                    aria-label={`Remove ${item.product.name} from cart`}
                                                >
                                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Payment Information */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                Payment Information
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                                        </svg>
                                        Discount
                                    </label>
                                    <select
                                        id="discount"
                                        value={selectedDiscount || ''}
                                        onChange={(e) => setSelectedDiscount(e.target.value ? Number(e.target.value) : null)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">No Discount</option>
                                        {discounts.map(discount => (
                                            <option key={discount.id} value={discount.id}>
                                                {discount.name} ({discount.type === 'percentage' ? `${discount.value}%` : `₱${discount.value}`})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        Payment Method
                                    </label>
                                    <select
                                        id="paymentMethod"
                                        value={selectedPaymentMethod || ''}
                                        onChange={(e) => setSelectedPaymentMethod(Number(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select Payment Method</option>
                                        {paymentMethods.map(method => (
                                            <option key={method.id} value={method.id}>{method.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Order Totals */}
                            <div className="mt-6 space-y-3 border-t border-gray-100 pt-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Subtotal
                                    </span>
                                    <span className="font-medium">₱{subtotal.toFixed(2)}</span>
                                </div>
                                {discount && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                                            </svg>
                                            Discount
                                        </span>
                                        <span className="text-red-600">-₱{discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-100">
                                    <span className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Total
                                    </span>
                                    <span>₱{totalAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Amount Tendered */}
                            <div className="mt-6">
                                <label htmlFor="amountTendered" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Amount Tendered
                                </label>
                                <input
                                    type="number"
                                    id="amountTendered"
                                    value={amountTendered === 0 ? '' : amountTendered}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setAmountTendered(value === '' ? 0 : Number(value));
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    min={totalAmount}
                                    step="0.01"
                                    required
                                />
                            </div>

                            {/* Change Due */}
                            {amountTendered > 0 && (
                                <div className="mt-4 flex justify-between font-medium text-lg">
                                    <span className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Change Due
                                    </span>
                                    <span className={changeDue >= 0 ? 'text-green-600' : 'text-red-600'}>
                                        ₱{Math.abs(changeDue).toFixed(2)}
                                    </span>
                                </div>
                            )}

                            {/* Complete Transaction Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={items.length === 0 || !selectedPaymentMethod || amountTendered < totalAmount}
                                className={`w-full mt-6 py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center gap-2 ${items.length === 0 || !selectedPaymentMethod || amountTendered < totalAmount ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg hover:shadow-xl'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Complete Transaction
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}