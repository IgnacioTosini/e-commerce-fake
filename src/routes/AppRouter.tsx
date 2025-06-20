import { Suspense, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router";
import { HomePage } from "../pages/HomePage/HomePage";
import { OffersPage } from "../pages/OffersPage/OffersPage";
import { ProductPage } from "../pages/ProductPage/ProductPage";
import { ProductsPage } from "../pages/ProductsPage/ProductsPage";
import { WishListPage } from "../pages/WishListPage/WishListPage";
import { fadeInUp } from "../hooks/gsapEffects";
import { AccountPage } from "../pages/AccountPage/AccountPage";
import { CartPage } from "../pages/CartPage/CartPage";
import { OrdersPage } from "../pages/OrdersPage/OrdersPage";
import { OrderPage } from "../pages/OrderPage/[id]";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { AdminPanelPage } from "../pages/AdminPanelPage/AdminPanelPage";
import { AdminLayout } from "../components/Layout/AdminLayout/AdminLayout";
import { DynamicList } from "../components/Admin/DynamicList/DynamicList";
import { ProductViewPage } from "../pages/ProductViewPage/[id]";
import { UserViewPage } from "../pages/UserViewPage/[id]";
import { UserEditPage } from "../pages/UserEditPage/UserEditPage";
import { ProductEditPage } from "../pages/ProductEditPage/ProductEditPage";

export const AppRouter = () => {
    const pageRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (pageRef.current) {
            fadeInUp(pageRef.current, 0.15);
        }
    }, [location]);

    return (
        <Suspense fallback>
            <div ref={pageRef}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/ofertas" element={<OffersPage />} />
                    <Route path="/productos" element={<ProductsPage />} />
                    <Route path="/productos/:id" element={<ProductPage />} />
                    <Route path="/lista-deseos" element={<WishListPage />} />
                    <Route path="/carrito" element={<CartPage />} />
                    <Route path="/perfil" element={<AccountPage />} />
                    <Route path="/perfil/mis-pedidos" element={<OrdersPage />} />
                    <Route path="/perfil/mis-pedidos/:id" element={<OrderPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    {/* Admin Routes */}
                    <Route path="/admin/admin-panel" element={<AdminLayout><AdminPanelPage /></AdminLayout>} />
                    <Route path="/admin/:category" element={<AdminLayout><DynamicList /></AdminLayout>} />
                    <Route path="/admin/productos/:id" element={<AdminLayout><ProductViewPage /></AdminLayout>} />
                    <Route path="/admin/usuarios/:id" element={<AdminLayout><UserViewPage /></AdminLayout>} />
                    <Route path="/admin/usuarios/:id/editar" element={<AdminLayout><UserEditPage /></AdminLayout>} />
                    <Route path="/admin/productos/:id/editar" element={<AdminLayout><ProductEditPage /></AdminLayout>} />
                </Routes>
            </div>
        </Suspense>
    );
};
