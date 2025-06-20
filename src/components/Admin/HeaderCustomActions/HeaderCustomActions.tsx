import { Link, useNavigate } from 'react-router';
import type { Product, User } from '../../../types';
import { HiOutlinePencil } from 'react-icons/hi';
import { IoTrashOutline } from 'react-icons/io5';
import { FaAngleLeft } from "react-icons/fa6";
import './_headerCustomActions.scss'

type HeaderCustomActionsProps = {
  data: Product | User | null | undefined;
  type: 'product' | 'user';
};

export const HeaderCustomActions = ({ type, data }: HeaderCustomActionsProps) => {
  const navigate = useNavigate();
  return (
    <div className='headerCustomActions'>
      {type === 'product' && data && (
        <section className='headerCustomActionsContent'>
          <button type="button" className='headerCustomActionsBack' onClick={() => navigate(-1)}><FaAngleLeft /> Volver</button>
          <section className='headerCustomActionsInfo'>
            <h2>{(data as Product)?.title}</h2>
            <p>{(data as Product)?.sku}</p>
          </section>
          <div className='headerCustomActionsButtons'>
            <Link to={`/admin/productos/${data.id}/editar`}><HiOutlinePencil /> Editar</Link>
            <button><IoTrashOutline /> Eliminar</button>
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
            <button><IoTrashOutline /> Eliminar</button>
          </div>
        </section>
      )}
    </div>
  )
}
