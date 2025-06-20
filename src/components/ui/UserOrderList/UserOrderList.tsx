import type { Order } from '../../../types'
import { OrderStatusCard } from '../OrderStatusCard/OrderStatusCard';
import './_userOrderList.scss'

type UserOrderListProps = {
    orders: Order[] | null | undefined;
}

export const UserOrderList = ({ orders }: UserOrderListProps) => {
    return (
        <div className='userOrderList'>
            <h2 className='userOrderListTitle'>Pedidos</h2>
            <section className='userOrderListContainer'>
                {orders && orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.id} className='userOrderListItem'>
                            <section className='userOrderListItemDetails'>
                                <span className='userOrderListItemId'>{order.id}</span>
                                <span className='userOrderListItemDate'>{order.updatedAt}</span>
                            </section>
                            <section className='userOrderListItemDetails'>
                                <span className='userOrderListItemTotal'>$ {order.total}</span>
                                <OrderStatusCard order={order} />
                            </section>
                        </div>
                    ))
                ) : (
                    <div className='userOrderListEmpty'>No hay pedidos</div>
                )}
            </section>
        </div>
    )
}
