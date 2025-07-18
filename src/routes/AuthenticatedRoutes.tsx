import { Route, Routes } from "react-router";
import { Suspense, lazy } from "react";
import { useCheckAuth } from "../hooks/useCheckAuth";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const OffersPage = lazy(() => import("../pages/OffersPage/OffersPage"));
const ProductPage = lazy(() => import("../pages/ProductPage/ProductPage"));
const ProductsPage = lazy(() => import("../pages/ProductsPage/ProductsPage"));
const PaymentSuccess = lazy(() => import("../pages/PaymentSuccess/PaymentSuccess"));
const PaymentFailure = lazy(() => import("../pages/PaymentFailure/PaymentFailure"));
const ProfileRoutes = lazy(() => import("./ProfileRoutes"));
const AdminRoutes = lazy(() => import("./AdminRoutes"));

export const AuthenticatedRoutes = () => {
    const { status } = useCheckAuth();
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <Routes>
                {/* Payment Routes - Available to all */}
                <Route path="/pago/exito" element={<PaymentSuccess />} />
                <Route path="/pago/fallo" element={<PaymentFailure />} />

                {/* Public Routes */}
                {status === 'authenticated' ? (
                    <>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/ofertas" element={<OffersPage />} />
                        <Route path="/productos" element={<ProductsPage />} />
                        <Route path="/productos/:id" element={<ProductPage />} />
                        <Route path="/perfil/*" element={<ProfileRoutes />} />
                        <Route path="/admin/*" element={<AdminRoutes />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/ofertas" element={<OffersPage />} />
                        <Route path="/productos" element={<ProductsPage />} />
                        <Route path="/productos/:id" element={<ProductPage />} />
                    </>
                )}
            </Routes>
        </Suspense>
    )
};

export default AuthenticatedRoutes;
