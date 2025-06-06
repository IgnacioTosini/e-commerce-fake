import { useEffect, useRef, useState } from 'react'
import type { CartItem } from '../../../types'
import { BiTrash } from 'react-icons/bi'
import { Counter } from '../../ui/Counter/Counter'
import { useLocation } from 'react-router'
import { animateElements } from '../../../hooks/gsapEffects'
import './_cartItemCard.scss'

type CartItemCardProps = {
    cartItem: CartItem
}

export const CartItemCard = ({ cartItem }: CartItemCardProps) => {
    const [quantity, setQuantity] = useState(cartItem.quantity);
    const priceDiscount = cartItem.product.price * (1 - (cartItem.product.discount || 0) / 100);
    const cartItemCardRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (cartItemCardRef.current) {
            const elements = Array.from(cartItemCardRef.current.querySelectorAll('.cartItemCardImage, .cartItemCardDetailsContainer, .cartItemCardDetails, .cartItemCardInfo > *'));
            animateElements(elements as HTMLElement[], 0.5, 0.2, 30);
        }
    }, [location]);

    return (
        <div className='cartItemCard' ref={cartItemCardRef}>
            <img
                src={cartItem.product.images[0]}
                alt={cartItem.product.title}
                className='cartItemCardImage'
            />
            <section className='cartItemCardDetailsContainer'>
                <section className='cartItemCardDetails'>
                    <section className='cartItemCardInfo'>
                        <h2 className='cartItemCardTitle'>{cartItem.product.title}</h2>
                        <span className='cartItemCardDescription'>Color: {cartItem.color || 'N/A'} • Talla: {cartItem.size || 'N/A'}</span>
                    </section>
                    <section className='cartItemCardPriceContainer'>
                        <span className='cartItemCardPrice'>{cartItem.product.discount && `$${priceDiscount.toFixed(2)}`}</span>
                        <span className={cartItem.product.discount ? 'cartItemCardPrice discount' : 'cartItemCardPrice'}>${cartItem.product.price.toFixed(2)}</span>
                    </section>
                </section>
                <section className='cartItemCardActions'>
                    <Counter stock={cartItem.product.stock} onChange={setQuantity} prevCant={quantity} />
                    <button className='cartItemCardRemoveButton' onClick={() => alert('Producto eliminado del carrito')}>
                        <BiTrash />
                        Eliminar
                    </button>
                </section>
            </section>
        </div>
    )
}
