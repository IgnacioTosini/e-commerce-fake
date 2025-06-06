import { Link } from 'react-router';
import { FaHeart } from "react-icons/fa";
import type { Product } from '../../../types'
import { ProductPrice } from '../ProductPrice/ProductPrice';
import { useFavorites } from '../../../context/useFavorites';
import { Badge } from '../../ui/Badge/Badge';
import { CustomButton } from '../../ui/CustomButton/CustomButton';
import './_productCard.scss'

type ProductCardProps = {
    product: Product
    onClick: () => void
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
    const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

    const isFavorite = favorites.some(fav => fav.id === product.id);

    const handleFavorite = (product: Product) => {
        if (isFavorite) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    };

    return (
        <div className="productCard">
            <div className='favoriteButton' onClick={() => handleFavorite(product)}>
                <FaHeart className={isFavorite ? 'favorited' : ''} />
            </div>
            <Link to={`/productos/${product.id}`} className="productCardLink" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); onClick(); }}>
                <img src={product.images[0]} alt={product.title} className='productImage' />
                {product.discount && <Badge color={'primary'}>{`-${product.discount}%`}</Badge>}
                <div className='productInfo'>
                    <h2 className="productCardTitle">{product.title}</h2>
                    <ProductPrice product={product} />
                </div>
                <div className="productActions">
                    <CustomButton color="primary">Agregar al carrito</CustomButton>
                </div>
            </Link>
        </div>
    )
}
