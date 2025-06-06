import type { CartItem } from '../types';
import { mockProducts } from './mockProducts';

export const mockCartItems: CartItem[] = [
    {
        product: mockProducts[0],
        quantity: 2,
        size: 'M',
        color: 'Blue',
    },
    {
        product: mockProducts[1],
        quantity: 1,
        size: 'L',
        color: 'Red',
    },
    {
        product: mockProducts[3],
        quantity: 3,
        size: 'M',
        color: 'Green',
    },
];
