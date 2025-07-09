import { doc, getDoc, updateDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { FirebaseDB } from '../../firebase/config';
import type { User } from '../../types';
import type { AppDispatch } from '../store';
import { addToFavorites, removeFromFavorites, setError, setLoading, setUser, setUsers, updateUserInList } from './userSlice';

export const createInitialUserCollections = async (userId: string) => {
    try {
        // Crear documento inicial para el carrito
        const cartDocRef = doc(FirebaseDB, 'carts', userId);
        const cartDoc = await getDoc(cartDocRef);

        if (!cartDoc.exists()) {
            await setDoc(cartDocRef, {
                userId,
                items: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }

        // Crear colección inicial para órdenes (con un documento placeholder si es necesario)
        const ordersDocRef = doc(FirebaseDB, 'orders', `${userId}_placeholder`);
        const ordersDoc = await getDoc(ordersDocRef);

        if (!ordersDoc.exists()) {
            await setDoc(ordersDocRef, {
                userId,
                isPlaceholder: true,
                createdAt: new Date().toISOString()
            });
        }
    } catch (error) {
        console.error('Error creating initial collections:', error);
        throw error;
    }
};

export const loadUserData = (userId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));

            const userDocRef = doc(FirebaseDB, 'users', userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data() as User;
                dispatch(setUser(userData));
            } else {
                dispatch(setError('Usuario no encontrado'));
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            dispatch(setError('Error al cargar datos del usuario'));
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const startUpdateUser = (userId: string, updates: Partial<User>) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));

            const updatedData = {
                ...updates,
                updatedAt: new Date().toISOString()
            };

            const userDocRef = doc(FirebaseDB, 'users', userId);
            await updateDoc(userDocRef, updatedData);

            dispatch(updateUserInList({ id: userId, updates: updatedData }));
        } catch (error) {
            console.error('Error updating user profile:', error);
            dispatch(setError('Error al actualizar perfil'));
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const startDeletingUser = (userId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));

            const userDocRef = doc(FirebaseDB, 'users', userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                // Eliminar el documento del usuario
                await updateDoc(userDocRef, { deleted: true, updatedAt: new Date().toISOString() });
                dispatch(setUser({} as User)); // Limpiar el usuario en Redux
            } else {
                dispatch(setError('Usuario no encontrado'));
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            dispatch(setError('Error al eliminar usuario'));
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export const createUserWithCollections = (userData: User) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));

            // 1. Crear documento del usuario en Firestore
            const userDocRef = doc(FirebaseDB, 'users', userData.id);
            await setDoc(userDocRef, userData);

            // 2. Crear colecciones iniciales (cart y orders)
            await createInitialUserCollections(userData.id);

            // 3. Actualizar estado de Redux
            dispatch(setUser(userData));

        } catch (error) {
            console.error('Error creating user with collections:', error);
            dispatch(setError('Error al crear perfil de usuario'));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const startAddFavorite = (userId: string, productId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));

            const userDocRef = doc(FirebaseDB, 'users', userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data() as User;
                const currentFavorites = userData.favorites || [];

                if (!currentFavorites.includes(productId)) {
                    const updatedFavorites = [...currentFavorites, productId];

                    await updateDoc(userDocRef, {
                        favorites: updatedFavorites,
                        updatedAt: new Date().toISOString()
                    });

                    dispatch(addToFavorites(productId));
                }
            } else {
                dispatch(setError('Usuario no encontrado'));
            }
        } catch (error) {
            console.error('Error adding favorite:', error);
            dispatch(setError('Error al agregar favorito'));
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const startRemoveFavorite = (userId: string, productId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));

            const userDocRef = doc(FirebaseDB, 'users', userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data() as User;
                const updatedFavorites = (userData.favorites || []).filter(id => id !== productId);

                await updateDoc(userDocRef, {
                    favorites: updatedFavorites,
                    updatedAt: new Date().toISOString()
                });

                dispatch(removeFromFavorites(productId));
            } else {
                dispatch(setError('Usuario no encontrado'));
            }
        } catch (error) {
            console.error('Error removing favorite:', error);
            dispatch(setError('Error al eliminar favorito'));
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const loadUserFavorites = (userId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));

            const userDocRef = doc(FirebaseDB, 'users', userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data() as User;
                dispatch(setUser({ ...userData, favorites: userData.favorites || [] }));
            } else {
                dispatch(setError('Usuario no encontrado'));
            }
        } catch (error) {
            console.error('Error loading user favorites:', error);
            dispatch(setError('Error al cargar favoritos del usuario'));
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const startLoadUsers = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));

            const usersCollectionRef = collection(FirebaseDB, 'users');
            const usersSnapshot = await getDocs(usersCollectionRef);

            if (usersSnapshot.empty) {
                dispatch(setUsers([]));
            } else {
                const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
                dispatch(setUsers(usersData));
            }
        } catch (error) {
            console.error('Error loading users:', error);
            dispatch(setError('Error al cargar usuarios'));
        } finally {
            dispatch(setLoading(false));
        }
    };
}