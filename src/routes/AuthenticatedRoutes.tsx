import { Route, Routes, Navigate } from "react-router";
import { Suspense, lazy } from "react";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { toast } from "react-toastify";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const OffersPage = lazy(() => import("../pages/OffersPage/OffersPage"));
const ProductPage = lazy(() => import("../pages/ProductPage/ProductPage"));
const ProductsPage = lazy(() => import("../pages/ProductsPage/ProductsPage"));
const PaymentSuccess = lazy(() => import("../pages/PaymentSuccess/PaymentSuccess"));
const PaymentFailure = lazy(() => import("../pages/PaymentFailure/PaymentFailure"));
const ProfileRoutes = lazy(() => import("./ProfileRoutes"));
const AdminRoutes = lazy(() => import("./AdminRoutes"));

// Componente para proteger rutas privadas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { status } = useCheckAuth();

    // Mientras se verifica el estado de autenticación, mostrar loading
    if (status === 'checking') {
        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            fontSize: '1.2rem'
        }}>
            Verificando acceso...
        </div>;
    }

    // Si no está autenticado, redirigir inmediatamente
    if (status !== 'authenticated') {
        toast.error('Debes iniciar sesión para acceder a esta página');
        return <Navigate to="/auth/login" replace />;
    }

    // Si está autenticado, mostrar el contenido
    return <>{children}</>;
};

export const AuthenticatedRoutes = () => {
    return (
        <Suspense fallback={null}>
            <Routes>
                {/* Payment Routes - Available to all */}
                <Route path="/pago/exito" element={<PaymentSuccess />} />
                <Route path="/pago/fallo" element={<PaymentFailure />} />

                {/* Public Routes - Available to everyone */}
                <Route path="/" element={<HomePage />} />
                <Route path="/ofertas" element={<OffersPage />} />
                <Route path="/productos" element={<ProductsPage />} />
                <Route path="/productos/:id" element={<ProductPage />} />

                {/* Protected Routes - Only for authenticated users */}
                <Route
                    path="/perfil/*"
                    element={
                        <ProtectedRoute>
                            <ProfileRoutes />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute>
                            <AdminRoutes />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Suspense>
    )
};

export default AuthenticatedRoutes;
