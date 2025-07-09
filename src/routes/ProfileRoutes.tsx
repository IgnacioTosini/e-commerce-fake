import { Route, Routes } from "react-router";
import { WishListPage } from "../pages/WishListPage/WishListPage";
import { AccountPage } from "../pages/AccountPage/AccountPage";
import { CartPage } from "../pages/CartPage/CartPage";
import { OrdersPage } from "../pages/OrdersPage/OrdersPage";
import { OrderPage } from "../pages/OrderPage/[id]";
import { UserEditPage } from "../pages/UserEditPage/UserEditPage";

export const ProfileRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AccountPage />} />
            <Route path="/datos-personales/:userId" element={<UserEditPage />} />
            <Route path="/lista-deseos/:id" element={<WishListPage />} />
            <Route path="/carrito/:id" element={<CartPage />} />
            <Route path="/mis-pedidos/:id" element={<OrdersPage />} />
            <Route path="/mis-pedidos/:userId/:id" element={<OrderPage />} />
        </Routes>
    )
};
