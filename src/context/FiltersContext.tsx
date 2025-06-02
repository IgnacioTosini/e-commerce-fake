import { createContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { mockProducts } from '../utils/mockProducts';
import type { Product } from '../types';

type FilterCategory = 'Categoria' | 'Colores' | 'Talla';

type SelectedFilters = {
    [key in FilterCategory]: string[];
};

type FiltersContextProps = {
    selectedFilters: SelectedFilters;
    handleFilteredProducts: typeof mockProducts;
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

    const handleFilteredProducts = useMemo(() => {
        return mockProducts.filter(product => {
            const matchesCategory = selectedFilters.Categoria.length === 0 ||
                selectedFilters.Categoria.some(categoryName =>
                    product.categories.some(category => category.name === categoryName)
                );

            const matchesColor = selectedFilters.Colores.length === 0 ||
                selectedFilters.Colores.some(color => product.colors && product.colors.includes(color));

            const matchesSize = selectedFilters.Talla.length === 0 ||
                selectedFilters.Talla.some(size => product.sizes && product.sizes.includes(size));

            return matchesCategory && matchesColor && matchesSize;
        });
    }, [selectedFilters]);

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
