import { useNavigate, useParams } from 'react-router';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { mockOrders } from '../../utils/mockOrders';
import { OrderStatusCard } from '../../components/ui/OrderStatusCard/OrderStatusCard';
import { mockProducts } from '../../utils/mockProducts';
import './_orderPage.scss';

export const OrderPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const order = mockOrders.find(order => order.id === id);

    const products = order?.items.map(item => {
        const product = mockProducts.find(p => p.id === item.productId);
        return {
            ...product,
            quantity: item.quantity,
            size: item.size,
        };
    }) || [];

    if (!order) {
        return <p>Pedido no encontrado</p>;
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
                            {products.map(product => (
                                <li key={product.id}>
                                    <img src={product.images?.[0]} alt={product.title} />
                                    <section className='orderPageProductInfo'>
                                        <span className='orderPageProductTitle'>{product.title}</span>
                                        <span className='productSizePrice'>Talle: {product.size || 'N/A'} / ${product.price} x {product.quantity}</span>
                                    </section>
                                </li>
                            ))}
                        </ul>
                    </section>
                </section>
            </div>
        </section>
    );
};