import { CustomButton } from '../CustomButton/CustomButton';
import { CustomFilterChecked } from '../CustomFilterChecked/CustomFilterChecked';
import { sizeList } from '../../utils/sizeList';
import { useFilters } from '../../context/useFilters';
import { categories } from '../../utils/mockCategories';
import { mockProducts } from '../../utils/mockProducts';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { animateElements } from '../../hooks/gsapEffects';
import './_filtersSection.scss';

export const FiltersSection = () => {
    const { selectedFilters, handleClearFilters, handleFilterChange } = useFilters();
    const filtersSectionRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (filtersSectionRef.current) {
            const elements = Array.from(filtersSectionRef.current.querySelectorAll('.filtersSection, .filtersSectionTitle, .customButton, .customFilterChecked > *'));
            animateElements(elements as HTMLElement[], 0.5, 0.2, 30);
        }
    }, [location]);

    // Calcular colores únicos y sus cantidades
    const colorCounts = mockProducts.reduce((acc, product) => {
        if (product.colors) {
            product.colors.forEach(color => {
                acc[color] = (acc[color] || 0) + 1;
            });
        }
        return acc;
    }, {} as Record<string, number>);

    // Calcular categorías y sus cantidades
    const categoryCounts = categories.reduce((acc, category) => {
        acc[category.name] = mockProducts.filter(product => product.categories?.some(cat => cat.name === category.name)).length;
        return acc;
    }, {} as Record<string, number>);

    // Calcular tallas y sus cantidades
    const sizeCounts = sizeList.reduce((acc, size) => {
        acc[size] = mockProducts.filter(product => product.sizes?.includes(size)).length;
        return acc;
    }, {} as Record<string, number>);

    return (
        <section className='filtersSection' ref={filtersSectionRef}>
            <h2 className='filtersSectionTitle'>Filtros</h2>
            <CustomButton color='tertiary' onClick={handleClearFilters} disabled={Object.values(selectedFilters).every(filters => filters.length === 0)}>
                Limpiar Filtros
            </CustomButton>
            <CustomFilterChecked
                array={categories.map((category) => category.name)}
                onClick={(filter) => handleFilterChange('Categoria', filter)}
                categoryName='Categoría'
                selectedFilters={selectedFilters.Categoria}
                cant={categoryCounts} // Pasar las cantidades de categorías
            />
            <CustomFilterChecked
                array={Object.keys(colorCounts)}
                onClick={(filter) => handleFilterChange('Colores', filter)}
                categoryName='Colores'
                selectedFilters={selectedFilters.Colores}
                cant={colorCounts} // Pasar las cantidades de colores
            />
            <CustomFilterChecked
                array={sizeList}
                onClick={(filter) => handleFilterChange('Talla', filter)}
                categoryName='Talla'
                selectedFilters={selectedFilters.Talla}
                cant={sizeCounts} // Pasar las cantidades de tallas
            />
        </section>
    );
};
