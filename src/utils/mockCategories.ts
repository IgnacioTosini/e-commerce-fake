import { mockProducts } from './mockProducts';

// Simulando un array de categorías
export const categories = [
    {
        id: '1',
        name: 'Ropa',
        image: 'https://placehold.co/340',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        products: mockProducts.filter(product => product.categoryName.name === 'Ropa'),
    },
    {
        id: '2',
        name: 'Calzado',
        image: 'https://placehold.co/340',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        products: mockProducts.filter(product => product.categoryName.name === 'Calzado'),
    },
    {
        id: '3',
        name: 'Accesorios',
        image: 'https://placehold.co/340',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        products: mockProducts.filter(product => product.categoryName.name === 'Accesorios'),
    },
    {
        id: '4',
        name: 'Electrónica',
        image: 'https://placehold.co/340',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        products: mockProducts.filter(product => product.categoryName.name === 'Electrónica'),
    },
    {
        id: '5',
        name: 'Hogar',
        image: 'https://placehold.co/340',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        products: mockProducts.filter(product => product.categoryName.name === 'Hogar'),
    },
    {
        id: '6',
        name: 'Juguetes',
        image: 'https://placehold.co/340',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        products: mockProducts.filter(product => product.categoryName.name === 'Juguetes'),
    }
];
