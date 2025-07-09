import { mockProducts } from './mockProducts';

// Simulando un array de categorías
export const categories = [
    {
        id: '1',
        name: 'Ropa',
        image: 'https://placehold.co/340',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        products: mockProducts.filter(product => product.categoryName === 'Ropa'),
    },
    {
        id: '2',
        name: 'Calzado',
        image: 'https://placehold.co/340',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        products: mockProducts.filter(product => product.categoryName === 'Calzado'),
    },
    {
        id: '3',
        name: 'Accesorios',
        image: 'https://placehold.co/340',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        products: mockProducts.filter(product => product.categoryName === 'Accesorios'),
    },
    {
        id: '4',
        name: 'Electrónica',
        image: 'https://placehold.co/340',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        products: mockProducts.filter(product => product.categoryName === 'Electrónica'),
    },
    {
        id: '5',
        name: 'Hogar',
        image: 'https://placehold.co/340',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        products: mockProducts.filter(product => product.categoryName === 'Hogar'),
    },
    {
        id: '6',
        name: 'Juguetes',
        image: 'https://placehold.co/340',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        products: mockProducts.filter(product => product.categoryName === 'Juguetes'),
    }
];
