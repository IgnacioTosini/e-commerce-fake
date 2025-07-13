import type { Order } from '../../../types'
import './_orderStatusCard.scss'

type OrderStatusCardProps = {
    order: Order
}

export const OrderStatusCard = ({ order }: OrderStatusCardProps) => {
    const statusNames: Record<string, string> = {
        'pending': 'Pendiente',
        'shipped': 'Enviado',
        'paid': 'Pagado',
        'delivered': 'En Camino',
        'cancelled': 'Cancelado',
    }

    return (
        <span className={`orderCardStatus ${order.status}`}>{statusNames[order.status]}</span>
    )
}
