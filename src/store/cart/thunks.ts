import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { FirebaseDB } from '../../firebase/config';
import type { Cart, Product } from '../../types';
import type { AppDispatch } from '../store';
import { addToCart as addToCartSlice, clearCart, initializeCart, loadCart, removeFromCart, updateCartItemQuantity } from './cartSlice';

export const loadUserCart = (userId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const cartDocRef = doc(FirebaseDB, 'carts', userId);
            const cartDoc = await getDoc(cartDocRef);

            if (cartDoc.exists()) {
                const cartData = cartDoc.data() as Cart;
                dispatch(loadCart(cartData));
            } else {
                // Si no existe, crear carrito vacío
                dispatch(initializeCart({ userId }));
                await setDoc(cartDocRef, {
                    userId,
                    items: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    };
};

export const startAddToCart = (
    userId: string,
    product: Product,
    quantity: number,
    size: string,
    color: string,
) => {
    return async (dispatch: AppDispatch) => {
        try {
            // 1. Actualizar estado local primero
            dispatch(addToCartSlice({ product, quantity, size, color }));

            // 2. Actualizar en Firebase
            const cartDocRef = doc(FirebaseDB, 'carts', userId);
            const cartDoc = await getDoc(cartDocRef);

            if (cartDoc.exists()) {
                const cartData = cartDoc.data() as Cart;
                // Buscar la variante seleccionada
                const selectedVariant = product.variants.find(v => v.size === size && v.color === color);
                if (!selectedVariant) return;

                const simplifiedProduct = {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    images: product.images,
                    discount: product.discount || 0
                };

                const existingItemIndex = cartData.items.findIndex(item =>
                    item.product.id === product.id &&
                    item.variant && item.variant.size === size &&
                    item.variant.color === color
                );

                let updatedItems;
                if (existingItemIndex >= 0) {
                    updatedItems = [...cartData.items];
                    updatedItems[existingItemIndex].quantity += quantity;
                } else {
                    updatedItems = [
                        ...cartData.items,
                        {
                            product: simplifiedProduct,
                            quantity,
                            variant: {
                                id: selectedVariant.id,
                                size: selectedVariant.size,
                                color: selectedVariant.color,
                                stock: selectedVariant.stock
                            }
                        }
                    ];
                }

                await updateDoc(cartDocRef, {
                    items: updatedItems,
                    updatedAt: new Date().toISOString()
                });
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
};

export const startClearCart = (userId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(clearCart());

            const cartDocRef = doc(FirebaseDB, 'carts', userId);
            await updateDoc(cartDocRef, {
                items: [],
                updatedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };
};

export const startUpdateCartItemQuantity = (
    userId: string,
    productId: string,
    newQuantity: number,
    size: string,
    color: string,
) => {
    return async (dispatch: AppDispatch) => {
        try {
            // 1. Actualizar estado local
            dispatch(updateCartItemQuantity({ productId, newQuantity, size, color }));

            // 2. Actualizar en Firebase
            const cartDocRef = doc(FirebaseDB, 'carts', userId);
            const cartDoc = await getDoc(cartDocRef);

            if (cartDoc.exists()) {
                const cartData = cartDoc.data() as Cart;
                const updatedItems = cartData.items.map(item => {
                    if (
                        item &&
                        item.product &&
                        item.product.id === productId &&
                        item.variant &&
                        item.variant.size === size &&
                        item.variant.color === color
                    ) {
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                });

                await updateDoc(cartDocRef, {
                    items: updatedItems,
                    updatedAt: new Date().toISOString()
                });
            }
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };
};

export const startRemoveFromCart = (
    userId: string,
    productId: string,
    size: string,
    color: string,
) => {
    return async (dispatch: AppDispatch) => {
        try {
            // 1. Actualizar estado local
            dispatch(removeFromCart({ productId, size, color }));

            // 2. Actualizar en Firebase
            const cartDocRef = doc(FirebaseDB, 'carts', userId);
            const cartDoc = await getDoc(cartDocRef);

            if (cartDoc.exists()) {
                const cartData = cartDoc.data() as Cart;
                const updatedItems = cartData.items.filter(item => !(
                    item &&
                    item.product &&
                    item.product.id === productId &&
                    item.variant &&
                    item.variant.size === size &&
                    item.variant.color === color
                ));

                await updateDoc(cartDocRef, {
                    items: updatedItems,
                    updatedAt: new Date().toISOString()
                });
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };
};