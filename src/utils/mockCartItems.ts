import type { Product } from '../types';
import { mockProducts } from './mockProducts';

export const mockCartItems: { product: Product; quantity: number }[] = [
    {
        product: mockProducts[0],
        quantity: 2,
    },
    {
        product: mockProducts[1],
        quantity: 1,
    },
    {
        product: mockProducts[3],
        quantity: 3,
    },
];
