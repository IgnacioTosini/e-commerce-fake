import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { type AppDispatch, type RootState } from '../../../store/store';
import type { OrderItem } from '../../../types';
import { createOrderAndInitiatePayment } from '../../../store/orders/thunks';
import { clearCheckoutUrl } from '../../../store/orders/ordersSlice';
import { startClearCart } from '../../../store/cart/thunks';
import { toast } from 'react-toastify';
import { MercadoPagoTestInfo } from '../MercadoPagoTestInfo/MercadoPagoTestInfo';
import './_orderSummary.scss'

export const OrderSummary = () => {
    const { cart } = useSelector((state: RootState) => state.cart);
    const { user } = useSelector((state: RootState) => state.user);
    const { loading, checkoutUrl } = useSelector((state: RootState) => state.orders);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const isUserDataComplete = useMemo(() => {
        return user && user.email && user.name && user.phone && user.address;
    }, [user]);

    const { subtotal, discount, total } = useMemo(() => {
        if (!cart || cart.items.length === 0) {
            return { subtotal: 0, discount: 0, total: 0 };
        }

        const calculatedSubtotal = cart.items.reduce((acc: number, item: { product: { price: number }; quantity: number }) => {
            return acc + (item.product.price * item.quantity);
        }, 0);

        const calculatedDiscount = cart.items.reduce((acc: number, item) => {
            const discount = item.product.discount ?? 0;
            if (discount) {
                const discountAmount = (item.product.price * discount / 100) * item.quantity;
                return acc + discountAmount;
            }
            return acc;
        }, 0);

        const calculatedTotal = calculatedSubtotal - calculatedDiscount;

        return {
            subtotal: calculatedSubtotal,
            discount: calculatedDiscount,
            total: calculatedTotal
        };
    }, [cart]);

    // Efecto para redirigir a MercadoPago cuando se obtiene la URL
    useEffect(() => {
        if (checkoutUrl) {
            toast.success('Redirigiendo a MercadoPago...');

            // Abrir MercadoPago en nueva ventana
            window.open(checkoutUrl, '_blank');

            if (checkoutUrl) {
                dispatch(clearCheckoutUrl());
            }
        }

    }, [checkoutUrl, dispatch, navigate]);

    const handleCheckout = async () => {
        console.log('Iniciando proceso de checkout...');
        if (!isUserDataComplete) {
            toast.error('Por favor completa tus datos personales antes de proceder al pago');
            return;
        }

        if (!cart || cart.items.length === 0) {
            toast.error('Tu carrito está vacío');
            return;
        }

        try {
            toast.info('Procesando orden...');
            // Crear los items para la orden
            const items: OrderItem[] = cart.items.map(item => ({
                productId: item.product.id,
                userId: user.id,
                title: item.product.title,
                images: item.product.images,
                price: item.product.price,
                quantity: item.quantity,
                size: item.variant.size,
                color: item.variant.color
            }));

            const orderData = {
                userId: user.id,
                user,
                items,
                total,
                status: 'pending' as const,
                shippingAddress: user.address || '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            // Dispatch para crear la orden e iniciar el pago
            await dispatch(createOrderAndInitiatePayment({
                orderData,
                userEmail: user.email,
                userName: user.name || 'Usuario'
            })).unwrap();

            // Limpiar el carrito después de crear la orden
            dispatch(startClearCart(user.id));

        } catch (error) {
            console.error('Error al procesar el pago:', error);
            toast.error('Error al procesar el pago. Por favor intenta nuevamente.');
        }
    };

    return (
        <div className='orderSummary'>
            <h2 className='orderSummaryTitle'>Resumen de la Orden</h2>
            <section className='orderSummaryContent'>
                <p className='orderSummarySubtotal'>
                    Subtotal: <span>${subtotal.toFixed(2)}</span>
                </p>
                <p className='orderSummaryDiscount'>
                    Descuento: <span>- ${discount.toFixed(2)}</span>
                </p>
                <p className='orderSummaryTotal'>
                    Total: <span>${total.toFixed(2)}</span>
                </p>
            </section>

            {/* Info de prueba MercadoPago solo en desarrollo */}
            <MercadoPagoTestInfo />

            {!isUserDataComplete && (
                <div className='orderSummaryWarning'>
                    <p>⚠️ Completa tus datos personales para continuar</p>
                </div>
            )}

            <button
                className={cart.items.length > 0 ? 'orderSummaryCheckoutButton' : 'orderSummaryCheckoutButton disabled'}
                onClick={handleCheckout}
                disabled={!isUserDataComplete || cart.items.length === 0 || loading}
            >
                {loading ? 'Procesando...' : 'Proceder al Pago'}
            </button>
        </div>
    );
};