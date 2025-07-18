import { useMemo } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { GrGoogle } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { startGoogleSignIn, startCreatingUserWithEmailPassword } from '../../store/auth/thunks'
import { registerSchema } from '../../schemas'
import './_registerPage.scss'
import { Link } from 'react-router'

// Valores iniciales
const initialValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

export const RegisterPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { status, errorMessage } = useSelector((state: RootState) => state.auth);

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    };

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    return (
        <div className='registerPage'>
            <Formik
                initialValues={initialValues}
                validationSchema={registerSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const { displayName, email, password } = values;
                    dispatch(startCreatingUserWithEmailPassword(
                        email,
                        password,
                        displayName
                    ));
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, isValid, errors, touched }) => (
                    <Form className='registerForm'>
                        <h1>Crear Cuenta</h1>
                        <p className='registerDescription'>
                            Crea tu cuenta con Google o completa el formulario.
                        </p>

                        <div className='formGroup'>
                            <label htmlFor='displayName'>Nombre completo</label>
                            <Field
                                type='text'
                                id='displayName'
                                name='displayName'
                                className={`formInput ${errors.displayName && touched.displayName ? 'error' : ''}`}
                                placeholder='Ingresa tu nombre completo'
                            />
                            <ErrorMessage name='displayName' component='span' className='error' />
                        </div>

                        <div className='formGroup'>
                            <label htmlFor='email'>Email</label>
                            <Field
                                type='email'
                                id='email'
                                name='email'
                                className={`formInput ${errors.email && touched.email ? 'error' : ''}`}
                                placeholder='ejemplo@correo.com'
                            />
                            <ErrorMessage name='email' component='span' className='error' />
                        </div>

                        <div className='formGroup'>
                            <label htmlFor='password'>Contraseña</label>
                            <Field
                                type='password'
                                id='password'
                                name='password'
                                className={`formInput ${errors.password && touched.password ? 'error' : ''}`}
                                placeholder='Mínimo 6 caracteres'
                            />
                            <ErrorMessage name='password' component='span' className='error' />
                        </div>

                        <div className='formGroup'>
                            <label htmlFor='confirmPassword'>Confirmar contraseña</label>
                            <Field
                                type='password'
                                id='confirmPassword'
                                name='confirmPassword'
                                className={`formInput ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''}`}
                                placeholder='Repite tu contraseña'
                            />
                            <ErrorMessage name='confirmPassword' component='span' className='error' />
                        </div>

                        <div className='formActions'>
                            {errorMessage && <span className='error'>{errorMessage}</span>}
                            <span>¿Ya tienes una cuenta? <Link to="/auth/login">Inicia sesión</Link></span>

                            <button
                                type='submit'
                                className='button'
                                disabled={isAuthenticating || isSubmitting || !isValid}
                            >
                                Crear Cuenta
                            </button>

                            <span>o</span>
                            <button
                                type='button'
                                onClick={onGoogleSignIn}
                                disabled={isAuthenticating}
                                className='googleButton'
                            >
                                <GrGoogle /> Continuar con Google
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterPage;