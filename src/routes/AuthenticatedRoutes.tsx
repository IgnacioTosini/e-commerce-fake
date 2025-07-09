import { Route, Routes } from "react-router";
import { HomePage } from "../pages/HomePage/HomePage";
import { OffersPage } from "../pages/OffersPage/OffersPage";
import { ProductPage } from "../pages/ProductPage/ProductPage";
import { ProductsPage } from "../pages/ProductsPage/ProductsPage";
import { PaymentSuccess } from "../pages/PaymentSuccess/PaymentSuccess";
import { PaymentFailure } from "../pages/PaymentFailure/PaymentFailure";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { ProfileRoutes } from "./ProfileRoutes";
import { AdminRoutes } from "./AdminRoutes";

export const AuthenticatedRoutes = () => {
    const { status } = useCheckAuth();
    return (
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
    )
};
