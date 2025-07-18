import { useEffect, useRef } from 'react';
import { OrderCard } from '../../components/ProductDisplay/OrderCard/OrderCard'
import { useLocation, useNavigate } from 'react-router';
import { animateElements } from '../../hooks/gsapEffects';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import './_ordersPage.scss'

export const OrdersPage = () => {
    const { orders } = useSelector((state: RootState) => state.orders);
    const ordersPageRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (ordersPageRef.current) {
            const elements = Array.from(ordersPageRef.current.querySelectorAll('.ordersPageTitle, .ordersPageDescription, .ordersPageContent > *'));
            animateElements(elements as HTMLElement[], 0.5, 0.2, 30);
        }
    }, [location]);

    return (
        <div className="ordersPage" ref={ordersPageRef}>
            <button type="button" className='backArrow' onClick={() => navigate(-1)}>
                <FaLongArrowAltLeft /><p>Volver</p>
            </button>
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

export default OrdersPage;
