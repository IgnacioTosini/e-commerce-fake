import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { mockProducts } from '../../utils/mockProducts';
import { useFilters } from '../../context/useFilters';
import { animateElements } from '../../hooks/gsapEffects';
import { FiltersSection } from '../../components/Filters/FiltersSeccion/FiltersSection';
import { CustomList } from '../../components/ui/CustomList/CustomList';
import { ProductCard } from '../../components/ProductDisplay/ProductCard/ProductCard';
import './_productsPage.scss'

export const ProductsPage = () => {
    const { handleFilteredProducts } = useFilters();
    const productsPageRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (productsPageRef.current) {
            const elements = Array.from(productsPageRef.current.querySelectorAll('.productsPage, .productsPageTitle, .productsPageDescription, .productsPageProductsHeader > *'));
            animateElements(elements as HTMLElement[], 0.5, 0.2, 30);
        }
    }, [location]);

    return (
        <div className='productsPage' ref={productsPageRef}>
            <h1 className='productsPageTitle'>Productos</h1>
            <p className='productsPageDescription'>Explora nuestra colección de productos de alta calidad y diseño exclusivo.</p>
            <section className='productsPageContent'>
                <FiltersSection />
                <section className='productsPageProducts'>
                    <section className='productsPageProductsHeader'>
                        <p className='productsPageProductsCount'>
                            Mostrando {handleFilteredProducts.length} productos de {mockProducts.length} disponibles
                        </p>
                    </section>
                    {handleFilteredProducts.length === 0 && (
                        <section className='productsPageNoProducts'>
                            <p className='productsPageNoProductsMessage'>No se encontraron productos que coincidan con los filtros aplicados.</p>
                        </section>
                    )}
                    <CustomList
                        flexOptions={{ direction: 'row', justify: 'start', wrap: 'wrap', align: 'startAlign' }}
                        maxItems={12}
                        as='div'
                    >
                        {handleFilteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} onClick={() => { }} />
                        ))}
                    </CustomList>
                </section>
            </section>
        </div>
    );
};
