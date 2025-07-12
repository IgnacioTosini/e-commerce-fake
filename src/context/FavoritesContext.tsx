import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { startAddFavorite, startRemoveFavorite } from '../store/user/thunks';
import { toast } from 'react-toastify';

type FavoritesContextType = {
    favorites: string[];
    addToFavorites: (productId: string) => void;
    removeFromFavorites: (productId: string) => void;
    clearFavorites: () => void;
    isFavorite: (productId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const { favorites, user, loading } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const addToFavorites = (productId: string) => {
        if (!user) {
            console.error('No user is logged in');
            return;
        }
        dispatch(startAddFavorite(user.id, productId));
        if (!loading) {
            toast.success(`Producto añadido a favoritos`);
        }
    };

    const removeFromFavorites = (productId: string) => {
        if (!user) {
            console.error('No user is logged in');
            return;
        }
        dispatch(startRemoveFavorite(user.id, productId));
        if (!loading) {
            toast.success(`Producto eliminado de favoritos`);
        }
    };

    const clearFavorites = () => {
        if (!user) {
            console.error('No user is logged in');
            return;
        }
        // Implementar clearFavorites si es necesario
    };

    const isFavorite = (productId: string) => {
        return favorites.includes(productId);
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            addToFavorites,
            removeFromFavorites,
            clearFavorites,
            isFavorite
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export { FavoritesContext };