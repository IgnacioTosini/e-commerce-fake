import { createContext, useState } from 'react';
import type { Product } from '../types';
import { initialFavorites } from '../utils/initialFavorites';

type FavoriteItem = Product;

type FavoritesContextType = {
    favorites: FavoriteItem[];
    addToFavorites: (item: FavoriteItem) => void;
    removeFromFavorites: (id: string) => void;
    clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>(initialFavorites); // Usar productos iniciales desde un archivo separado

    const addToFavorites = (item: FavoriteItem) => {
        setFavorites((prev) => [...prev, item]);
    };

    const removeFromFavorites = (id: string) => {
        setFavorites((prev) => prev.filter((item) => item.id !== id));
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, clearFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export { FavoritesContext };
