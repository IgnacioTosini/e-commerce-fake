import { useSelector } from 'react-redux'
import { QuickAccessCard } from '../QuickAccessCard/QuickAccessCard'
import './_quickAccessCardList.scss'
import type { RootState } from '../../../store/store'

export const QuickAccessCardList = () => {
    const { user, orders, products } = useSelector((state: RootState) => state)
    return (
        <div className='adminPanelPageQuickAccess'>
            <QuickAccessCard
                title="Usuarios"
                description="Gestionar usuarios."
                link="/admin/usuarios"
                icon="users"
                total={user.users.length}
                subTitle="Usuarios registrados"
            />
            <QuickAccessCard
                title="Pedidos"
                description="Gestionar pedidos."
                link="/admin/pedidos"
                icon="orders"
                total={orders.orders.length}
                subTitle="Total de pedidos"
            />
            <QuickAccessCard
                title="Productos"
                description="Control de Stock."
                link="/admin/productos"
                icon="products"
                total={products.products.length}
                subTitle="Total de productos"
            />
        </div>
    )
}
