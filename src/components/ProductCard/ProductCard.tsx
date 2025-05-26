import { useState } from 'react'
import { FaHeart } from "react-icons/fa";
import type { Product } from '../../types'
import { Badge } from '../Badge/Badge'
import { CustomButton } from '../CustomButton/CustomButton'
import './_productCard.scss'

type ProductCardProps = {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const handleFavorite = (product: Product) => {
        setIsFavorite(!isFavorite);
        console.log('Producto agregado a favoritos:', product);
    }

    return (
        <div className="productCard">
            <img src={product.images[0]} alt={product.title} className='productImage' />
            {product.discount && <Badge color={'primary'}>{`-${product.discount}%`}</Badge>}
            <div className='productInfo'>
                <h2 className="productCardTitle">{product.title}</h2>
                {product.discount ? (
                    <span className="productCardPriceDiscount">
                        <span className="productCardPrice" style={{ textDecoration: 'line-through', color: '#94A3B8' }}>
                            ${product.price.toFixed(2)}
                        </span>
                        ${ (product.price - (product.price * product.discount / 100)).toFixed(2) }
                    </span>
                ) : (
                    <span className="productCardPrice">
                        ${product.price.toFixed(2)}
                    </span>
                )}
            </div>
            <div className="productActions">
                <CustomButton color="primary">Agregar al carrito</CustomButton>
            </div>
            <div className='favoriteButton' onClick={() => handleFavorite(product)}>
                <FaHeart className={isFavorite ? 'favorited' : ''} />
            </div>
        </div>
    )
}
