import { useParams } from 'react-router';
import { ProductDetails } from '../../components/ProductDetails/ProductDetails';
import { mockProducts } from '../../utils/mockProducts';
import './_productPage.scss'

export const ProductPage = () => {
    const { id } = useParams();
    const product = mockProducts.find((prod) => prod.id === id);
    // const product = getProductById(id); // Función hipotética para obtener el producto
    if (!product) {
        return <div>Producto no encontrado</div>;
    }

    return (
        <div className='productPage'>
            <ProductDetails product={product} />
        </div>
    );
}
