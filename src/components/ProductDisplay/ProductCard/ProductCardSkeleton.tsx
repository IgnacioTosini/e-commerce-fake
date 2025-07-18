import { Link } from 'react-router';
import './_productCardSkeleton.scss'

export const ProductCardSkeleton = () => {
    return (
        <div className="productCardSkeleton" >
            <div className='favoriteButton'>
            </div>
            <Link to='' className="productCardLink">
                <div className='productImage' />
                <div className='productInfo'>
                </div>
                <div className="productActions">
                </div>
            </Link>
        </div>
    );
};