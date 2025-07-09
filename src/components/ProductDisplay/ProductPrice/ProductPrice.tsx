import type { Product } from '../../../types';
import './_productPrice.scss';

type ProductPriceProps = {
    product: Product;
};

export const ProductPrice = ({ product }: ProductPriceProps) => {
    const price = typeof product.price === 'number' ? product.price : 0; // Validar que price sea un número
    const discountedPrice =
        product.discount && product.discount > 0
            ? (price - (price * product.discount / 100)).toFixed(2)
            : price.toFixed(2);

    return (
        <>
            {product.discount ? (
                <span className="productCardPriceDiscount">
                    <span
                        className="productCardPrice"
                        style={{ textDecoration: 'line-through', color: '#94A3B8' }}
                    >
                        ${price.toFixed(2)}
                    </span>
                    ${discountedPrice}
                </span>
            ) : (
                <span className="productCardPrice">${price.toFixed(2)}</span>
            )}
        </>
    );
};