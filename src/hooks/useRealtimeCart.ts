import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCart } from '../store/cart/cartSlice';
import { FirebaseDB } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import type { Cart } from '../types';

export function useRealtimeCart(userId: string) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userId) return;
        const cartRef = doc(FirebaseDB, 'carts', userId);
        const unsubscribe = onSnapshot(cartRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data() as Cart;
                dispatch(loadCart(data));
            } else {
                // Si no existe el carrito, lo inicializa vacío
                dispatch(loadCart({
                    userId,
                    items: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }));
            }
        });
        return () => unsubscribe();
    }, [dispatch, userId]);
}
