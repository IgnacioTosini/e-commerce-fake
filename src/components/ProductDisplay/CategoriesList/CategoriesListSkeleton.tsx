import { Link } from 'react-router';
import { CategoryCardSkeleton } from '../CategoryCard/CategoryCardSkeleton';
import './_categoriesListSkeleton.scss'

export const CategoriesListSkeleton = () => {
    return (
        <div className="categoriesListContainerSkeleton">
            <div className='categoriesListHeaderSkeleton'>
                <h2 className="categoriesListTitleSkeleton">Categorías</h2>
                <Link to="/productos" className="moreLink" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}></Link>
            </div>
            <div className="categoriesListSkeleton">
                {[1, 2, 3, 4].map(id => (
                    <CategoryCardSkeleton key={id} />
                ))}
            </div>
        </div>
    );
};