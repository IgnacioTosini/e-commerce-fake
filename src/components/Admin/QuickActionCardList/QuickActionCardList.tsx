import { QuickActionCard } from '../QuickActionCard/QuickActionCard'
import './_quickActionCardList.scss'

export const QuickActionCardList = () => {
    return (
        <div className='adminPanelPageQuickActions'>
            <QuickActionCard
                title="Usuarios"
                icon="users"
                links={[{ text: 'Ver Usuarios', url: '/admin/usuarios' }, { text: 'Añadir Usuario', url: '/admin/usuarios/nuevo' }]}
            />
            <QuickActionCard
                title="Productos"
                icon="products"
                links={[{ text: 'Ver Productos', url: '/admin/productos' }, { text: 'Añadir Producto', url: '/admin/productos/nuevo' }]}
            />
            <QuickActionCard
                title="Pedidos"
                icon="orders"
                links={[{ text: 'Ver Pedidos', url: '/admin/ordenes' }, { text: 'Añadir Pedido', url: '/admin/ordenes/nuevo' }]}
            />
        </div>
    )
}
