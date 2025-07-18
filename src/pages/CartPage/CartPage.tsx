import { useEffect, useRef } from 'react'
import { CartItemCard } from '../../components/ProductDisplay/CartItemCard/CartItemCard'
import { OrderSummary } from '../../components/Miscellaneous/OrderSummary/OrderSummary'
import { useLocation } from 'react-router'
import { animateElements } from '../../hooks/gsapEffects'
import { useSelector } from 'react-redux'
import { useRealtimeCart } from '../../hooks/useRealtimeCart';
import type { RootState } from '../../store/store'
import { CartItemCardSkeleton } from '../../components/ProductDisplay/CartItemCard/CartItemCardSkeleton'
import './_cartPage.scss'

export const CartPage = () => {
    const { cart, loading } = useSelector((state: RootState) => state.cart);
    const { uid } = useSelector((state: RootState) => state.auth);
    useRealtimeCart(uid!);
    const cartPageRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (cartPageRef.current) {
            const elements = Array.from(cartPageRef.current.querySelectorAll('.cartPageTitle, .cartPageContent > *'));
            animateElements(elements as HTMLElement[], 0.5, 0.2, 30);
        }
    }, [location]);

    if (loading || !cart) {
        return (
            <div className='cartPage'>
                <h1 className='cartPageTitle'>Tu Carrito</h1>
                <section className='cartPageContent'>
                    <section className='cartPageContentItems'>
                        <h2 className='cartPageSubtitle'>Artículos</h2>
                        {[1, 2, 3, 4].map((index) => (
                            <CartItemCardSkeleton key={index} />
                        ))}
                    </section>
                </section>
            </div>
        );
    }

    return (
        <div className='cartPage' ref={cartPageRef}>
            <h1 className='cartPageTitle'>Tu Carrito</h1>
            <section className='cartPageContent'>
                <section className='cartPageContentItems'>
                    <h2 className='cartPageSubtitle'>Artículos ({cart.items.length})</h2>
                    {cart.items.length ? (
                        cart.items.map((item, index) => (
                            <CartItemCard key={index} cartItem={item} />
                        ))
                    ) : (
                        <p>Tu carrito está vacío.</p>
                    )}
                </section>
                <OrderSummary />
            </section>
        </div>
    );
};

export default CartPage;
