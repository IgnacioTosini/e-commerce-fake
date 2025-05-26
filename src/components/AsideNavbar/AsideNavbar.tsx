import { memo, useEffect } from 'react';
import { Link } from 'react-router';
import { links } from '../../types/links';
import type { Icon } from '../../types';
import { IoCloseSharp } from "react-icons/io5";
import { SearchBar } from '../SearchBar/SearchBar';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdOutlinePerson } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import './_asideNavbar.scss';

type AsideNavbarProps = {
    isOpen: boolean;
    onClose: () => void;
    icons: Icon[];
};

export const AsideNavbar = memo(({ isOpen, onClose, icons }: AsideNavbarProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const iconsSvg: Record<string, React.ReactNode> = {
        cart: <AiOutlineShoppingCart />,
        user: <MdOutlinePerson />,
        heart: <FaRegHeart />,
    };

    return (
        <>
            <div className={`asideNavbar${isOpen ? ' open' : ''}`}>
                <div className='headerLogoAside'>
                    <Link to='/' className='logo'>
                        <img src="ecommerceFakeLogo.png" alt="Logo" />
                    </Link>
                    <IoCloseSharp onClick={onClose} />
                </div>
                <SearchBar />
                <ul className='asideNavbarList'>
                    {links.map((link) => (
                        <li key={link.label}>
                            <Link to={link.to} className='navbarLink'>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <h2 className='asideNavbarTitle'>Mi Cuenta</h2>
                {icons.length > 0 && (
                    <div className='asideNavbarIcons'>
                        {icons.map((icon, index) => (
                            <div key={index} className={`customIconAside ${icon.image}`}>
                                {iconsSvg[icon.image] || <span>❓</span>}
                                <p className='categoryName'>{icon.alt}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div
                className="asideNavbarOverlay"
                style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
                onClick={onClose}
            />
        </>
    );
});