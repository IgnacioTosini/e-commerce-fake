import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { MdOutlinePerson } from 'react-icons/md';
import { CiLogout } from "react-icons/ci";
import type { User } from '../../../types';
import { icons } from '../../../utils/accountListLinks';
import { useMenuAnimation } from '../../../hooks/gsapEffects';
import './_userDisplay.scss';

export const UserDisplay = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user: User = {
        id: '1',
        name: '',
        email: '',
        role: 'user',
        isActive: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const menuRef = useRef<HTMLDivElement>(null);

    useMenuAnimation(isMenuOpen, menuRef);

    return (
        <button
            className={`userDisplayButton ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="userDisplayInfo"
        >
            <div className="userDisplay">
                <picture className="userDisplayAvatar">
                    <MdOutlinePerson />
                </picture>
                <div
                    id="userDisplayInfo"
                    className="userDisplayInfo"
                    ref={menuRef}
                    onClick={(e) => e.stopPropagation()}
                >
                    <section className='userDisplayDetails'>
                        <h2 className="userDisplayName">{user.name || 'Usuario'}</h2>
                        <p className="userDisplayEmail">{user.email || 'email@example.com'}</p>
                    </section>
                    {user.isActive ? (
                        <section className='userDisplayActions'>
                            <Link to="/login" className='userDisplayAction' onClick={() => setIsMenuOpen(false)}>Iniciar sesión</Link>
                            <Link to="/register" className='userDisplayAction' onClick={() => setIsMenuOpen(false)}>Registrarse</Link>
                        </section>
                    ) : (
                        <section className='userLinks'>
                            {Object.entries(icons).length > 0 && (
                                <section className='userDisplayIcons'>
                                    {Object.entries(icons).map(([key, { icon, path, name }]) => (
                                        <Link to={path} key={key} className={`customIconAside ${key}`} onClick={() => setIsMenuOpen(false)}>
                                            {icon || <span>❓</span>}
                                            <p className='categoryName'>{name}</p>
                                        </Link>
                                    ))}
                                </section>
                            )}
                            <section className='userDisplayLogout'>
                                <CiLogout />
                                <div
                                    className='userDisplayLogoutButton'
                                    role='button'
                                    tabIndex={0}
                                    onClick={() => setIsMenuOpen(false)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setIsMenuOpen(false);
                                        }
                                    }}
                                >
                                    Cerrar sesión
                                </div>
                            </section>
                        </section>
                    )}
                </div>
            </div>
        </button>
    );
};
