import { Link } from 'react-router';
import { FaHeart } from "react-icons/fa";
import type { Product } from '../../../types'
import { ProductPrice } from '../ProductPrice/ProductPrice';
import { useFavorites } from '../../../context/useFavorites';
import { Badge } from '../../ui/Badge/Badge';
import { CustomButton } from '../../ui/CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store/store';
import { setSelectedProduct } from '../../../store/products/productsSlice';
import './_productCard.scss'

type ProductCardProps = {
    product: Product;
    onClick?: () => void; // Hacer opcional el onClick
};

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    const dispatch = useDispatch<AppDispatch>();
    const isProductFavorite = isFavorite(product.id);
    const image = product.images.length ? product.images[0] : 'https://placehold.co/300x300'; // Imagen por defecto si no hay imágenes

    const handleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isProductFavorite) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product.id);
        }
    };

    const handleNavigation = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (onClick) onClick();
    };

    const handleClickProduct = () => {
        dispatch(setSelectedProduct(product));
    }

    return (
        <div className="productCard" onClick={handleClickProduct}>
            <div className='favoriteButton' onClick={handleFavorite}>
                <FaHeart className={isProductFavorite ? 'favorited' : ''} />
            </div>
            <Link to={`/productos/${product.id}`} className="productCardLink" onClick={handleNavigation}>
                <img src={image} alt={product.title} className='productImage' />
                {product.discount && <Badge color={'primary'}>{`-${product.discount}%`}</Badge>}
                <div className='productInfo'>
                    <h2 className="productCardTitle">{product.title}</h2>
                    <ProductPrice product={product} />
                </div>
                <div className="productActions">
                    <CustomButton color="primary">Ver más</CustomButton>
                </div>
            </Link>
        </div>
    );
};