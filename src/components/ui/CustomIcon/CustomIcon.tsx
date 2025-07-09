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
    const { favorites } = useSelector((state: RootState) => state.user);
    const { cart } = useSelector((state: RootState) => state.cart);

    return (
        <Link to={icons[typeOfIcon]?.path || '/'} className={`customIcon ${typeOfIcon}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {
                typeOfIcon === 'heart' && favorites.length > 0 &&
                <Badge>
                    {favorites.length}
                </Badge>
            }
            {
                typeOfIcon === 'cart' && cart.items.length > 0 &&
                <Badge>
                    {cart.items.length}
                </Badge>
            }
            {icons[typeOfIcon]?.icon || <span>❓</span>}
        </Link>
    )
}