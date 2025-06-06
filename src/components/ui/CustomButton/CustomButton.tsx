import { HiHeart } from 'react-icons/hi';
import { BiCart } from 'react-icons/bi';
import './_customButton.scss';

type IconType = 'cart' | 'heart';

type CustomButtonProps = {
    children: React.ReactNode;
    color?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning';
    icon?: IconType;
    onClick?: () => void;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const CustomButton = ({
    children,
    color = 'primary',
    icon,
    onClick,
    className = '',
    ...props
}: CustomButtonProps) => {
    const iconList = {
        cart: <BiCart />,
        heart: <HiHeart />,
    };

    const classes = `customButton customButton--${color} ${className}`;

    return (
        <button className={classes} onClick={onClick} {...props}>
            {icon && <span className="customButtonIcon">{iconList[icon]}</span>}
            {children}
        </button>
    );
};