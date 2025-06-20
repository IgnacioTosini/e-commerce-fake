import { Link, useLocation } from 'react-router';
import { IconList } from '../../Miscellaneous/IconList/IconList';
import { Navbar } from '../Navbar/Navbar';
import { SearchBar } from '../../Filters/SearchBar/SearchBar';
import { useEffect, useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineClose } from 'react-icons/md';
import { AsideNavbar } from '../AsideNavbar/AsideNavbar';
import { animateElements } from '../../../hooks/gsapEffects';
import './_header.scss';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    const icons = [
        { image: 'heart', alt: 'Favoritos' },
        { image: 'cart', alt: 'Carrito' },
    ];

    useEffect(() => {
        if (headerRef.current) {
            const elements = Array.from(headerRef.current.querySelectorAll('.headerLogo, .searchBarContainer, .menuToggle, .iconList'));
            animateElements(elements as HTMLElement[], 0.2, 0.1, 30);
        }
    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            setIsTabletOrMobile(window.innerWidth <= 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className='header' ref={headerRef}>
            <div className='headerLogo'>
                <Link to='/' className='headerLogoLink' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img src="/ecommerceFakeLogo.png" alt="Logo" />
                    {isTabletOrMobile ? null : <h1 className='headerLogoText'>EClothes</h1>}
                </Link>
                {isTabletOrMobile ? null : <Navbar />}
            </div>
            <div className='headerSearch'>
                {isTabletOrMobile ? (
                    <>
                        <button
                            className="menuToggle"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        >
                            {isMenuOpen ? <MdOutlineClose /> : <GiHamburgerMenu />}
                        </button>
                        <AsideNavbar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} icons={icons} />
                    </>
                ) : null}
                {isTabletOrMobile ? null : <SearchBar />}
                <IconList icons={icons} />
            </div>
        </header>
    )
}
