import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Cart, Product } from "../../types"

export type CartState = {
    cart: Cart,
    loading: boolean,
    error: string | null,
}

const initialState: CartState = {
    cart: {
        userId: '',
        items: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    loading: false,
    error: null,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        initializeCart: (state, action: PayloadAction<{ userId: string }>) => {
            state.cart = {
                userId: action.payload.userId,
                items: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
            state.error = null
        },
        loadCart: (state, action: PayloadAction<Cart>) => {
            state.cart = action.payload
            state.error = null
        },
        addToCart: (state, action: PayloadAction<{ product: Product, quantity: number, size: string, color: string }>) => {
            if (!state.cart) return;

            const { product, quantity, size, color } = action.payload;

            const selectedVariant = product.variants.find(v =>
                v.size === size && v.color === color
            );

            if (!selectedVariant) return; // Protección

            // Seleccionar solo las propiedades necesarias según el tipo CartItem
            const simplifiedProduct = {
                id: product.id,
                title: product.title,
                price: product.price,
                images: product.images,
                discount: product.discount || 0
            };

            const existingItemIndex = state.cart.items.findIndex(item =>
                item.product.id === product.id &&
                item.variant.size === size &&
                item.variant.color === color
            );

            if (existingItemIndex >= 0) {
                state.cart.items[existingItemIndex].quantity += quantity;
            } else {
                state.cart.items.push({
                    product: simplifiedProduct,  // Versión simplificada
                    quantity,
                    variant: {
                        id: `${product.id}-${size}-${color}`,
                        size,
                        color,
                        stock: selectedVariant.stock
                    }
                });
            }

            state.cart.updatedAt = new Date().toISOString();
        },
        clearCart: (state) => {
            if (state.cart) {
                state.cart.items = [];
                state.cart.updatedAt = new Date().toISOString();
            }
        },
        resetCart: (state) => {
            state.cart = {
                userId: '',
                items: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            state.error = null;
        },
        updateCartItemQuantity: (state, action: PayloadAction<{
            productId: string;
            newQuantity: number;
            size: string;
            color: string;
        }>) => {
            const { productId, newQuantity, size, color } = action.payload;
            const itemIndex = state.cart.items.findIndex(item =>
                item.product.id === productId &&
                item.variant.size === size &&
                item.variant.color === color
            );

            if (itemIndex !== -1) {
                state.cart.items[itemIndex].quantity = newQuantity;
                state.cart.updatedAt = new Date().toISOString();
            }
        },

        removeFromCart: (state, action: PayloadAction<{
            productId: string;
            size: string;
            color: string;
        }>) => {
            const { productId, size, color } = action.payload;
            state.cart.items = state.cart.items.filter(item => !(
                item.product.id === productId &&
                item.variant.size === size &&
                item.variant.color === color
            ));
            state.cart.updatedAt = new Date().toISOString();
        }
    },
})

export const { initializeCart, loadCart, addToCart, clearCart, resetCart, updateCartItemQuantity, removeFromCart } = cartSlice.actions