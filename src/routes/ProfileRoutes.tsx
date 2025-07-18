import { Route, Routes } from "react-router";
import { Suspense, lazy } from "react";

const WishListPage = lazy(() => import("../pages/WishListPage/WishListPage"));
const AccountPage = lazy(() => import("../pages/AccountPage/AccountPage"));
const CartPage = lazy(() => import("../pages/CartPage/CartPage"));
const OrdersPage = lazy(() => import("../pages/OrdersPage/OrdersPage"));
const OrderPage = lazy(() => import("../pages/OrderPage/[id]"));
const UserEditPage = lazy(() => import("../pages/UserEditPage/UserEditPage"));

export const ProfileRoutes = () => {
    return (
        <Suspense fallback={null}>
            <Routes>
                <Route path="/" element={<AccountPage />} />
                <Route path="/datos-personales/:userId" element={<UserEditPage />} />
                <Route path="/lista-deseos/:id" element={<WishListPage />} />
                <Route path="/carrito/:id" element={<CartPage />} />
                <Route path="/mis-pedidos/:id" element={<OrdersPage />} />
                <Route path="/mis-pedidos/:userId/:id" element={<OrderPage />} />
            </Routes>
        </Suspense>
    )
};

export default ProfileRoutes;
