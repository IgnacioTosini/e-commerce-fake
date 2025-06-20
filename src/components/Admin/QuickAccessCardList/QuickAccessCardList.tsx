import { QuickAccessCard } from '../QuickAccessCard/QuickAccessCard'
import './_quickAccessCardList.scss'

export const QuickAccessCardList = () => {
    return (
        <div className='adminPanelPageQuickAccess'>
            <QuickAccessCard
                title="Usuarios"
                description="Gestionar usuarios."
                link="/admin/usuarios"
                icon="users"
                total={100}
                subTitle="Usuarios registrados"
            />
            <QuickAccessCard
                title="Pedidos"
                description="Gestionar pedidos."
                link="/admin/ordenes"
                icon="orders"
                total={50}
                subTitle="Total de pedidos"
            />
            <QuickAccessCard
                title="Productos"
                description="Control de Stock."
                link="/admin/productos"
                icon="products"
                total={200}
                subTitle="Total de productos"
            />
        </div>
    )
}
