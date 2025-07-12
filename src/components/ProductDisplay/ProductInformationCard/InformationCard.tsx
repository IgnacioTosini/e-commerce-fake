import type { Product, User } from '../../../types';
import { StatusBadge } from '../../Admin/RoleBadge/RoleBadge';
import './_informationCard.scss';

type InformationCardProps = {
    data: Product | User | null | undefined;
    type: 'product' | 'user';
};

export const InformationCard = ({ data, type }: InformationCardProps) => {
    return (
        <div className="informationCard">
            <h1 className='informationCardTitle'>Información {type === 'product' ? 'del Producto' : 'del Usuario'}</h1>
            <section className='informationCardHeader'>
                {type === 'product' ? (
                    <>
                        <div className='subMenu'>
                            <h2>Nombre</h2>
                            <p>{(data as Product)?.title}</p>
                        </div>
                        <div className='subMenu'>
                            <h2>Categoría</h2>
                            <p>{(data as Product)?.categoryName}</p>
                        </div>
                        <div className='subMenu'>
                            <h2>Marca</h2>
                            <p>{(data as Product)?.brand}</p>
                        </div>
                        <div className='subMenu'>
                            <h2>Estado</h2>
                            <StatusBadge column="isActive" value={(data as Product)?.isActive ? 'true' : 'false'} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className='subMenu'>
                            <h2>Nombre Completo</h2>
                            <p>{(data as User)?.name}</p>
                        </div>
                        <div className='subMenu'>
                            <h2>Email</h2>
                            <p>{(data as User)?.email}</p>
                        </div>
                        <div className='subMenu'>
                            <h2>Teléfono</h2>
                            <p>{(data as User)?.phone}</p>
                        </div>
                        <div className='subMenu'>
                            <h2>Rol</h2>
                            <StatusBadge column="role" value={(data as User)?.role} />
                        </div>
                    </>
                )}
            </section>
            {type === 'product' && (
                <section className='informationCardDescription'>
                    <h2>Descripción</h2>
                    <p>{(data as Product)?.description}</p>
                </section>
            )}
            <section className='informationCardFooter'>
                {type === 'product' ? (
                    <>
                        <div className='subMenu'>
                            <h2>Precio</h2>
                            <span>${(data as Product)?.price}</span>
                        </div>
                        <div className='subMenu'>
                            <h2>Stock</h2>
                            <span>{(data as Product)?.totalStock}</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='subMenu'>
                            <h2>Dirección</h2>
                            <p>{(data as User)?.address}</p>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};
