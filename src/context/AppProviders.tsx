import { FiltersProvider } from "./FiltersContext";
import { FavoritesProvider } from "./FavoritesContext";
import { CartProvider } from "./CartContext";

interface AppProvidersProps {
    children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <FiltersProvider>
            <FavoritesProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </FavoritesProvider>
        </FiltersProvider>
    );
};
