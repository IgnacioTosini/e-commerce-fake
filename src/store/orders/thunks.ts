import { collection, addDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { FirebaseDB } from '../../firebase/config';
import type { Order } from '../../types';
import type { AppDispatch } from '../store';
import { setOrders, setLoading, initializeOrders } from './ordersSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createMercadoPagoPreference } from '../../services/mercadoPagoService';

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData: Omit<Order, 'id'>) => {
        const ordersCollection = collection(FirebaseDB, 'orders');
        const docRef = await addDoc(ordersCollection, orderData);

        const newOrder: Order = {
            ...orderData,
            id: docRef.id
        };

        return newOrder;
    }
);

export const createOrderAndInitiatePayment = createAsyncThunk(
    'orders/createOrderAndInitiatePayment',
    async (payload: {
        orderData: Omit<Order, 'id'>;
        userEmail: string;
        userName: string;
    }) => {
        const { orderData, userEmail, userName } = payload;

        // 1. Crear la orden en Firebase
        const ordersCollection = collection(FirebaseDB, 'orders');
        const docRef = await addDoc(ordersCollection, orderData);

        const newOrder: Order = {
            ...orderData,
            id: docRef.id
        };

        // 2. Crear preferencia de MercadoPago
        const checkoutUrl = await createMercadoPagoPreference(
            newOrder,
            userEmail,
            userName
        );

        return {
            order: newOrder,
            checkoutUrl
        };
    }
);

export const updateOrderStatus = createAsyncThunk(
    'orders/updateOrderStatus',
    async (payload: {
        orderId: string;
        status: Order['status'];
        paymentDetails?: string;
    }) => {
        const { orderId, status, paymentDetails } = payload;

        const orderRef = doc(FirebaseDB, 'orders', orderId);
        const updateData: Partial<Order> = {
            status,
            updatedAt: new Date().toISOString(),
            ...(paymentDetails && { paymentDetails })
        };

        await updateDoc(orderRef, updateData);

        return { orderId, ...updateData };
    }
);

export const loadUserOrders = (userId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            dispatch(initializeOrders({ userId }));

            const ordersCollection = collection(FirebaseDB, 'orders');
            const q = query(ordersCollection, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);

            const orders: Order[] = [];
            querySnapshot.forEach((doc) => {
                orders.push({ id: doc.id, ...doc.data() } as Order);
            });

            dispatch(setOrders(orders));
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };
};