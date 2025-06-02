import { Link, useLocation } from 'react-router';
import { CategoryCard } from '../CategoryCard/CategoryCard'
import { categories } from '../../utils/mockCategories';
import { useEffect, useRef } from 'react';
import { animateElements } from '../../hooks/gsapEffects';
import './_categoriesList.scss'

export const CategoriesList = () => {
    const categoriesListRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (categoriesListRef.current) {
            const elements = Array.from(categoriesListRef.current.querySelectorAll('.categoriesListHeader, .categoriesListTitle, .moreLink, .categoriesList > *'));
            animateElements(elements as HTMLElement[], 0.5, 0.2, 30);
        }
    }, [location]);

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
