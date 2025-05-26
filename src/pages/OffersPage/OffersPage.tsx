import { FaRegClock } from "react-icons/fa";
import { Badge } from '../../components/Badge/Badge'
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { mockProducts } from "../../utils/mockProducts";
import './_offersPage.scss'

export const OffersPage = () => {
    const discountedProducts = mockProducts.filter(product => product.discount && product.discount > 0);
    return (
        <div className='offersPage'>
            <div className='offersBanner'>
                <div className="offersIconContainer">
                    <FaRegClock className='offersIcon' />
                    <Badge color='info'>
                        Ofertas Especiales
                    </Badge>
                </div>
                <h1 className='offersTitle'>Ofertas Especiales</h1>
                <p className='offersSubtitle'>Descubre nuestras mejores ofertas con descuentos de hasta el 50%. ¡Aprovecha estos precios únicos antes de que se agoten!</p>
            </div>

            <div className='offersList'>
                {discountedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
