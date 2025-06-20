import type { Order } from "../types";

export const mockOrders: Order[] = [
    {
        id: 'order-001',
        userId: 'user-001',
        items: [
            { productId: '1', quantity: 2, price: 19.99, size: 'M', color: 'Blue' },
            { productId: '2', quantity: 1, price: 39.99, size: 'L', color: 'Red' },
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
            { productId: '1', quantity: 1, price: 19.99, size: 'S', color: 'Black' },
            { productId: '2', quantity: 3, price: 39.99, size: 'M', color: 'Green' },
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
];
