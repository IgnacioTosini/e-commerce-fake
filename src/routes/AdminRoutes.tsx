import { Route, Routes } from "react-router";
import { AdminPanelPage } from "../pages/AdminPanelPage/AdminPanelPage";
import { AdminLayout } from "../components/Layout/AdminLayout/AdminLayout";
import { DynamicList } from "../components/Admin/DynamicList/DynamicList";
import { ProductViewPage } from "../pages/ProductViewPage/[id]";
import { UserViewPage } from "../pages/UserViewPage/[id]";
import { UserEditPage } from "../pages/UserEditPage/UserEditPage";
import { ProductEditPage } from "../pages/ProductEditPage/ProductEditPage";
import { ProductNewPage } from "../pages/ProductNewPage/ProductNewPage";
import { OrderPage } from "../pages/OrderPage/[id]";

export const AdminRoutes = () => {
    return (
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
    )
};
