import React from "react";
import { Link } from "react-router";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlinePerson } from "react-icons/md";
import { useFavorites } from "../../context/useFavorites";
import { useCart } from "../../context/useCart";
import { Badge } from "../Badge/Badge";
import './_customIcon.scss'

type CustomIconProps = {
    typeOfIcon: string;
}

export const CustomIcon = ({ typeOfIcon }: CustomIconProps) => {
    const { favorites } = useFavorites();
    const { cart } = useCart();

    const icons: Record<string, { icon: React.ReactNode; path: string }> = {
        cart: { icon: <AiOutlineShoppingCart />, path: '/carrito' },
        user: { icon: <MdOutlinePerson />, path: '/perfil' },
        heart: { icon: <FaRegHeart />, path: '/lista-deseos' },
    };
    return (
        <Link to={icons[typeOfIcon]?.path || '/'} className={`customIcon ${typeOfIcon}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {
                typeOfIcon === 'heart' && favorites.length > 0 &&
                <Badge>
                    {favorites.length > 0 && typeOfIcon === 'heart' ? favorites.length : ''}
                </Badge>
            }
            {
                typeOfIcon === 'cart' && cart.length > 0 &&
                <Badge>
                    {cart.length > 0 && typeOfIcon === 'cart' ? cart.length : ''}
                </Badge>
            }
            {icons[typeOfIcon]?.icon || <span>❓</span>}
        </Link>
    )
}
