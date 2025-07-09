import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../types'

export type UserState = {
    user: User,
    users: User[], // Lista de usuarios
    favorites: string[], // IDs de productos favoritos
    loading: boolean,
    error: string | null,
}

const initialState: UserState = {
    user: {} as User,
    users: [], // Inicialmente vacío, se puede llenar con una lista de usuarios
    favorites: [],
    loading: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.error = null
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    ...action.payload,
                    updatedAt: new Date().toISOString()
                }
            }
        },
        setFavorites: (state, action: PayloadAction<string[]>) => {
            state.favorites = action.payload
        },
        addToFavorites: (state, action: PayloadAction<string>) => {
            if (!state.favorites.includes(action.payload)) {
                state.favorites.push(action.payload)
            }
        },
        removeFromFavorites: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(id => id !== action.payload)
        },
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const productId = action.payload
            const index = state.favorites.indexOf(productId)

            if (index >= 0) {
                state.favorites.splice(index, 1)
            } else {
                state.favorites.push(productId)
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        clearUser: (state) => {
            state.user = {} as User
            state.favorites = []
            state.error = null
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload
        },
        updateUserInList: (state, action: PayloadAction<{ id: string; updates: Partial<User> }>) => {
            const { id, updates } = action.payload;

            // Actualizar en el array de usuarios
            const userIndex = state.users.findIndex(user => user.id === id);
            if (userIndex !== -1) {
                state.users[userIndex] = {
                    ...state.users[userIndex],
                    ...updates,
                    updatedAt: new Date().toISOString()
                };
            }

            // Si es el usuario autenticado, también actualizarlo
            if (state.user.id === id) {
                state.user = {
                    ...state.user,
                    ...updates,
                    updatedAt: new Date().toISOString()
                };
            }
        },
    },
})

export const {
    setUser,
    updateUser,
    setFavorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    setLoading,
    setError,
    clearUser,
    setUsers,
    updateUserInList
} = userSlice.actions

export default userSlice.reducer