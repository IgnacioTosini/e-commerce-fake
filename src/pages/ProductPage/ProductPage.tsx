import { ProductDetails } from '../../components/ProductDisplay/ProductDetails/ProductDetails';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import './_productPage.scss'
import { useParams } from 'react-router';

export const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const { products } = useSelector((state: RootState) => state.products);
    const product = products.find(product => product.id === id);

    if (!product) {
        return <div>Producto no encontrado</div>;
    }

    return (
        <div className='productPage'>
            <ProductDetails product={product} />
        </div>
    );
}
