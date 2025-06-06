import { FaRegClock } from "react-icons/fa";
import { Badge } from '../../components/ui/Badge/Badge'
import { mockProducts } from "../../utils/mockProducts";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { animateElements } from "../../hooks/gsapEffects";
import { CustomList } from "../../components/ui/CustomList/CustomList";
import { ProductCard } from "../../components/ProductDisplay/ProductCard/ProductCard";
import './_offersPage.scss'

export const OffersPage = () => {
    const discountedProducts = mockProducts.filter(product => product.discount && product.discount > 0);
    const offersPageRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (offersPageRef.current) {
            const elements = Array.from(offersPageRef.current.querySelectorAll('.offersPage, .offersBanner, .offersIconContainer, .offersTitle, .offersSubtitle, .offersList, .offersListTitle, .offersList > *'));
            animateElements(elements as HTMLElement[], 0.5, 0.2, 30);
        }
    }, [location]);

    return (
        <div className='offersPage' ref={offersPageRef}>
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
                <CustomList flexOptions={{ direction: 'row', justify: 'start', wrap: 'wrap', align: 'startAlign' }} maxItems={12} as='div'>
                    {discountedProducts.length > 0 ? (
                        <>{discountedProducts.map(product => (
                            <ProductCard key={product.id} product={product} onClick={() => { }} />
                        ))}</>
                    ) : (
                        <h2 className='offersListTitle'>No hay productos con descuento actualmente</h2>
                    )}
                </CustomList>
            </div>
        </div>
    )
}
