import type { Order } from "../types";
import { mockProducts } from "./mockProducts";

export const mockOrders: Order[] = [
    {
        id: 'order-001',
        userId: 'user-001',
        items: [
            { productId: mockProducts[0].id, quantity: 2, price: mockProducts[0].price, size: 'M', color: 'Blue' },
            { productId: mockProducts[1].id, quantity: 1, price: mockProducts[1].price, size: 'L', color: 'Red' },
        ],
        total: 200,
        status: 'pending',
        createdAt: '2025-06-01T10:00:00Z',
        updatedAt: '2025-06-01T10:00:00Z',
        shippingAddress: '123 Main St, Cityville',
        paymentMethod: 'Credit Card',
        paymentDetails: '**** **** **** 1234',
        statusHistory: [
            { status: 'pending', date: '2025-06-01T10:00:00Z' },
        ],
    },
    {
        id: 'order-002',
        userId: 'user-002',
        items: [
            { productId: mockProducts[2].id, quantity: 1, price: mockProducts[2].price, size: 'S', color: 'Black' },
            { productId: mockProducts[3].id, quantity: 3, price: mockProducts[3].price, size: 'M', color: 'Green' },
        ],
        total: 150,
        status: 'shipped',
        createdAt: '2025-05-28T14:30:00Z',
        updatedAt: '2025-05-30T09:00:00Z',
        shippingAddress: '456 Elm St, Townsville',
        paymentMethod: 'PayPal',
        paymentDetails: 'user@example.com',
        statusHistory: [
            { status: 'pending', date: '2025-05-28T14:30:00Z' },
            { status: 'paid', date: '2025-05-29T08:00:00Z' },
            { status: 'shipped', date: '2025-05-30T09:00:00Z' },
        ],
    },
    {
        id: 'order-003',
        userId: 'user-003',
        items: [
            { productId: mockProducts[4].id, quantity: 5, price: mockProducts[4].price, size: 'XL', color: 'White' },
        ],
        total: 100,
        status: 'delivered',
        createdAt: '2025-05-20T08:15:00Z',
        updatedAt: '2025-05-25T16:45:00Z',
        shippingAddress: '789 Oak St, Villagetown',
        paymentMethod: 'Debit Card',
        paymentDetails: '**** **** **** 5678',
        statusHistory: [
            { status: 'pending', date: '2025-05-20T08:15:00Z' },
            { status: 'paid', date: '2025-05-21T10:00:00Z' },
            { status: 'shipped', date: '2025-05-23T12:30:00Z' },
            { status: 'delivered', date: '2025-05-25T16:45:00Z' },
        ],
    },
];
