import { createContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types';
import type { RootState } from '../store/store';
import { useSelector } from 'react-redux';

type FilterCategory = 'Categoria' | 'Colores' | 'Talla';

type SelectedFilters = {
    [key in FilterCategory]: string[];
};

type FiltersContextProps = {
    selectedFilters: SelectedFilters;
    handleFilteredProducts: Product[];
    handleClearFilters: () => void;
    handleFilterChange: (category: FilterCategory, filter: string) => void;
    filteredProducts: Product[];
}

// Crear un contexto para los filtros
const FiltersContext = createContext<FiltersContextProps | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        Categoria: [],
        Colores: [],
        Talla: []
    });
    const { products } = useSelector((state: RootState) => state.products);

    const handleFilteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = selectedFilters.Categoria.length === 0 ||
                selectedFilters.Categoria.some(categoryName =>
                    product.categoryName.toLowerCase() === categoryName.toLowerCase()
                );

            const matchesColor = selectedFilters.Colores.length === 0 ||
                selectedFilters.Colores.some(color => product.colors && product.colors.includes(color.toLowerCase()));

            const matchesSize = selectedFilters.Talla.length === 0 ||
                selectedFilters.Talla.some(size => product.sizes && product.sizes.includes(size.toLowerCase()));

            return matchesCategory && matchesColor && matchesSize;
        });
    }, [selectedFilters, products]);

    const handleClearFilters = () => {
        setSelectedFilters({
            Categoria: [],
            Colores: [],
            Talla: []
        });
    };

    const handleFilterChange = (category: FilterCategory, filter: string) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [category]: prev[category].includes(filter)
                ? prev[category].filter((item) => item !== filter)
                : [...prev[category], filter]
        }));
    };

    return (
        <FiltersContext.Provider value={{
            selectedFilters,
            handleFilteredProducts,
            handleClearFilters,
            handleFilterChange,
            filteredProducts: handleFilteredProducts
        }}>
            {children}
        </FiltersContext.Provider>
    );
};

export { FiltersContext };
