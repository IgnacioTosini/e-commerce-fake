import { Suspense, useRef } from "react";
import { Route, Routes } from "react-router";
import { useGsapFadeInUp } from "../hooks/useGsapFadeInUp";
import { HomePage } from "../pages/HomePage/HomePage";
import { OffersPage } from "../pages/OffersPage/OffersPage";

export const AppRouter = () => {
    const pageRef = useRef<HTMLDivElement | null>(null);

    useGsapFadeInUp(pageRef, 0);

    return (
        <Suspense fallback>
            <div ref={pageRef}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/ofertas" element={<OffersPage />} />
                </Routes>
            </div>
        </Suspense>
    );
};
