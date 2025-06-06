import { mockCartItems } from '../../../utils/mockCartItems';
import './_orderSummary.scss'

export const OrderSummary = () => {
    const subtotal = mockCartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discount = mockCartItems.reduce((acc, item) => acc + (item.product.discount ? (item.product.price * item.product.discount / 100) * item.quantity : 0), 0);
    const total = subtotal - discount;

    return (
        <div className='orderSummary'>
            <h2 className='orderSummaryTitle'>Resumen de la Orden</h2>
            <section className='orderSummaryContent'>
                <p className='orderSummarySubtotal'>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
                <p className='orderSummaryDiscount'>Descuento: <span>- ${discount.toFixed(2)}</span></p>
                <p className='orderSummaryTotal'>Total: <span>${total.toFixed(2)}</span></p>
            </section>
            <button className='orderSummaryCheckoutButton'>Proceder al Pago</button>
        </div>
    );
};
