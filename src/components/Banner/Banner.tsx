import { Link, useLocation } from 'react-router'
import { Badge } from '../Badge/Badge'
import { useEffect, useRef } from 'react';
import { animateElements } from '../../hooks/gsapEffects';
import './_banner.scss'

export const Banner = () => {
    const bannerRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (bannerRef.current) {
            const elements = Array.from(bannerRef.current.querySelectorAll('badge, h1, p, .bannerButtons a'));
            animateElements(elements as HTMLElement[], 0.5, 0.2, 30);
        }
    }, [location]);

    return (
        <div className='banner' ref={bannerRef}>
            <div className='banner'>
                <Badge color='info'>Nueva Colección</Badge>
                <h1 className='bannerTitle'>Descubre la moda de verano</h1>
                <p className='bannerDescription'>Explora nuestra nueva colección de ropa y accesorios para el verano. ¡No te lo pierdas!</p>
                <div className='bannerButtons'>
                    <Link to='/productos' className='customButton customButton--primary' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        Ver Colección
                    </Link>
                    <Link to='/ofertas' className='customButton customButton--secondary' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        Ver Ofertas
                    </Link>
                </div>
            </div>
        </div>
    )
}
