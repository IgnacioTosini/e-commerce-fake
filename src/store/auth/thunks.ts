import { loginWithEmailPassword, registerWithEmailPassword, signInWithGoogle, signOut } from '../../firebase/providers';
import { resetCart } from '../cart/cartSlice';
import { resetOrders, setLoading } from '../orders/ordersSlice';
import type { AppDispatch } from '../store';
import { clearUser } from '../user/userSlice';
import { checkingCredentials, login, logout } from './authSlice';

import { doc, getDoc } from 'firebase/firestore';
import { FirebaseDB } from '../../firebase/config';
import { initializeCart } from '../cart/cartSlice';
import { initializeOrders } from '../orders/ordersSlice';
import { setUser } from '../user/userSlice';
import { createUserWithCollections, loadUserFavorites } from '../user/thunks';

export const startGoogleSignIn = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();

        if (!result.ok) {
            dispatch(setLoading(false));
            return dispatch(logout({ errorMessage: result.errorMessage || 'Error signing in with Google' }));
        }
        if (!result.user || !result.user.uid || !result.user.email || !result.user.displayName || !result.user.photoURL) {
            return dispatch(logout({ errorMessage: 'Incomplete user data from Google Sign-In' }));
        }

        // 1. Dispatch del auth slice (datos básicos de Google)
        dispatch(login({
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL
        }));        // 2. Verificar si el usuario ya existe en Firestore
        try {
            const userDocRef = doc(FirebaseDB, 'users', result.user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                // Usuario existente: cargar datos completos
                const userData = userDoc.data();
                const userToSet = {
                    id: result.user.uid,
                    name: userData.name || result.user.displayName,
                    email: result.user.email,
                    role: userData.role || 'user',
                    createdAt: userData.createdAt,
                    updatedAt: new Date().toISOString(),
                    address: userData.address || '',
                    phone: userData.phone || '',
                    isActive: userData.isActive ?? true,
                    photoURL: result.user.photoURL || '',
                    image: userData.image || ''
                };
                dispatch(setUser(userToSet));
            } else {
                // Usuario nuevo: crear documento en Firestore
                const newUser = {
                    id: result.user.uid,
                    name: result.user.displayName,
                    email: result.user.email,
                    role: 'user' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    address: '',
                    phone: '',
                    isActive: true,
                    photoURL: result.user.photoURL || '',
                };

                // Crear usuario con colecciones iniciales
                await dispatch(createUserWithCollections(newUser));
            }

            // 3. Inicializar cart y orders en Redux
            dispatch(initializeCart({ userId: result.user.uid }));
            dispatch(initializeOrders({ userId: result.user.uid }));
            dispatch(loadUserFavorites(result.user.uid || ''));
            dispatch(setLoading(false));

        } catch (error) {
            console.error('Error handling user data:', error);
            dispatch(logout({ errorMessage: 'Error al cargar datos del usuario' }));
        }
    }
}

export const startCreatingUserWithEmailPassword = (email: string, password: string, name: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            dispatch(checkingCredentials());
            const result = await registerWithEmailPassword(email, password, name);

            if (!result.ok) {
                dispatch(setLoading(false));
                return dispatch(logout({ errorMessage: result.errorMessage || 'Firebase: Error (auth/email-already-in-use)' }));
            }

            // 1. Dispatch del auth slice (datos básicos de Firebase Auth)
            dispatch(login({
                uid: result.uid || '',
                email: result.email || '',
                displayName: result.displayName || '',
                photoURL: result.photoURL || ''
            }));

            // 2. Crear documento en Firestore para el nuevo usuario
            try {
                const newUser = {
                    id: result.uid || '',
                    name: name,
                    email: result.email || '',
                    role: 'user' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    address: '',
                    phone: '',
                    isActive: true,
                    photoURL: result.photoURL || ''
                };

                // Crear usuario con colecciones iniciales
                await dispatch(createUserWithCollections(newUser));

                // 3. Inicializar cart y orders en Redux
                dispatch(initializeCart({ userId: result.uid || '' }));
                dispatch(initializeOrders({ userId: result.uid || '' }));
                dispatch(loadUserFavorites(result.uid || ''));
                dispatch(setLoading(false));

            } catch (firestoreError) {
                console.error('Error creating user document:', firestoreError);
                dispatch(logout({ errorMessage: 'Error al crear perfil de usuario' }));
            }

        } catch (error) {
            console.error('Error in startCreatingUserWithEmailPassword:', error);
            dispatch(logout({ errorMessage: 'Firebase: Error (auth/email-already-in-use)' }));
        }
    }
}

export const startLoginWithEmailPassword = (email: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(checkingCredentials());
            const result = await loginWithEmailPassword(email, password);

            if (!result.ok) {
                return dispatch(logout({ errorMessage: result.errorMessage || 'Error en el inicio de sesión, por favor verifica tus credenciales.' }));
            }

            // 1. Dispatch del auth slice
            dispatch(login({
                uid: result.uid || '',
                email: result.email || '',
                displayName: result.displayName || '',
                photoURL: result.photoURL || ''
            }));

            // 2. Cargar datos completos del usuario desde Firestore
            try {
                const userDocRef = doc(FirebaseDB, 'users', result.uid || '');
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    dispatch(setUser({
                        id: result.uid || '',
                        name: userData.name || result.displayName || '',
                        email: result.email || '',
                        role: userData.role || 'user',
                        createdAt: userData.createdAt,
                        updatedAt: new Date().toISOString(),
                        address: userData.address || '',
                        phone: userData.phone || '',
                        isActive: userData.isActive ?? true,
                        photoURL: result.photoURL || '',
                        image: userData.image || ''
                    }));
                } else {
                    dispatch(logout({ errorMessage: 'Usuario no encontrado en la base de datos' }));
                    return;
                }

                // 3. Inicializar cart y orders
                dispatch(initializeCart({ userId: result.uid || '' }));
                dispatch(initializeOrders({ userId: result.uid || '' }));
                dispatch(loadUserFavorites(result.uid || ''));

            } catch (firestoreError) {
                console.error('Error loading user data:', firestoreError);
                dispatch(logout({ errorMessage: 'Error al cargar datos del usuario' }));
            }

        } catch (error) {
            console.error('Error in startLoginWithEmailPassword:', error);
            dispatch(logout({ errorMessage: 'Usuario o contraseña incorrectos' }));
        }
    };
};

export const startLogout = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await signOut();
            if (!result.ok) {
                return dispatch(logout({ errorMessage: result.errorMessage || 'Error al cerrar sesión' }));
            }
            dispatch(logout({ errorMessage: '' }));
            dispatch(clearUser());
            dispatch(resetCart());
            dispatch(resetOrders());
        } catch (error) {
            console.error('Error in startLogout:', error);
            dispatch(logout({ errorMessage: 'Error al cerrar sesión' }));
        }
    }
}