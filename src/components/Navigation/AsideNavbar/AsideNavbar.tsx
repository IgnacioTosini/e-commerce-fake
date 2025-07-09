import { memo, useEffect } from 'react';
import { Link } from 'react-router';
import { links } from '../../../types/links';
import type { Icon } from '../../../types';
import { IoCloseSharp } from "react-icons/io5";
import { icons } from '../../../utils/accountListLinks';
import { SearchBar } from '../../Filters/SearchBar/SearchBar';
import './_asideNavbar.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';

type AsideNavbarProps = {
    isOpen: boolean;
    onClose: () => void;
    icons: Icon[];
};

export const AsideNavbar = memo(({ isOpen, onClose }: AsideNavbarProps) => {
    const { uid } = useSelector((state: RootState) => state.auth);
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

    return (
        <>
            <div className={`asideNavbar${isOpen ? ' open' : ''}`}>
                <div className='headerLogoAside'>
                    <Link to='/' className='logo'>
                        <img src="/ecommerceFakeLogo.png" alt="Logo" />
                    </Link>
                    <IoCloseSharp onClick={onClose} />
                </div>
                <SearchBar />
                <ul className='asideNavbarList'>
                    {links.map((link) => (
                        <li key={link.label}>
                            <Link to={link.to} className='navbarLink' onClick={onClose}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <h2 className='asideNavbarTitle'>Mi Cuenta</h2>
                {!uid ? (
                    <div className='asideNavbarUser'>
                        <Link to='auth/login' className='navbarLink' onClick={onClose}>
                            Iniciar Sesión
                        </Link>
                        <Link to='auth/register' className='navbarLink' onClick={onClose}>
                            Registrarse
                        </Link>
                    </div>
                ) : (
                    Object.entries(icons).length > 0 && (
                        <div className='asideNavbarIcons'>
                            {Object.entries(icons).map(([key, { icon, path, name }]) => (
                                <Link to={path} key={key} className={`customIconAside ${key}`} onClick={onClose}>
                                    {icon || <span>❓</span>}
                                    <p className='categoryName'>{name}</p>
                                </Link>
                            ))}
                        </div>
                    )
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