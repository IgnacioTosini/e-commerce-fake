import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { CustomFilterChecked } from '../CustomFilterChecked/CustomFilterChecked';
import { useFilters } from '../../../context/useFilters';
import { animateElements } from '../../../hooks/gsapEffects';
import { CustomButton } from '../../ui/CustomButton/CustomButton';
import type { RootState } from '../../../store/store';
import { AVAILABLE_SIZES } from '../../../utils/productVariants';
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
    const products = useSelector((state: RootState) => state.products.products);

    // Calcular colores únicos y sus cantidades
    const colorCounts = products.reduce((acc, product) => {
        if (product.variants) {
            product.variants.forEach(variant => {
                const color = variant.color;
                acc[color] = (acc[color] || 0) + 1;
            });
        }
        return acc;
    }, {} as Record<string, number>);

    // Calcular categorías y sus cantidades
    const categoryCounts = products.reduce((acc, product) => {
        acc[product.categoryName] = (acc[product.categoryName] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Calcular tallas y sus cantidades
    const sizeCounts = AVAILABLE_SIZES.reduce((acc, size) => {
        acc[size] = products.filter(product => product.variants?.some(variant => variant.size === size)).length;
        return acc;
    }, {} as Record<string, number>);

    return (
        <section className='filtersSection' ref={filtersSectionRef}>
            <h2 className='filtersSectionTitle'>Filtros</h2>
            <CustomButton color='tertiary' onClick={handleClearFilters} disabled={Object.values(selectedFilters).every(filters => filters.length === 0)}>
                Limpiar Filtros
            </CustomButton>
            <CustomFilterChecked
                array={products.map((product) => product.categoryName)}
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
                array={AVAILABLE_SIZES}
                onClick={(filter) => handleFilterChange('Talla', filter)}
                categoryName='Talla'
                selectedFilters={selectedFilters.Talla}
                cant={sizeCounts} // Pasar las cantidades de tallas
            />
        </section>
    );
};
