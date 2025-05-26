import { Link } from 'react-router'
import { links } from '../../types/links'
import './_navbar.scss'

export const Navbar = () => {
    return (
        <div className='navbar'>
            {links.map((link) => (
                <Link to={link.to} key={link.label} className='navbarLink'>
                    {link.label}
                </Link>
            ))}
        </div>
    )
}
