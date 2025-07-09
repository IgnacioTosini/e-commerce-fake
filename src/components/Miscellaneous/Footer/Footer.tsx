import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router'
import { animateElements } from '../../../hooks/gsapEffects';
import type { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import './_footer.scss'

export const Footer = () => {
    const { uid } = useSelector((state: RootState) => state.auth);
    const footerRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (footerRef.current) {
            const elements = Array.from(footerRef.current.querySelectorAll('.footer .footerContainer .footerLogo, .footer .footerContainer .footerLinksContainer, .footer .footerReserved'));
            animateElements(elements as HTMLElement[], 0.5, 0.2, 30);
        }
    }, [location]);
    return (
        <footer className='footer' ref={footerRef}>
            <div className='footerContainer'>
                <div className='footerLogo'>
                    <div className='footerLogoContent'>
                        <img src='/ecommerceFakeLogo.png' alt='Logo' />
                        <h1>Logo</h1>
                    </div>
                    <p>Moda sostenible y de calidad para todos los estilos y ocasiones.</p>
                </div>
                <div className='footerLinksContainer'>
                    <h2>Comprar</h2>
                    <ul className='footerLinks'>
                        <li><Link to='/productos' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Todos los productos</Link></li>
                        <li><Link to='/ofertas' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Ofertas</Link></li>
                    </ul>
                </div>
                <div className='footerLinksContainer'>
                    <h2>Cuenta</h2>
                    {!uid ? (
                        <div className='footerUser'>
                            <Link to='auth/login' className='navbarLink'>
                                Iniciar Sesión
                            </Link>
                            <Link to='auth/register' className='navbarLink'>
                                Registrarse
                            </Link>
                        </div>
                    ) : (
                        <ul className='footerLinks'>
                            <li><Link to='perfil' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Mi Cuenta</Link></li>
                            <li><Link to={`perfil/mis-pedidos/${uid}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Mis Pedidos</Link></li>
                            <li><Link to={`perfil/lista-deseos/${uid}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Lista de Deseos</Link></li>
                        </ul>
                    )}
                </div>
            </div>
            <div className='footerReserved'>
                <p>© {new Date().getFullYear()} EClothes. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}
