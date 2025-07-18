import { QuickAccessCardList } from '../../components/Admin/QuickAccessCardList/QuickAccessCardList';
import { QuickActionCardList } from '../../components/Admin/QuickActionCardList/QuickActionCardList';
import './_adminPanelPage.scss';

export const AdminPanelPage = () => {
    return (
        <div className='adminPanelPage'>
            <div className='adminPanelPageContent'>
                <h1 className='adminPanelPageTitle'>Panel de administración.</h1>
                <p className='adminPanelPageDescription'>Gestiona tu tienda online desde un solo lugar.</p>
                <h2 className='adminPanelPageSubtitle'>Acceso rápido</h2>
                <QuickAccessCardList />
                <h2 className='adminPanelPageSubtitle'>Acciones rápidas</h2>
                <QuickActionCardList />
            </div>
        </div>
    )
}

export default AdminPanelPage;
