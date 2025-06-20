import { Link } from 'react-router'
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaBoxOpen, FaClipboardList } from "react-icons/fa";
import './_adminAsidebar.scss'

export const AdminAsidebar = () => {
    return (
        <div className='adminAsidebar'>
            <h2 className='adminAsidebarTitle'>Panel de Administración</h2>
            <ul className='adminAsidebarList'>
                <li className='adminAsidebarItem'><Link to="/admin/admin-panel"><MdDashboard /><span>Dashboard</span></Link></li>
                <li className='adminAsidebarItem'><Link to="/admin/usuarios"><FaUsers /><span>Usuarios</span></Link></li>
                <li className='adminAsidebarItem'><Link to="/admin/productos"><FaBoxOpen /><span>Productos</span></Link></li>
                <li className='adminAsidebarItem'><Link to="/admin/pedidos"><FaClipboardList /><span>Pedidos</span></Link></li>
            </ul>
        </div>
    )
}
