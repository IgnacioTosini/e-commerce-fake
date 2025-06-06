import { Link } from "react-router";
import { useFavorites } from "../../../context/useFavorites";
import { useCart } from "../../../context/useCart";
import { Badge } from "../Badge/Badge";
import { icons } from "../../../utils/accountListLinks";
import './_customIcon.scss'

type CustomIconProps = {
    typeOfIcon: string;
}

export const CustomIcon = ({ typeOfIcon }: CustomIconProps) => {
    const { favorites } = useFavorites();
    const { cart } = useCart();

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
