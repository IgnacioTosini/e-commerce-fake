import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Order } from '../../types'
import { createOrder, createOrderAndInitiatePayment, updateOrderStatus } from './thunks'

export type OrdersState = {
    orders: Order[],
    currentOrder: Order | null,
    loading: boolean,
    error: string | null,
    userId: string,
    checkoutUrl: string | null, // Para almacenar la URL de MercadoPago
}

const initialState: OrdersState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    userId: '',
    checkoutUrl: null,
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        initializeOrders: (state, action: PayloadAction<{ userId: string }>) => {
            state.userId = action.payload.userId
            state.orders = []
            state.error = null
            state.loading = false
        },
        setOrders: (state, action: PayloadAction<Order[]>) => {
            if (state.userId) {
                state.orders = action.payload.filter(order => order.user.id === state.userId)
            }
            state.error = null
        },
        addOrder: (state, action: PayloadAction<Order>) => {
            if (state.userId && action.payload.user.id === state.userId) {
                state.orders.unshift(action.payload)
            }
            state.error = null
        },
        updateOrder: (state, action: PayloadAction<Order>) => {
            if (state.userId && action.payload.user.id === state.userId) {
                const index = state.orders.findIndex(order => order.id === action.payload.id)
                if (index >= 0) {
                    state.orders[index] = action.payload
                }
            }
        },
        resetOrders: (state) => {
            state.orders = []
            state.currentOrder = null
            state.error = null
            state.userId = ''
            state.checkoutUrl = null
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
            state.currentOrder = action.payload
        },
        clearCheckoutUrl: (state) => {
            state.checkoutUrl = null
        },
    },
    extraReducers: (builder) => {
        builder
            // createOrder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                if (state.userId && action.payload.user.id === state.userId) {
                    state.orders.unshift(action.payload);
                }
                state.error = null;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error al crear la orden';
            })
            // createOrderAndInitiatePayment
            .addCase(createOrderAndInitiatePayment.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrderAndInitiatePayment.fulfilled, (state, action) => {
                state.loading = false;
                if (state.userId && action.payload.order.user.id === state.userId) {
                    state.orders.unshift(action.payload.order);
                }
                state.checkoutUrl = action.payload.checkoutUrl;
                state.error = null;
            })
            .addCase(createOrderAndInitiatePayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error al procesar el pago';
            })
            // updateOrderStatus
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const { orderId, status, paymentDetails } = action.payload;
                const order = state.orders.find(o => o.id === orderId);
                if (order && status !== undefined) {
                    order.status = status;
                    order.updatedAt = new Date().toISOString();
                    if (paymentDetails) {
                        order.paymentDetails = paymentDetails;
                    }
                }
            });
    }
})

export const {
    initializeOrders,
    setOrders,
    addOrder,
    updateOrder,
    resetOrders,
    setLoading,
    setCurrentOrder,
    clearCheckoutUrl
} = ordersSlice.actions