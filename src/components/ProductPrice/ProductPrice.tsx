import type { Product } from '../../types';
import './_productPrice.scss'

type ProductPriceProps = {
    product: Product;
};

export const ProductPrice = ({ product }: ProductPriceProps) => {
    return (
        <>
            {product.discount ? (
                <span className="productCardPriceDiscount">
                    <span className="productCardPrice" style={{ textDecoration: 'line-through', color: '#94A3B8' }}>
                        ${product.price.toFixed(2)}
                    </span>
                    ${(product.price - (product.price * product.discount / 100)).toFixed(2)}
                </span>
            ) : (
                <span className="productCardPrice">
                    ${product.price.toFixed(2)}
                </span>
            )}
        </>
    )
}
