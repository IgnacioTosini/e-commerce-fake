import { Route, Routes } from "react-router";
import { Suspense, lazy } from "react";
import { AdminLayout } from "../components/Layout/AdminLayout/AdminLayout";

const AdminPanelPage = lazy(() => import("../pages/AdminPanelPage/AdminPanelPage"));
const DynamicList = lazy(() => import("../components/Admin/DynamicList/DynamicList"));
const ProductViewPage = lazy(() => import("../pages/ProductViewPage/[id]"));
const UserViewPage = lazy(() => import("../pages/UserViewPage/[id]"));
const UserEditPage = lazy(() => import("../pages/UserEditPage/UserEditPage"));
const ProductEditPage = lazy(() => import("../pages/ProductEditPage/ProductEditPage"));
const ProductNewPage = lazy(() => import("../pages/ProductNewPage/ProductNewPage"));
const OrderPage = lazy(() => import("../pages/OrderPage/[id]"));

export const AdminRoutes = () => {
    return (
        <Suspense fallback={<AdminLayout><div>Cargando...</div></AdminLayout>}>
            <Routes>
                {/* Admin Routes */}
                <Route path="/admin-panel" element={<AdminLayout><AdminPanelPage /></AdminLayout>} />
                <Route path="/:category" element={<AdminLayout><DynamicList /></AdminLayout>} />
                <Route path="/productos/:id" element={<AdminLayout><ProductViewPage /></AdminLayout>} />
                <Route path="/usuarios/:id" element={<AdminLayout><UserViewPage /></AdminLayout>} />
                <Route path="/usuarios/:userId/editar" element={<AdminLayout><UserEditPage /></AdminLayout>} />
                <Route path="/productos/:id/editar" element={<AdminLayout><ProductEditPage /></AdminLayout>} />
                <Route path="/productos/nuevo" element={<AdminLayout><ProductNewPage /></AdminLayout>} />
                <Route path="/pedidos/:id" element={<AdminLayout><OrderPage /></AdminLayout>} />
                <Route path="*" element={<AdminLayout><div>404 Not Found</div></AdminLayout>} />
            </Routes>
        </Suspense>
    )
};

export default AdminRoutes;
