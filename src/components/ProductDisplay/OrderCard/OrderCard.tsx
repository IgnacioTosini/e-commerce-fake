import type { Order } from '../../../types'
import { CustomButton } from '../../ui/CustomButton/CustomButton'
import { OrderStatusCard } from '../../ui/OrderStatusCard/OrderStatusCard'
import './_orderCard.scss'

type OrderCardProps = {
    order: Order
}

export const OrderCard = ({ order }: OrderCardProps) => {
    if (!order) {
        return <div className='orderCard'>No hay pedidos disponibles.</div>
    }
    return (
        <div className='orderCard'>
            <div className='orderCardHeader'>
                <section className='orderCardHeaderInfo'>
                    <h2 className='orderCardTitle'>Pedido #{order.id}</h2>
                    <p className='orderCardDate'>Pedido realizado el {new Date(order.createdAt).toLocaleDateString()}</p>
                </section>
                <OrderStatusCard order={order} />
            </div>
            <div className='orderCardBody'>
                <p className='orderCardItemsInfo'>{order.items.length} artículo{order.items.length !== 1 ? 's' : ''} • Total: ${order.total.toFixed(2)}</p>
                <CustomButton color='tertiary' className='orderCardDetailsButton' onClick={() => window.location.href = `/perfil/mis-pedidos/${order.user.id}/${order.id}`}>
                    Ver detalles
                </CustomButton>
            </div>
        </div>
    )
}
