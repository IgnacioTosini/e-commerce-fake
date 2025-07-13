import { collection, addDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { FirebaseDB } from '../../firebase/config';
import type { Order } from '../../types';
import type { AppDispatch } from '../store';
import { setOrders, setLoading, initializeOrders } from './ordersSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createMercadoPagoPreference } from '../../services/mercadoPagoService';

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData: Omit<Order, 'id'> & { userId?: string; userEmail?: string }) => {
        // Si no viene el objeto user, lo armamos con los datos sueltos
        let user = orderData.user;
        if (!user) {
            if (!orderData.userId || !orderData.userEmail) {
                throw new Error('La orden debe incluir el usuario con id y email');
            }
            user = { id: orderData.userId, email: orderData.userEmail };
        }
        const orderDataWithUser = { ...orderData, user };
        const ordersCollection = collection(FirebaseDB, 'orders');
        const docRef = await addDoc(ordersCollection, orderDataWithUser);

        const newOrder: Order = {
            ...orderDataWithUser,
            id: docRef.id
        };

        return newOrder;
    }
);

export const createOrderAndInitiatePayment = createAsyncThunk(
    'orders/createOrderAndInitiatePayment',
    async (payload: {
        orderData: Omit<Order, 'id'> & { userId?: string; userEmail?: string };
        userEmail: string;
        userName: string;
    }) => {
        const { orderData, userEmail, userName } = payload;

        // Si no viene el objeto user, lo armamos con los datos sueltos
        let user = orderData.user;
        if (!user) {
            if (!orderData.userId || !orderData.userEmail) {
                throw new Error('La orden debe incluir el usuario con id y email');
            }
            user = { id: orderData.userId, email: orderData.userEmail };
        }
        const orderDataWithUser = { ...orderData, user };

        // 1. Crear la orden en Firebase
        const ordersCollection = collection(FirebaseDB, 'orders');
        const docRef = await addDoc(ordersCollection, orderDataWithUser);

        const newOrder: Order = {
            ...orderDataWithUser,
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
            // Buscar por el campo anidado 'user.id'
            const q = query(ordersCollection, where('user.id', '==', userId));
            const querySnapshot = await getDocs(q);

            const orders: Order[] = [];
            querySnapshot.forEach((docSnap) => {
                const data = docSnap.data();
                // Si por alguna razón no tiene user, lo ignoramos
                if (data.user && data.user.id) {
                    orders.push({ id: docSnap.id, ...data } as Order);
                }
            });

            dispatch(setOrders(orders));
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };
};