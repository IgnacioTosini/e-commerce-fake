import { useNavigate, useParams } from 'react-router';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { OrderStatusCard } from '../../components/ui/OrderStatusCard/OrderStatusCard';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { OrderPageSkeleton } from './[id]Skeleton';
import './_orderPage.scss';

export const OrderPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { orders } = useSelector((state: RootState) => state.orders);
    const order = orders.find(order => order.id === id);

    if (!order) {
        return <OrderPageSkeleton />;
    }

    return (
        <section className='orderPage'>
            <nav className='orderPageNav'>
                <button type="button" className='backArrow' onClick={() => navigate(-1)}>
                    <FaLongArrowAltLeft /><p>Volver a pedidos</p>
                </button>
            </nav>
            <div className='orderPageContainer'>
                <section className='orderPageHeader'>
                    <section className='orderPageHeaderInfo'>
                        <h1 className='orderPageTitle'>Pedido {order?.id}</h1>
                        <p className='orderPageDate'>Pedido realizado el {new Date(order?.createdAt || '').toLocaleDateString()}</p>
                    </section>
                    <OrderStatusCard order={order} />
                </section>
                <section className='orderPageContent'>
                    <section className='orderPageProductsDetails'>
                        <h2>Productos ({order?.items.length || 0})</h2>
                        <ul>
                            {order?.items.map(item => {
                                return (
                                    <li key={item.productId} className='orderPageProductItem'>
                                        <img src={item.images?.[0].url} alt={item.userId} />
                                        <section className='orderPageProductInfo'>
                                            <span className='orderPageProductTitle'>{item.title}</span>
                                            <span className='productSizePrice'>Talle: {item.size || 'N/A'} / ${item.price} x {item.quantity}</span>
                                        </section>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                </section>
            </div>
        </section>
    );
};