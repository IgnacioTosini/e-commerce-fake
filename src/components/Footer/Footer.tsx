import { Link } from 'react-router'
import './_footer.scss'

export const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footerContainer'>
                <div className='footerLogo'>
                    <div className='footerLogoContent'>
                        <img src='ecommerceFakeLogo.png' alt='Logo' />
                        <h1>Logo</h1>
                    </div>
                    <p>Moda sostenible y de calidad para todos los estilos y ocasiones.</p>
                </div>
                <div className='footerLinksContainer'>
                    <h2>Comprar</h2>
                    <ul className='footerLinks'>
                        <li><Link to='/productos'>Todos los productos</Link></li>
                        <li><Link to='/categorias'>Categorías</Link></li>
                        <li><Link to='/ofertas'>Ofertas</Link></li>
                    </ul>
                </div>
                <div className='footerLinksContainer'>
                    <h2>Cuenta</h2>
                    <ul className='footerLinks'>
                        <li><Link to='/mi-cuenta'>Mi Cuenta</Link></li>
                        <li><Link to='/mis-pedidos'>Mis Pedidos</Link></li>
                        <li><Link to='/lista-de-deseos'>Lista de Deseos</Link></li>
                    </ul>
                </div>
            </div>
            <div className='footerReserved'>
                <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
        </footer>
    )
}
