import { useEffect, useRef } from 'react';
import { OrderCard } from '../../components/ProductDisplay/OrderCard/OrderCard'
import { useLocation } from 'react-router';
import { animateElements } from '../../hooks/gsapEffects';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import './_ordersPage.scss'

export const OrdersPage = () => {
    const { orders } = useSelector((state: RootState) => state.orders);
    const ordersPageRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    console.log(orders);

    useEffect(() => {
        if (ordersPageRef.current) {
            const elements = Array.from(ordersPageRef.current.querySelectorAll('.ordersPageTitle, .ordersPageDescription, .ordersPageContent > *'));
            animateElements(elements as HTMLElement[], 0.5, 0.2, 30);
        }
    }, [location]);

    return (
        <div className="ordersPage" ref={ordersPageRef}>
            <h1 className="ordersPageTitle">Mis Pedidos</h1>
            <p className="ordersPageDescription">
                Consulta el estado y detalles de todos tus pedidos.
            </p>
            <div className="ordersPageContent">
                {orders.map((order, idx) => (
                    <OrderCard order={order} key={order.id || idx} />
                ))}
            </div>
        </div>
    )
}
