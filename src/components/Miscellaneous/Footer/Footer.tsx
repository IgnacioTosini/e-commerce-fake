import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router'
import { animateElements } from '../../../hooks/gsapEffects';
import './_footer.scss'

export const Footer = () => {
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
                    <ul className='footerLinks'>
                        <li><Link to='/mi-cuenta' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Mi Cuenta</Link></li>
                        <li><Link to='/mis-pedidos' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Mis Pedidos</Link></li>
                        <li><Link to='/lista-deseos' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Lista de Deseos</Link></li>
                    </ul>
                </div>
            </div>
            <div className='footerReserved'>
                <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
        </footer>
    )
}
