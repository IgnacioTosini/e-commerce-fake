import { useNavigate } from 'react-router';
import { FaRegSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaAngleLeft } from "react-icons/fa6";
import { useFormikContext } from 'formik';
import './_headerCustomActions.scss'

interface HeaderCustomActionsProps {
  type: 'product' | 'user';
  mode: 'create' | 'edit';
  onSaveAll?: () => Promise<{ success: boolean }>;
}

export const HeaderCustomActions = ({ type, mode, onSaveAll }: HeaderCustomActionsProps) => {
  const navigate = useNavigate();
  const { submitForm, isSubmitting, isValid } = useFormikContext();

  const handleSave = async () => {
    if (onSaveAll) {
      await onSaveAll();
    } else {
      // Usar el submit de Formik directamente
      await submitForm();
    }
  };

  return (
    <div className='headerCustomActions'>
      {type === 'product' && (
        <section className='headerCustomActionsContent'>
          <button type="button" className='headerCustomActionsBack' onClick={() => navigate(-1)}>
            <FaAngleLeft /> Volver
          </button>
          <section className='headerCustomActionsInfo'>
            <h2>{mode === 'create' ? 'Crear nuevo Producto' : 'Editar Producto'}</h2>
            <p>{mode === 'create' ? 'Agregar información del producto' : 'Modificar información del producto'}</p>
          </section>
          <div className='headerCustomActionsButtons'>
            <button
              type="button"
              className='saveButton'
              onClick={handleSave}
              disabled={isSubmitting || !isValid}
            >
              <FaRegSave /> {isSubmitting ? 'Guardando...' : (mode === 'create' ? 'Crear Producto' : 'Guardar Cambios')}
            </button>
            <button type="button" onClick={() => navigate(-1)}>
              <RxCross2 /> Cancelar
            </button>
          </div>
        </section>
      )}
    </div>
  )
}