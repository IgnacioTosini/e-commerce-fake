import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../../store/auth/thunks';
import type { AppDispatch, RootState } from '../../../store/store';
import { MdOutlinePerson } from 'react-icons/md';
import { CiLogout } from "react-icons/ci";
import { icons } from '../../../utils/accountListLinks';
import { useMenuAnimation } from '../../../hooks/gsapEffects';
import { useCheckAuth } from '../../../hooks/useCheckAuth';
import './_userDisplay.scss';

export const UserDisplay = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { status } = useCheckAuth();
    const { displayName, email, photoURL } = useSelector((state: RootState) => state.auth);
    const { user } = useSelector((state: RootState) => state.user);
    const menuRef = useRef<HTMLDivElement>(null);
    const userImage = user?.image ? user.image : photoURL;

    useMenuAnimation(isMenuOpen, menuRef);

    const onLogout = () => {
        dispatch(startLogout());
        setIsMenuOpen(false);
        navigate('/');
    };

    return (
        <button
            className={`userDisplayButton ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="userDisplayInfo"
        >
            <div className="userDisplay">
                <picture className="userDisplayAvatar">
                    {userImage ? <img src={userImage} alt={displayName || 'Usuario'} /> : <MdOutlinePerson />}
                </picture>
                <div
                    id="userDisplayInfo"
                    className="userDisplayInfo"
                    ref={menuRef}
                    onClick={(e) => e.stopPropagation()}
                >
                    <section className='userDisplayDetails'>
                        <h2 className="userDisplayName">{displayName || 'Usuario'}</h2>
                        <p className="userDisplayEmail">{email || 'email@example.com'}</p>
                    </section>
                    {status === 'not-authenticated' ? (
                        <section className='userDisplayActions'>
                            <Link to="/auth/login" className='userDisplayAction' onClick={() => setIsMenuOpen(false)}>Iniciar sesión</Link>
                            <Link to="/auth/register" className='userDisplayAction' onClick={() => setIsMenuOpen(false)}>Registrarse</Link>
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
                                    onClick={onLogout}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            onLogout();
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
