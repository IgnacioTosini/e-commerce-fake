const getApiBaseUrl = () => {
    return import.meta.env.PROD
        ? import.meta.env.VITE_API_URL_PROD
        : import.meta.env.VITE_API_URL;
};
import type { RootState } from './../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch } from '../store';
import type { Review } from '../../types';
import { setError, setLoading, setReviews } from './reviewsSlice';
import { FirebaseDB } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

// Thunk para actualizar solo el rating del producto en Firestore
export const updateProductRating = createAsyncThunk(
    'products/updateProductRating',
    async ({ productId, rating }: { productId: string; rating: number }) => {
        const productRef = doc(FirebaseDB, 'products', productId);
        await updateDoc(productRef, { rating });
        return { productId, rating };
    }
);

// Función auxiliar para calcular el promedio de rating
const calculateAverageRating = (reviews: Review[]): number => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 5) / 5; // 1 decimal
};

// Listar reviews (por producto o usuario)
export const startFetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (
        { productId, userId }: { productId?: string; userId?: string },
    ) => {
        const params = new URLSearchParams();
        if (productId) params.append('productId', productId);
        if (userId) params.append('userId', userId);
        const apiUrl = getApiBaseUrl();
        const res = await fetch(`${apiUrl}/api/reviews?${params.toString()}`);
        return await res.json();
    }
);

// Crear review
export const startCreateReview = createAsyncThunk(
    'reviews/createReview',
    async (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>, { dispatch }) => {
        console.log('Creating review:', review);
        try {
            const apiUrl = getApiBaseUrl();
            const res = await fetch(`${apiUrl}/api/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(review),
            });
            const createdReview = await res.json();

            // Obtener todas las reviews del producto y calcular el nuevo rating
            const reviews = await dispatch(startFetchReviews({ productId: review.productId })).unwrap();
            const avgRating = calculateAverageRating(reviews);
            // Actualizar el producto con el nuevo rating
            await dispatch(updateProductRating({ productId: review.productId, rating: avgRating }));

            return createdReview;
        } catch (error) {
            console.error('Error creating review:', error);
            throw error;
        }
    }
);

// Editar review
export const startUpdateReview = createAsyncThunk(
    'reviews/updateReview',
    async (review: Review, { dispatch }) => {
        const apiUrl = getApiBaseUrl();
        const res = await fetch(`${apiUrl}/api/reviews/${review.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review),
        });
        const updatedReview = await res.json();

        // Obtener todas las reviews del producto y calcular el nuevo rating
        const reviews = await dispatch(startFetchReviews({ productId: review.productId })).unwrap();
        const avgRating = calculateAverageRating(reviews);
        // Actualizar el producto con el nuevo rating
        await dispatch(updateProductRating({ productId: review.productId, rating: avgRating }));

        return updatedReview;
    }
);

// Eliminar review
export const startDeleteReview = createAsyncThunk(
    'reviews/deleteReview',
    async (id: string, { dispatch, getState }) => {
        const apiUrl = getApiBaseUrl();
        const res = await fetch(`${apiUrl}/api/reviews/${id}`, {
            method: 'DELETE',
        });
        const deleted = await res.json();

        // Obtener el productId de la review eliminada
        const state = getState() as RootState;
        const productId = state.reviews.reviews.find((r: Review) => r.id === id)?.productId;
        if (productId) {
            // Obtener todas las reviews del producto y calcular el nuevo rating
            const reviews = await dispatch(startFetchReviews({ productId })).unwrap();
            const avgRating = calculateAverageRating(reviews);
            // Actualizar el producto con el nuevo rating
            await dispatch(updateProductRating({ productId, rating: avgRating }));
        }

        return deleted;
    }
);

// Agregar comentario del vendedor (reply)
export const startAddSellerReply = createAsyncThunk(
    'reviews/addSellerReply',
    async ({ reviewId, sellerReply }: { reviewId: string; sellerReply: string }) => {
        const apiUrl = getApiBaseUrl();
        const res = await fetch(`${apiUrl}/api/reviews/${reviewId}/reply`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sellerReply }),
        });
        return await res.json();
    }
);

export const loadReviewsForProduct = (productId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            dispatch(setReviews([])); // Limpiar reseñas previas
            const reviews = await dispatch(startFetchReviews({ productId })).unwrap();
            if (!reviews || reviews.length === 0) {
                dispatch(setError('No hay reseñas para este producto.'));
                return;
            }
            console.log('Reseñas cargadas:', reviews);
            dispatch(setReviews(reviews));
        } catch (error) {
            console.error('Error loading reviews:', error);
            dispatch(setError('Error al cargar reseñas'));
        } finally {
            dispatch(setLoading(false));
        }
    };
}
