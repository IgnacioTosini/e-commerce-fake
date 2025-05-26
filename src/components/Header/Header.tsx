import { Link } from 'react-router'
import { IconList } from '../IconList/IconList'
import { Navbar } from '../Navbar/Navbar'
import { SearchBar } from '../SearchBar/SearchBar'
import { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdOutlineClose } from 'react-icons/md'
import { AsideNavbar } from '../AsideNavbar/AsideNavbar'
import './_header.scss'

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);

    const icons = [
        { image: 'heart', alt: 'Favoritos' },
        { image: 'cart', alt: 'Carrito' },
        { image: 'user', alt: 'Usuario' }
    ];

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
        <header className='header'>
            <div className='headerLogo'>
                <Link to='/' className='headerLogoLink'>
                    <img src="ecommerceFakeLogo.png" alt="Logo" />
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
