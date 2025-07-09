import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { CartItem } from '../../../types'
import type { AppDispatch, RootState } from '../../../store/store'
import { BiTrash } from 'react-icons/bi'
import { Counter } from '../../ui/Counter/Counter'
import { useLocation } from 'react-router'
import { animateElements } from '../../../hooks/gsapEffects'
import { startRemoveFromCart, startUpdateCartItemQuantity } from '../../../store/cart/thunks'
import './_cartItemCard.scss'

type CartItemCardProps = {
    cartItem: CartItem
}

export const CartItemCard = ({ cartItem }: CartItemCardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { uid } = useSelector((state: RootState) => state.auth);
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

    // Actualizar Redux cuando cambie la cantidad
    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);

        if (uid) {
            dispatch(startUpdateCartItemQuantity(
                uid,
                cartItem.product.id,
                newQuantity,
                cartItem.size,
                cartItem.color
            ));
        }
    };

    // Eliminar producto del carrito
    const handleRemoveItem = () => {
        if (uid) {
            dispatch(startRemoveFromCart(
                uid,
                cartItem.product.id,
                cartItem.size,
                cartItem.color
            ));
        }
    };

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
                    <Counter
                        stock={cartItem.product.stock}
                        onChange={handleQuantityChange}
                        prevCant={quantity}
                    />
                    <button className='cartItemCardRemoveButton' onClick={handleRemoveItem}>
                        <BiTrash />
                        Eliminar
                    </button>
                </section>
            </section>
        </div>
    )
}