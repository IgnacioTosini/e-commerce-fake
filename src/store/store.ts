import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authSlice } from './auth/authSlice'
import { productsSlice } from './products/productsSlice'
import { userSlice } from './user/userSlice'
import { cartSlice } from './cart/cartSlice'
import { ordersSlice } from './orders/ordersSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'user', 'cart', 'orders'] // Solo persiste estos slices
}

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    products: productsSlice.reducer,
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    orders: ordersSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch