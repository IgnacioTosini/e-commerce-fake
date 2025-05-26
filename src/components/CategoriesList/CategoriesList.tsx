import { Link } from 'react-router';
import { CategoryCard } from '../CategoryCard/CategoryCard'
import { categories } from '../../utils/mockCategories';
import './_categoriesList.scss'

export const CategoriesList = () => {
    return (
        <div className="categoriesListContainer">
            <div className='categoriesListHeader'>
                <h2 className="categoriesListTitle">Categorías</h2>
                <Link to="/categories" className="moreLink">
                    Ver todas
                </Link>
            </div>
            <div className="categoriesList">
                {categories.map(category => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    )
}
