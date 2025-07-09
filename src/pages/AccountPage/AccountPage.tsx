import { useEffect, useRef } from 'react';
import { CustomAccountCard } from '../../components/Miscellaneous/CustomAccountCard/CustomAccountCard'
import { useLocation } from 'react-router';
import { animateElements } from '../../hooks/gsapEffects';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import './_accountPage.scss'

export const AccountPage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const authState = useSelector((state: RootState) => state.auth);

  const accountPageRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (accountPageRef.current) {
      const elements = Array.from(accountPageRef.current.querySelectorAll('.accountPageContent, .accountPageTitle, .accountPageDescription, .accountPageSection > *'));
      animateElements(elements as HTMLElement[], 0.5, 0.2, 30);
    }
  }, [location]);
  return (
    <div className="accountPage" ref={accountPageRef}>
      <section className='accountPageContent'>
        <h1 className='accountPageTitle'>Mi cuenta</h1>
        <p className='accountPageDescription'>Gestiona tu información personal, pedidos y preferencias.</p>
        <section className='accountPageSection'>
          <CustomAccountCard
            img="user"
            title={user?.name || authState.displayName || "Nombre del Usuario"}
            description={`Correo Electrónico: ${user?.email || authState.email || "usuario@example.com"}`}
            path={`/perfil/datos-personales/${user?.id || authState.uid || ''}`}
          />
          <CustomAccountCard
            img="orders"
            title="Mis Pedidos"
            description="Gestiona tus pedidos y envíos."
            path={`/perfil/mis-pedidos/${user?.id || authState.uid || ''}`}
          />
          <CustomAccountCard
            img="heart"
            title="Mis Favoritos"
            description="Gestiona tus productos favoritos."
            path={`/perfil/lista-deseos/${user?.id || authState.uid || ''}`}
          />
          {user?.role === 'admin' && (
            <CustomAccountCard
              img="admin"
              title="Panel de Administración"
              description="Accede al panel de administración."
              path="/admin/admin-panel"
            />
          )}
        </section>
      </section>
    </div>
  )
}
