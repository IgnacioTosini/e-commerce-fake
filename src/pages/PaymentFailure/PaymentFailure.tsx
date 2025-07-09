import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import type { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import './_paymentFailure.scss';

export const PaymentFailure = () => {
    const { uid } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        toast.error('El pago no pudo ser procesado. Por favor intenta nuevamente.');
    }, []);

    return (
        <div className="paymentFailurePage">
            <div className="paymentFailurePageContainer">
                <div className="paymentFailureIcon">❌</div>
                <h1 className="paymentFailureTitle">Pago Falló</h1>
                <p className="paymentFailureMessage">
                    Hubo un problema procesando tu pago. Por favor intenta nuevamente.
                </p>
                <button
                    onClick={() => navigate(`/perfil/carrito/${uid}`)}
                    className="paymentFailureButton"
                >
                    Volver al Carrito
                </button>
            </div>
        </div>
    );
};
