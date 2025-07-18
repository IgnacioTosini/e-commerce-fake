import { Suspense, useEffect, useRef, lazy } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { fadeInUp } from "../hooks/gsapEffects";
const CheckingAuth = lazy(() => import("../components/ui/CheckingAuth/CheckingAuth"));
import { useCheckAuth } from "../hooks/useCheckAuth";
const AuthenticatedRoutes = lazy(() => import("./AuthenticatedRoutes"));
const UnauthenticatedRoutes = lazy(() => import("./UnauthenticatedRoutes"));
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingProducts } from '../store/products/thunks';
import type { AppDispatch, RootState } from "../store/store";
import { loadUserData, loadUserFavorites, startLoadUsers } from "../store/user/thunks";
import { loadUserCart } from "../store/cart/thunks";
import { loadUserOrders } from "../store/orders/thunks";

export const AppRouter = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const pageRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const { status } = useCheckAuth();
    const authState = useSelector((state: RootState) => state.auth);

    // Ref para guardar el último UID procesado
    const lastLoadedUid = useRef<string | null>(null);

    // 1. Cargar productos al inicializar (solo una vez)
    useEffect(() => {
        dispatch(startLoadingProducts());
    }, [dispatch]);

    // 2. Manejar autenticación y carga de datos del usuario
    useEffect(() => {
        if (authState.status === 'authenticated' && authState.uid &&
            authState.uid !== lastLoadedUid.current) {

            // Cargar datos específicos del usuario autenticado
            dispatch(loadUserData(authState.uid));
            dispatch(loadUserCart(authState.uid));
            dispatch(loadUserOrders(authState.uid));
            dispatch(loadUserFavorites(authState.uid));

            lastLoadedUid.current = authState.uid;
        }
    }, [authState.status, authState.uid, dispatch]);

    // 3. Cargar lista general de usuarios (solo para admins)
    useEffect(() => {
        if (authState.status === 'authenticated') {
            dispatch(startLoadUsers());
        }
    }, [authState.status, dispatch]);

    // 4. Limpiar cuando se desautentica
    useEffect(() => {
        if (authState.status !== 'authenticated') {
            lastLoadedUid.current = null;
        }
    }, [authState.status]);

    // 5. Animación de página (independiente de la lógica de negocio)
    useEffect(() => {
        if (pageRef.current) {
            fadeInUp(pageRef.current, 0.15);
        }
    }, [location]);

    // 6. Redirección para usuarios autenticados
    useEffect(() => {
        if (status === 'authenticated' && location.pathname.startsWith('/auth')) {
            navigate('/');
            toast.success('Ya has iniciado sesión. Redirigiendo a la página principal.');
        }
    }, [status, location.pathname, navigate]);

    if (status === 'checking') {
        return <CheckingAuth />;
    }

    return (
        <Suspense fallback={null}>
            <div ref={pageRef}>
                <Routes>
                    {
                        status === 'authenticated' ? (
                            <Route path="/*" element={<AuthenticatedRoutes />} />
                        ) : (
                            <>
                                <Route path="/auth/*" element={<UnauthenticatedRoutes />} />
                                <Route path="/*" element={<AuthenticatedRoutes />} />
                            </>
                        )
                    }
                </Routes>
            </div>
        </Suspense>
    );
};
