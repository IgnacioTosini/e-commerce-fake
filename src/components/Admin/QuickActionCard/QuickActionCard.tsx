import { Link } from 'react-router';
import { FaBox, FaRegUser, FaStore } from 'react-icons/fa';
import './_quickActionCard.scss';

type ImageSvgKey = 'users' | 'orders' | 'products';
type QuickActionCardProps = {
    title: string;
    icon: ImageSvgKey;
    links: { text: string, url:string }[];
}

export const QuickActionCard = (props: QuickActionCardProps) => {
    const { title, icon, links } = props;
    const imageSvg = {
        users: <FaRegUser className='userIcon' />,
        orders: <FaBox className='orderIcon' />,
        products: <FaStore className='productIcon' />,
    }

    return (
        <div className='quickActionCard'>
            <div className='quickActionCardHeader'>
            <picture className='quickActionCardIcon'>{imageSvg[icon]}</picture>
            <h2 className='quickActionCardTitle'>{title}</h2>
            </div>
            <div className='quickActionCardLinks'>
                {links.map((link, index) => (
                    <Link key={index} to={link.url} className='quickActionCardLink'>
                        {link.text}
                    </Link>
                ))}
            </div>
        </div>
    )
}
