import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";

export const icons: Record<string, { icon: React.ReactNode; path: string; name: string }> = {
    cart: {
        icon: <AiOutlineShoppingCart />, path: '/carrito', name: 'Carrito'
    },
    user: { icon: <MdOutlinePerson />, path: '/perfil', name: 'Perfil' },
    heart: {
        icon: <FaRegHeart />, path: '/lista-deseos', name: 'Favoritos'
    },
};