import { useNavigate } from 'react-router';
import type { Category } from '../../../types';
import { useFilters } from '../../../context/useFilters';
import './_categoryCard.scss';

type CategoryCardProps = {
    category: Category;
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
    const { handleFilterChange } = useFilters();
    const navigate = useNavigate();

    const handleClick = () => {
        handleFilterChange('Categoria', category.name);
        navigate(`/productos`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const { image, name, productsCount } = category;

    return (
        <div onClick={handleClick} className="categoryCard">
            <img src={image} alt={name} />
            <div className="categoryCardOverlay">
                <h2 className="categoryCardTitle">{name}</h2>
                <p className="categoryCardContent">
                    {productsCount || 0} productos
                </p>
            </div>
        </div>
    );
};