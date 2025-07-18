import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import type { AppDispatch, RootState } from '../../store/store';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { userProfileSchema } from '../../schemas';
import { startUpdateUser } from '../../store/user/thunks';
import { UserImageCard } from '../../components/Admin/Custom/UserImageCard';
import { toast } from 'react-toastify';
import { base64ToFile, fileUpload } from '../../helpers/fileUpload';
import type { ProductImage } from '../../types';
import './_userEditPage.scss'

const initialValues = {
  name: '',
  email: '',
  role: 'user' as 'user' | 'admin',
  phone: '',
  address: '',
  isActive: true,
  image: '' as string | ProductImage,
  photoURL: '',
}

export const UserEditPage = () => {
  const location = useLocation();
  const { userId } = useParams<{ userId: string }>();
  const { user, users, loading } = useSelector((state: RootState) => state.user);
  const selectedUser = users.find(user => user.id === userId);
  const dispatch = useDispatch<AppDispatch>();
  const [originalImage, setOriginalImage] = useState(selectedUser?.image);

  // Mantener sincronizada la imagen original si cambia el usuario seleccionado
  useEffect(() => {
    setOriginalImage(selectedUser?.image);
  }, [selectedUser]);

  // Determinar si el usuario actual es admin
  const isAdmin = user?.role === 'admin' && location.pathname.includes('/admin');

  // Mapear los valores del usuario a los nombres de campos del formulario
  const mappedInitialValues = selectedUser ? {
    name: selectedUser.name || '',
    email: selectedUser.email || '',
    role: selectedUser.role || 'user' as 'user' | 'admin',
    phone: selectedUser.phone || '',
    address: selectedUser.address || '',
    isActive: selectedUser.isActive ?? true,
    image: (selectedUser.image as string | ProductImage) || '',
    photoURL: selectedUser.photoURL || '',
  } : initialValues;

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      let uploadedImageUrl: ProductImage = {
        url: '',
        public_id: '',
      };

      // Si hay una imagen personalizada (base64), subirla a Cloudinary
      if (typeof values.image === 'string' && values.image.startsWith('data:image/')) {
        toast.info('Subiendo imagen, por favor espera...');
        const file = base64ToFile(values.image, `profile-${selectedUser?.id || Date.now()}.jpg`);
        uploadedImageUrl = await fileUpload(file);
      } else if (typeof values.image === 'object' && values.image.url && !values.image.url.startsWith('data:image/')) {
        // Si ya es una URL (imagen ya subida), mantenerla
        uploadedImageUrl.url = values.image.url;
        uploadedImageUrl.public_id = values.image.public_id;
      }

      // Crear objeto compatible con el thunk existente
      const userData = {
        name: values.name,
        email: values.email,
        role: values.role,
        phone: values.phone,
        address: values.address,
        isActive: values.isActive,
        image: uploadedImageUrl, // Imagen personalizada subida
        photoURL: values.photoURL, // Mantener la imagen de Google
      };

      await dispatch(startUpdateUser(selectedUser?.id || '', userData, originalImage));
      toast.success('Perfil actualizado exitosamente');
      console.log('Perfil actualizado:', userData);
      window.history.back();
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      toast.error('Error al actualizar el perfil');
    }
  }

  if (loading || !selectedUser) {
    return (
      <div className="userEditPage">
        <div className="loadingContainer">
          <div className="loadingSpinner"></div>
          <p>Cargando información del usuario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="userEditPage">
      <Formik
        initialValues={mappedInitialValues}
        validationSchema={userProfileSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        <Form>
          <div className='userEditPageContent'>
            {/* Información Personal */}
            <div className='informationCustomCard'>
              <div className='informationCustomCardContent'>
                <div className='informationCustomCardHeader'>
                  <h2 className='informationCustomCardTitle'>Información Personal</h2>
                  <span className='informationCustomCardSubtitle'>
                    Gestiona la información básica del usuario
                  </span>
                </div>

                <div className='informationCustomCardForm'>
                  <div className='informationCustomCardGroup'>
                    <div className='informationCustomCardInputGroup'>
                      <label htmlFor='name' className='informationCustomCardLabel'>
                        Nombre *
                      </label>
                      <Field
                        type='text'
                        id='name'
                        name='name'
                        className='informationCustomCardInput'
                        placeholder='Ej: Juan Pérez'
                      />
                      <ErrorMessage name='name' component='span' className='error' />
                    </div>

                    <div className='informationCustomCardInputGroup'>
                      <label htmlFor='email' className='informationCustomCardLabel'>
                        Email *
                      </label>
                      <Field
                        type='email'
                        id='email'
                        name='email'
                        className='informationCustomCardInput'
                        placeholder='Ej: juan@example.com'
                      />
                      <ErrorMessage name='email' component='span' className='error' />
                    </div>
                  </div>

                  <div className='informationCustomCardGroup'>
                    <div className='informationCustomCardInputGroup'>
                      <label htmlFor='phone' className='informationCustomCardLabel'>
                        Teléfono
                      </label>
                      <Field
                        type='tel'
                        id='phone'
                        name='phone'
                        className='informationCustomCardInput'
                        placeholder='Ej: +54 9 11 1234-5678'
                      />
                      <ErrorMessage name='phone' component='span' className='error' />
                    </div>

                    <div className='informationCustomCardInputGroup'>
                      <label htmlFor='address' className='informationCustomCardLabel'>
                        Dirección *
                      </label>
                      <Field
                        type='text'
                        id='address'
                        name='address'
                        className='informationCustomCardInput'
                        placeholder='Ej: Av. Corrientes 1234, CABA'
                      />
                      <ErrorMessage name='address' component='span' className='error' />
                    </div>
                  </div>
                </div>
              </div>
              {/* Imagen de Perfil */}
              <UserImageCard
                mode={selectedUser ? 'edit' : 'create'}
                userName={selectedUser?.name || 'Usuario'}
                googlePhotoURL={selectedUser?.photoURL || ''}
              />
            </div>

            {/* Configuración de Administrador - Solo visible para admins */}
            {isAdmin && (
              <div className='informationCustomCard adminSection'>
                <h2 className='informationCustomCardTitle'>Configuración de Administrador</h2>
                <span className='informationCustomCardSubtitle'>
                  Configuraciones especiales solo para administradores
                </span>

                <div className='informationCustomCardForm'>
                  <div className='informationCustomCardGroup'>
                    <div className='informationCustomCardInputGroup'>
                      <label htmlFor='role' className='informationCustomCardLabel'>
                        Rol del Usuario *
                      </label>
                      <Field
                        as='select'
                        id='role'
                        name='role'
                        className='informationCustomCardInput select'
                      >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                      </Field>
                      <ErrorMessage name='role' component='span' className='error' />
                    </div>

                    <div className='informationCustomCardInputGroup'>
                      <label className='informationCustomCardLabel'>Estado</label>
                      <div className='checkboxWrapper'>
                        <label htmlFor="isActive" className="checkboxLabel">
                          <Field
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            className="checkboxInput"
                          />
                          Usuario Activo
                        </label>
                      </div>
                      <ErrorMessage name='isActive' component='span' className='error' />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Información de Solo Lectura */}
            <div className='informationCustomCard readOnlySection'>
              {isAdmin && (
                <>
                  <h2 className='informationCustomCardTitle'>Información del Sistema</h2>
                  <span className='informationCustomCardSubtitle'>
                    Datos de solo lectura del sistema
                  </span>
                </>
              )}

              <div className='informationCustomCardForm'>
                <div className='informationCustomCardGroup'>
                  <div className='informationCustomCardInputGroup'>
                    <label className='informationCustomCardLabel'>ID de Usuario</label>
                    <div className='readOnlyValue'>{selectedUser.id}</div>
                  </div>

                  <div className='informationCustomCardInputGroup'>
                    <label className='informationCustomCardLabel'>Fecha de Creación</label>
                    <div className='readOnlyValue'>
                      {new Date(selectedUser.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>

                <div className='informationCustomCardInputGroup'>
                  <label className='informationCustomCardLabel'>Última Actualización</label>
                  <div className='readOnlyValue'>
                    {new Date(selectedUser.updatedAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className='formActions'>
              <button type="submit" className="saveButton">
                Guardar Cambios
              </button>
              <button type="button" className="cancelButton" onClick={() => window.history.back()}>
                Cancelar
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default UserEditPage;
