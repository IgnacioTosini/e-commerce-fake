import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { updateOrderStatus } from '../../store/orders/thunks';
import { startClearCart } from '../../store/cart/thunks';
import { toast } from 'react-toastify';
import './_paymentSuccess.scss';

export const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const paymentId = searchParams.get('payment_id');
        const status = searchParams.get('status');
        const externalReference = searchParams.get('external_reference');

        console.log('🎉 Pago procesado:', { paymentId, status, externalReference });

        // Actualizar estado de la orden
        if (externalReference) {
            if (status === 'approved' && paymentId) {
                // Pago exitoso
                dispatch(updateOrderStatus({
                    orderId: externalReference,
                    status: 'paid',
                    paymentDetails: `Pago ID: ${paymentId}`
                }));

                // Limpiar el carrito solo si el pago fue exitoso
                if (user?.id) {
                    dispatch(startClearCart(user.id));
                }

                toast.success('¡Pago exitoso! Tu pedido ha sido confirmado.');
            } else {
                // No vaciar el carrito si el pago no fue exitoso
                dispatch(updateOrderStatus({
                    orderId: externalReference,
                    status: status === 'pending' ? 'pending' : 'failed',
                    paymentDetails: `Pago ${status} ID: ${paymentId}`
                }));
                toast.info('Tu pago está siendo procesado o fue rechazado.');
            }
        }

        // Redirigir después de 3 segundos
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, [searchParams, navigate, dispatch, user?.id]);

    return (
        <div className="paymentSuccessPage">
            <div className="paymentSuccessPageContainer">
                <div className="paymentSuccessIcon">✅</div>
                <h1 className="paymentSuccessTitle">¡Pago Exitoso!</h1>
                <p className="paymentSuccessMessage">Tu pedido ha sido procesado correctamente.</p>
                <p className="paymentSuccessRedirect">Redirigiendo a la página principal...</p>
                <button
                    onClick={() => navigate('/')}
                    className="paymentSuccessButton"
                >
                    Ir al Inicio
                </button>
            </div>
        </div>
    );
};
