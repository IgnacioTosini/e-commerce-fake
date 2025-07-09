import { FiltersProvider } from "./FiltersContext";
import { FavoritesProvider } from "./FavoritesContext";

interface AppProvidersProps {
    children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <FiltersProvider>
            <FavoritesProvider>
                {children}
            </FavoritesProvider>
        </FiltersProvider>
    );
};
