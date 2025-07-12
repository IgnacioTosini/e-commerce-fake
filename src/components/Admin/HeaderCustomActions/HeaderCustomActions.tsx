import { Link, useNavigate } from 'react-router';
import type { Product, User } from '../../../types';
import { HiOutlinePencil } from 'react-icons/hi';
import { IoTrashOutline } from 'react-icons/io5';
import { FaAngleLeft } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store/store';
import { startDeletingProduct } from '../../../store/products/thunks';
import { startDeletingUser } from '../../../store/user/thunks';
import { HeaderCustomActionsSkeleton } from './HeaderCustomActionsSkeleton';
import './_headerCustomActions.scss'

type HeaderCustomActionsProps = {
  data: Product | User | null | undefined;
  type: 'product' | 'user';
};

export const HeaderCustomActions = ({ type, data }: HeaderCustomActionsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = () => {
    if (type === 'product' && data) {
      dispatch(startDeletingProduct(data.id));
      navigate('/admin/productos');
    }
    if (type === 'user' && data) {
      dispatch(startDeletingUser(data.id));
      navigate('/admin/usuarios');
    }
  }

  if (!data) {
    return <HeaderCustomActionsSkeleton />;
  }

  return (
    <div className='headerCustomActions'>
      {type === 'product' && data && (
        <section className='headerCustomActionsContent'>
          <button type="button" className='headerCustomActionsBack' onClick={() => navigate(-1)}><FaAngleLeft /> Volver</button>
          <section className='headerCustomActionsInfo'>
            <h2>{(data as Product)?.title}</h2>
            <p>{(data as Product)?.variants[0]?.sku}</p>
          </section>
          <div className='headerCustomActionsButtons'>
            <Link to={`/admin/productos/${data.id}/editar`}><HiOutlinePencil /> Editar</Link>
            <button onClick={() => handleDelete()}><IoTrashOutline /> Eliminar</button>
          </div>
        </section>
      )}
      {type === 'user' && data && (
        <section className='headerCustomActionsContent'>
          <button type="button" className='headerCustomActionsBack' onClick={() => navigate(-1)}><FaAngleLeft /> Volver</button>
          <section className='headerCustomActionsInfo'>
            <h2>{(data as User)?.name}</h2>
            <p>{(data as User)?.email}</p>
          </section>
          <div className='headerCustomActionsButtons'>
            <Link to={`/admin/usuarios/${data.id}/editar`}><HiOutlinePencil /> Editar</Link>
            <button onClick={() => handleDelete()} disabled={(data as User).role === 'admin'}><IoTrashOutline /> Eliminar</button>
          </div>
        </section>
      )}
    </div>
  )
}
