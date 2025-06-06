import { useEffect, useRef } from 'react';
import { CustomAccountCard } from '../../components/Miscellaneous/CustomAccountCard/CustomAccountCard'
import { useLocation } from 'react-router';
import { animateElements } from '../../hooks/gsapEffects';
import './_accountPage.scss'

export const AccountPage = () => {
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
            title="Nombre del Usuario"
            description="Correo Electrónico: usuario@example.com"
            path="/perfil/datos-personales"
          />
          <CustomAccountCard
            img="orders"
            title="Mis Pedidos"
            description="Gestiona tus pedidos y envíos."
            path="/perfil/mis-pedidos"
          />
          <CustomAccountCard
            img="heart"
            title="Mis Favoritos"
            description="Gestiona tus productos favoritos."
            path="/perfil/mis-favoritos"
          />
        </section>
      </section>
    </div>
  )
}
