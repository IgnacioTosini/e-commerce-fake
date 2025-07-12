import { ProductDetails } from '../../components/ProductDisplay/ProductDetails/ProductDetails';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { useParams } from 'react-router';
import { ProductDetailsSkeleton } from '../../components/ProductDisplay/ProductDetails/ProductDetailsSkeleton';
import './_productPage.scss'

export const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const { products } = useSelector((state: RootState) => state.products);
    const product = products.find(product => product.id === id);

    if (!product) {
        return <ProductDetailsSkeleton />;
    }

    return (
        <div className='productPage'>
            <ProductDetails product={product} />
        </div>
    );
}
