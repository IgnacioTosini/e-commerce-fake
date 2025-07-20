
import { Link } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { Badge } from "../Badge/Badge";
import { icons } from "../../../utils/accountListLinks";
import './_customIcon.scss'

type CustomIconProps = {
    typeOfIcon: string;
}

export const CustomIcon = ({ typeOfIcon }: CustomIconProps) => {
    const { favorites, user: { id: userId } } = useSelector((state: RootState) => state.user);
    const { cart } = useSelector((state: RootState) => state.cart);
    const { status } = useSelector((state: RootState) => state.auth);

    // Si el usuario no está autenticado y es un icono que requiere autenticación
    const requiresAuth = typeOfIcon === 'cart' || typeOfIcon === 'heart';

    // Reemplazar ':id' por el id del usuario si existe
    const iconPath = icons[typeOfIcon]?.path || '/';
    let finalPath = iconPath;

    if (requiresAuth) {
        if (status !== 'authenticated' || !userId) {
            // Si no está autenticado, redirigir al login
            finalPath = '/auth/login';
        } else {
            // Si está autenticado, usar su ID
            finalPath = iconPath.replace(':id', userId);
        }
    }

    return (
        <Link to={finalPath} className={`customIcon ${typeOfIcon}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {typeOfIcon === 'heart' && favorites.length > 0 && (
                <Badge>{favorites.length}</Badge>
            )}
            {typeOfIcon === 'cart' && cart.items.length > 0 && (
                <Badge>{cart.items.length}</Badge>
            )}
            {icons[typeOfIcon]?.icon || <span>❓</span>}
        </Link>
    );
}