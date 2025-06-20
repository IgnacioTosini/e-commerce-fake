import { useNavigate } from 'react-router';
import { FaRegSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaAngleLeft } from "react-icons/fa6";
import './_headerCustomActionsEdit.scss'

type HeaderCustomActionsEditProps = {
  type: 'product' | 'user';
};

export const HeaderCustomActionsEdit = ({ type }: HeaderCustomActionsEditProps) => {
  const navigate = useNavigate();
  return (
    <div className='headerCustomActionsEdit'>
      {type === 'product' && (
        <section className='headerCustomActionsEditContent'>
          <button type="button" className='headerCustomActionsEditBack' onClick={() => navigate(-1)}><FaAngleLeft /> Volver</button>
          <section className='headerCustomActionsEditInfo'>
            <h2>Editar Producto</h2>
            <p>Modificar información del producto</p>
          </section>
          <div className='headerCustomActionsEditButtons'>
            <button className='saveButton'><FaRegSave /> Guardar Cambios</button>
            <button onClick={() => navigate(-1)}><RxCross2 /> Cancelar</button>
          </div>
        </section>
      )}
      {type === 'user' && (
        <section className='headerCustomActionsEditContent'>
          <button type="button" className='headerCustomActionsEditBack' onClick={() => navigate(-1)}><FaAngleLeft /> Volver</button>
          <section className='headerCustomActionsEditInfo'>
            <h2>Editar Usuario</h2>
            <p>Modificar información del usuario</p>
          </section>
          <div className='headerCustomActionsEditButtons'>
            <button className='saveButton'><FaRegSave /> Guardar Cambios</button>
            <button onClick={() => navigate(-1)}><RxCross2 /> Cancelar</button>
          </div>
        </section>
      )}
    </div>
  )
}
