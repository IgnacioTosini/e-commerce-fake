import { Link, useLocation } from 'react-router';
import { CategoryCard } from '../CategoryCard/CategoryCard'
import { useEffect, useRef, useMemo } from 'react';
import { animateElements } from '../../../hooks/gsapEffects';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import type { Category } from '../../../types';
import './_categoriesList.scss'
import { CategoriesListSkeleton } from './CategoriesListSkeleton';

export const CategoriesList = () => {
    const categoriesListRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const { products } = useSelector((state: RootState) => state.products);

    // Crear categorías únicas desde los productos
    const categories = useMemo((): Category[] => {
        const uniqueCategories = new Set<string>();
        const categoryList: Category[] = [];

        products.forEach(product => {
            if (!uniqueCategories.has(product.categoryName)) {
                uniqueCategories.add(product.categoryName);

                // Contar productos en esta categoría
                const productsCount = products.filter(p => p.categoryName === product.categoryName).length;

                categoryList.push({
                    id: product.categoryName.toLowerCase().replace(/\s+/g, '-'),
                    name: product.categoryName,
                    image: product.images[0] || 'https://via.placeholder.com/300x200',
                    productsCount
                });
            }
        });

        return categoryList;
    }, [products]);

    useEffect(() => {
        if (categoriesListRef.current) {
            const elements = Array.from(categoriesListRef.current.querySelectorAll('.categoriesListHeader, .categoriesListTitle, .moreLink, .categoriesList > *'));
            animateElements(elements as HTMLElement[], 0.5, 0.2, 30);
        }
    }, [location]);

    if(!categories || categories.length === 0) {
        return <CategoriesListSkeleton />;
    }

    return (
        <div className="categoriesListContainer" ref={categoriesListRef}>
            <div className='categoriesListHeader'>
                <h2 className="categoriesListTitle">Categorías</h2>
                <Link to="/productos" className="moreLink" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    Ver todas
                </Link>
            </div>
            <div className="categoriesList">
                {categories.map(category => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};