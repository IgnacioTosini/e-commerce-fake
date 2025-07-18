import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type AuthState = {
    status: 'checking' | 'authenticated' | 'not-authenticated',
    uid: string | null,
    email: string | null,
    displayName: string | null,
    photoURL: string | null,
    phoneNumber?: string | null,
    createAt?: number | null,
    lastLoginAt?: number | null,
    errorMessage: string | null,
}
const initialState: AuthState = {
    status: 'checking', // 'checking', 'authenticated', 'not-authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    phoneNumber: null,
    createAt: null,
    lastLoginAt: null,
    errorMessage: null,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ uid: string, email: string, displayName: string, photoURL: string, phoneNumber?: string | null, createAt?: number | null, lastLoginAt?: number | null }>) => {
            state.status = 'authenticated'
            state.uid = action.payload.uid
            state.email = action.payload.email
            state.displayName = action.payload.displayName
            state.photoURL = action.payload.photoURL
            state.phoneNumber = action.payload.phoneNumber || null
            state.createAt = action.payload.createAt || null
            state.lastLoginAt = action.payload.lastLoginAt || null
            state.errorMessage = null
        },
        logout: (state, action: PayloadAction<{ errorMessage: string }>) => {
            state.status = 'not-authenticated'
            state.uid = null
            state.email = null
            state.displayName = null
            state.photoURL = null
            state.phoneNumber = null
            state.createAt = null
            state.lastLoginAt = null
            state.errorMessage = action.payload?.errorMessage || null
        },
        checkingCredentials: (state) => {
            state.status = 'checking'
        },
    },
})
// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions