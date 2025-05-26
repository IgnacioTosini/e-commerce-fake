export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    createdAt: string; // Fecha de creación del usuario
    updatedAt: string; // Fecha de última actualización del usuario
    address?: string;
    phone?: string;
    isActive?: boolean;
}

export interface Category {
    id: string;
    name: string;
    parent?: string;
    image?: string;
    createdAt: string; // Fecha de creación de la categoría
    updatedAt: string; // Fecha de última actualización de la categoría
}

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    categories: string[];         // ids de Category
    stock: number;
    rating: number;
    sku: string; // SKU: identificador único de inventario para el producto
    brand?: string;
    weight?: number;
    dimensions?: { width: number; height: number; depth: number };
    attributes?: Record<string, string | number>;
    discount?: number;
    isActive?: boolean;
    createdAt: string; // Fecha de creación del producto
    updatedAt: string; // Fecha de última actualización del producto
}

export interface CartItem {
    productId: string;
    quantity: number;
}

export interface Cart {
    userId: string;
    items: CartItem[];
    createdAt: string; // Fecha de creación del carrito
    updatedAt: string; // Fecha de última actualización del carrito
}

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'paid' | 'shipped' | 'delivered';
    createdAt: string; // Fecha de creación de la orden
    updatedAt: string; // Fecha de última actualización de la orden
    shippingAddress: string;
    paymentMethod?: string;
    paymentDetails?: string;
    statusHistory?: { status: string; date: string }[];
}

export interface Review {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment: string;
    createdAt: string; // Fecha de creación de la reseña
    updatedAt: string; // Fecha de última actualización de la reseña
    isVerified: boolean; // Indica si la reseña fue hecha por un usuario que realmente compró el producto
}

export type Icon = {
    image: string; // Nombre del icono
    alt: string; // Texto alternativo para el icono
}