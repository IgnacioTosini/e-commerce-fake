import { Route, Routes } from "react-router";
import { Suspense, lazy } from "react";

const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));

export const UnauthenticatedRoutes = () => (
    <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    </Suspense>
);

export default UnauthenticatedRoutes;
