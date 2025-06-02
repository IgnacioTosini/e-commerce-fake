import { Suspense, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router";
import { HomePage } from "../pages/HomePage/HomePage";
import { OffersPage } from "../pages/OffersPage/OffersPage";
import { ProductPage } from "../pages/ProductPage/ProductPage";
import { ProductsPage } from "../pages/ProductsPage/ProductsPage";
import { WishListPage } from "../pages/WishListPage/WishListPage";
import { fadeInUp } from "../hooks/gsapEffects";

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
                </Routes>
            </div>
        </Suspense>
    );
};
