// Archivo de productos de prueba para desarrollo
import type { Product } from '../types';
import { categories } from './mockCategories';

export const mockProducts: Product[] = [
    {
        id: '1',
        title: 'Remera básica',
        description: 'Remera de algodón 100% orgánico',
        price: 19.99,
        images: ['https://placehold.co/300x300'],
        categories: [categories[0]], // Referencia directa a la categoría "Ropa"
        stock: 10,
        rating: 4.5,
        sku: 'SKU-001',
        brand: 'Marca X',
        createdAt: '2025-05-24T00:00:00Z',
        updatedAt: '2025-05-24T00:00:00Z',
        sizes: ['S', 'M', 'L'],
        colors: ['Rojo', 'Azul', 'Negro'],
    },
    {
        id: '2',
        title: 'Zapatillas urbanas',
        description: 'Zapatillas cómodas para todos los días',
        price: 49.99,
        images: ['https://placehold.co/300x300'],
        categories: [categories[1]], // Referencia directa a la categoría "Calzado"
        stock: 5,
        rating: 4.7,
        sku: 'SKU-002',
        brand: 'Marca Y',
        createdAt: '2025-05-24T00:00:00Z',
        updatedAt: '2025-05-24T00:00:00Z',
        sizes: ['40', '41', '42'],
        colors: ['Blanco', 'Gris'],
    },
    {
        id: '3',
        title: 'Pantalón jogger',
        description: 'Pantalón jogger de tela suave y elástica',
        price: 29.99,
        images: ['https://placehold.co/300x300'],
        categories: [categories[0]], // Referencia directa a la categoría "Ropa"
        stock: 8,
        rating: 4.3,
        sku: 'SKU-003',
        brand: 'Marca Z',
        createdAt: '2025-05-24T00:00:00Z',
        updatedAt: '2025-05-24T00:00:00Z',
        sizes: ['M', 'L', 'XL'],
        colors: ['Verde', 'Negro'],
    },
    {
        id: '4',
        title: 'Campera impermeable',
        description: 'Campera resistente al agua para días lluviosos',
        price: 59.99,
        images: ['https://placehold.co/300x300', 'https://placehold.co/300x350'],
        categories: [categories[0], categories[2]], // Referencia directa a las categorías "Ropa" y "Accesorios"
        stock: 3,
        rating: 4.8,
        sku: 'SKU-004',
        brand: 'Marca W',
        createdAt: '2025-05-24T00:00:00Z',
        updatedAt: '2025-05-24T00:00:00Z',
        discount: 10,
        sizes: ['M', 'L'],
        colors: ['Amarillo', 'Azul'],
    },
    {
        id: '5',
        title: 'Gorra de béisbol',
        description: 'Gorra de béisbol ajustable con diseño moderno',
        price: 15.99,
        images: ['https://placehold.co/300x300'],
        categories: [categories[2]], // Referencia directa a la categoría "Accesorios"
        stock: 12,
        rating: 4.2,
        sku: 'SKU-005',
        brand: 'Marca V',
        createdAt: '2025-05-24T00:00:00Z',
        updatedAt: '2025-05-24T00:00:00Z',
        sizes: ['Único'],
        colors: ['Negro', 'Blanco'],
    },
    {
        id: '6',
        title: 'Reloj inteligente',
        description: 'Reloj inteligente con seguimiento de actividad',
        price: 199.99,
        images: ['https://placehold.co/300x300'],
        categories: [categories[3]], // Referencia directa a la categoría "Electrónica"
        stock: 7,
        rating: 4.6,
        sku: 'SKU-006',
        brand: 'Marca U',
        createdAt: '2025-05-24T00:00:00Z',
        updatedAt: '2025-05-24T00:00:00Z',
        sizes: ['Único'],
        colors: ['Negro', 'Plata'],
    }
];

// Asociar productos con categorías después de la inicialización
categories.forEach(category => {
    category.products = mockProducts.filter(product =>
        product.categories.some(cat => cat.id === category.id)
    );
});
