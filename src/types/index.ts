export type User = {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    photoURL?: string; // URL de la imagen de Google/OAuth
    image?: string; // URL de la imagen personalizada subida por el usuario
    createdAt: string; // Fecha de creación del usuario
    updatedAt: string; // Fecha de última actualización del usuario
    address?: string;
    phone?: string;
    isActive?: boolean;
    orders?: Order[];
    favorites?: string[]; // IDs de productos favoritos
}

export type Category = {
    id: string;
    name: string;
    image?: string;
    productsCount?: number; // Cantidad de productos en la categoría
}

export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    categoryName: string; // Nombre de la categoría del producto
    stock: number;
    rating: number;
    sku: string; // SKU: identificador único de inventario para el producto
    brand: string;
    weight?: number;
    discount?: number;
    isActive?: boolean;
    createdAt: string; // Fecha de creación del producto
    updatedAt: string; // Fecha de última actualización del producto
    sizes: string[]; // Arreglo opcional de tallas disponibles para el producto
    colors: string[]; // Arreglo opcional de colores disponibles para el producto
}

export type CartItem = {
    product: Pick<Product, 'id' | 'title' | 'price' | 'images' | 'discount'>; // Información del producto
    quantity: number;
    size: string; // Nuevo campo para el talle elegido
    color: string; // Nuevo campo para el color elegido
}

export type Cart = {
    userId: Pick<User, 'id'>['id']; // ID del usuario al que pertenece el carritoquie
    items: CartItem[];
    createdAt: string; // Fecha de creación del carrito
    updatedAt: string; // Fecha de última actualización del carrito
}

export type OrderItem = {
    productId: Pick<Product, 'id'>['id']; // ID del producto
    title: Pick<Product, 'title'>['title']; // Título del producto
    images?: string[]; // Imágenes del producto
    userId?: Pick<User, 'id'>['id']; // ID del usuario que realizó la compra
    quantity: number;
    price: number;
    size: string; // Nuevo campo para el talle elegido
    color: string; // Nuevo campo para el color elegido
}

export type Order = {
    id: string;
    userId: Pick<User, 'id'>['id']; // ID del usuario que realizó la orden
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

export type Review = {
    id: string;
    userId: Pick<User, 'id'>['id']; // ID del usuario que escribió la reseña
    productId: Pick<Product, 'id'>['id']; // ID del producto reseñado
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

export interface MercadoPagoPreferenceData {
    orderId: string;
    items: {
        id: string;
        title: string;
        description: string;
        quantity: number;
        currency_id: string;
        unit_price: number;
        picture_url?: string;
    }[];
    payer: {
        name: string;
        surname: string;
        email: string;
    };
    back_urls?: {
        success: string;
        failure: string;
        pending: string;
    };
    notification_url?: string;
    external_reference: string;
}