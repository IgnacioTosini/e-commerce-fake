import { useNavigate } from 'react-router';
import type { Category } from '../../../types';
import { useFilters } from '../../../context/useFilters';
import './_categoryCard.scss';

type CategoryCardProps = {
    category: Pick<Category, 'name' | 'image' | 'products'>; // Ajustar el tipo para que coincida con los cambios recientes
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
    const { handleFilterChange } = useFilters();
    const navigate = useNavigate();
    console.log('CategoryCard rendered with category:', category);

    const handleClick = () => {
        handleFilterChange('Categoria', category.name);
        navigate(`/productos`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const { image, name, products } = category;

    return (
        <div onClick={handleClick} className="categoryCard">
            <img src={image} alt={name} />
            <div className="categoryCardOverlay">
                <h2 className="categoryCardTitle">{name}</h2>
                <p className="categoryCardContent">{products.length} productos</p>
            </div>
        </div>
    );
};