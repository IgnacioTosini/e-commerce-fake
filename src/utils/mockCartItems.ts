import type { CartItem } from '../types';

export const mockCartItems: CartItem[] = [
    {
        product: {
            id: '1',
            title: 'Remera básica',
            description: 'Remera de algodón 100% orgánico',
            price: 19.99,
            images: ['https://placehold.co/300x300'],
            categoryName: { name: 'Ropa' },
            stock: 10,
            rating: 4.5,
            sku: 'SKU-001',
            createdAt: '2025-05-24T00:00:00Z',
            updatedAt: '2025-05-24T00:00:00Z',
        },
        quantity: 2,
        size: 'M',
        color: 'Blue',
    },
    {
        product: {
            id: '2',
            title: 'Pantalón de mezclilla',
            description: 'Pantalón cómodo y resistente',
            price: 39.99,
            images: ['https://placehold.co/300x300'],
            categoryName: { name: 'Ropa' },
            stock: 20,
            rating: 4.7,
            sku: 'SKU-002',
            createdAt: '2025-05-24T00:00:00Z',
            updatedAt: '2025-05-24T00:00:00Z',
        },
        quantity: 1,
        size: 'L',
        color: 'Red',
    },
];
