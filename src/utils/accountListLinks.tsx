import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";

export const icons: Record<string, { icon: React.ReactNode; path: string; name: string }> = {
    user: { icon: <MdOutlinePerson />, path: '/perfil', name: 'Perfil' },
    cart: {
        icon: <AiOutlineShoppingCart />, path: '/perfil/carrito/:id', name: 'Carrito'
    },
    heart: {
        icon: <FaRegHeart />, path: '/perfil/lista-deseos/:id', name: 'Favoritos'
    },
};
