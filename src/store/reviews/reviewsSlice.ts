import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Review } from '../../types'

export type ReviewState = {
    reviews: Review[],
    reviewSelected?: Review | null,
    loading: boolean,
    error: string | null,
}

const initialState: ReviewState = {
    reviews: [],
    reviewSelected: null,
    loading: false,
    error: null,
}

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        setReviews: (state, action: PayloadAction<Review[]>) => {
            state.reviews = action.payload
            state.error = null
        },
        setReviewSelected: (state, action: PayloadAction<Review | null>) => {
            state.reviewSelected = action.payload
            state.error = null
        },
        addReview: (state, action: PayloadAction<Review>) => {
            state.reviews.push(action.payload)
            state.error = null
        },
        updateReview: (state, action: PayloadAction<Review>) => {
            const index = state.reviews.findIndex(r => r.id === action.payload.id)
            if (index !== -1) {
                state.reviews[index] = action.payload
            }
            state.error = null
        },
        deleteReview: (state, action: PayloadAction<string>) => {
            state.reviews = state.reviews.filter(r => r.id !== action.payload)
            state.error = null
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
    },
})

export const {
    setReviews,
    setReviewSelected,
    addReview,
    updateReview,
    deleteReview,
    setLoading,
    setError,
} = reviewsSlice.actions

export default reviewsSlice.reducer