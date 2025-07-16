import { FiltersProvider } from "./FiltersContext";
import { FavoritesProvider } from "./FavoritesContext";
import { ToastContainer } from "react-toastify";

interface AppProvidersProps {
    children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <FiltersProvider>
            <FavoritesProvider>
                {children}
            </FavoritesProvider>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ marginTop: '60px' }}
            />
        </FiltersProvider>
    );
};
