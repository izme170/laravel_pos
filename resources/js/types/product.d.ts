export interface Product {
    id: number;
    name: string;
    description: string | null;
    buying_price: number;
    selling_price: number;
    sale_price: number | null;
    stock: number;
    barcode: string | null;
    image: string | null;
    brand_id: number;
    category_id: number;
    supplier_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    brand?: Brand;
    category?: Category;
    supplier?: Supplier;
}

export interface Brand {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Supplier {
    id: number;
    name: string;
    address: string | null;
    contact_number: string | null;
    email: string | null;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
    image: string | null;
    created_at: string;
    updated_at: string;
    role?: Role;
}

export interface Role {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Transaction {
    id: number;
    user_id: number;
    customer_name: string;
    customer_email: string | null;
    discount_id: number | null;
    payment_method_id: number;
    total: number;
    created_at: string;
    updated_at: string;
    user?: User;
    discount?: Discount;
    payment_method?: PaymentMethod;
}

export interface Discount {
    id: number;
    name: string;
    value: number;
    created_at: string;
    updated_at: string;
}

export interface PaymentMethod {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface BreadcrumbItem {
    title: string;
    url?: string;
}