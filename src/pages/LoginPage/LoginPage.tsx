import { useMemo } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { GrGoogle } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks'
import './_loginPage.scss'
import { loginSchema } from '../../schemas'

// Valores iniciales
const initialValues = {
    email: '',
    password: ''
};

export const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { status, errorMessage } = useSelector((state: RootState) => state.auth);

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    };

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    return (
        <div className='loginPage'>
            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(startLoginWithEmailPassword(values.email, values.password));
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, isValid }) => (
                    <Form className='loginForm'>
                        <h1>Iniciar Sesión</h1>
                        <p className='loginDescription'>
                            Inicia sesión con tu cuenta de Google o con tu correo electrónico.
                        </p>

                        <div className='formGroup'>
                            <label htmlFor='email'>Email</label>
                            <Field
                                type='email'
                                id='email'
                                name='email'
                                className='formInput'
                            />
                            <ErrorMessage name='email' component='span' className='error' />
                        </div>

                        <div className='formGroup'>
                            <label htmlFor='password'>Contraseña</label>
                            <Field
                                type='password'
                                id='password'
                                name='password'
                                className='formInput'
                            />
                            <ErrorMessage name='password' component='span' className='error' />
                        </div>

                        <div className='formActions'>
                            {errorMessage && <span className='error'>{errorMessage}</span>}
                            <span>¿No tienes una cuenta? <a href="/auth/register">Regístrate</a></span>

                            <button
                                type='submit'
                                className='button'
                                disabled={isAuthenticating || isSubmitting || !isValid}
                            >
                                Iniciar Sesión
                            </button>

                            <span>o</span>
                            <button
                                type='button'
                                onClick={onGoogleSignIn}
                                disabled={isAuthenticating}
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