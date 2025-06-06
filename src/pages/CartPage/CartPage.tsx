import { useEffect, useRef } from 'react'
import { CartItemCard } from '../../components/ProductDisplay/CartItemCard/CartItemCard'
import { OrderSummary } from '../../components/Miscellaneous/OrderSummary/OrderSummary'
import { mockCartItems } from '../../utils/mockCartItems'
import { useLocation } from 'react-router'
import { animateElements } from '../../hooks/gsapEffects'
import './_cartPage.scss'

export const CartPage = () => {
    const cartPageRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (cartPageRef.current) {
            const elements = Array.from(cartPageRef.current.querySelectorAll('.cartPageTitle, .cartPageContent > *'));
            animateElements(elements as HTMLElement[], 0.5, 0.2, 30);
        }
    }, [location]);

    return (
        <div className='cartPage' ref={cartPageRef}>
            <h1 className='cartPageTitle'>Tu Carrito</h1>
            <section className='cartPageContent'>
                <section className='cartPageContentItems'>
                    <h2 className='cartPageSubtitle'>Artículos ({mockCartItems.length})</h2>
                    {mockCartItems.length > 0 ? (
                        mockCartItems.map((item, index) => (
                            <CartItemCard key={index} cartItem={item} />
                        ))
                    ) : (
                        <p>Tu carrito está vacío.</p>
                    )}
                </section>
                <OrderSummary />
            </section>
        </div>
    )
}
