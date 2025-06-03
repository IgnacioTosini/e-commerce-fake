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
                    <Route path="/perfil" element={<AccountPage />} />
                    <Route path="/carrito" element={<CartPage />} />
                </Routes>
            </div>
        </Suspense>
    );
};
