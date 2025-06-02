
import { useNavigate } from 'react-router';
import type { Category } from '../../types';
import { useFilters } from '../../context/useFilters';
import './_categoryCard.scss';

type CategoryCardProps = {
    category: Category;
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
    const { handleFilterChange } = useFilters(); // Acceder al método del contexto
    const navigate = useNavigate(); // Usar navigate para redirigir

    const handleClick = () => {
        handleFilterChange('Categoria', category.name); // Marcar el filtro de la categoría
        navigate(`/productos`); // Redirigir a la página de productos
        window.scrollTo({ top: 0, behavior: 'smooth' })
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