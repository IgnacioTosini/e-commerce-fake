import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setReviews } from '../store/reviews/reviewsSlice';
import { FirebaseDB } from '../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

// Hook personalizado para escuchar en tiempo real las reviews de un producto
export function useRealtimeReviews(productId: string) {
    const dispatch = useDispatch();

    useEffect(() => {
        // Si no hay productId, no hace nada
        if (!productId) return;

        // Crea una consulta a la colección 'reviews' filtrando por productId
        const q = query(
            collection(FirebaseDB, 'reviews'),
            where('productId', '==', productId)
        );

        // Suscribe a los cambios en la colección usando onSnapshot (escucha en tiempo real)
        const unsubscribe = onSnapshot(q, (snapshot) => {
            // Mapea los documentos recibidos a objetos Review
            const reviews = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    userId: data.userId,
                    productId: data.productId,
                    rating: data.rating,
                    comment: data.comment,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    isVerified: data.isVerified ?? false // por defecto false si no existe
                };
            });
            // Actualiza el estado de Redux con las reviews en tiempo real
            dispatch(setReviews(reviews));
        });

        // Limpia el listener cuando el componente se desmonta o cambia el productId
        return () => unsubscribe();
    }, [dispatch, productId]);
}