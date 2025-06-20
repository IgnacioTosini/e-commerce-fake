import { useMemo } from 'react'
import { GrGoogle } from 'react-icons/gr'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { startGoogleSignIn } from '../../store/auth/thunks'
import './_loginPage.scss'

export const LoginPage = () => {
    const { status } = useSelector((state: RootState) => state.auth);
    const { onInputChange, formState } = useForm({
        username: '',
        email: '',
        password: ''
    })
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Iniciar sesión con:', formState);
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    }

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    return (
        <div className='loginPage'>
            <form className='loginForm' onSubmit={onSubmit}>
                <h1>Iniciar Sesión</h1>
                <p className='loginDescription'>Inicia sesión con tu cuenta de Google o con tu correo electrónico.</p>
                <div className='formGroup'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' value={formState.email} onChange={onInputChange} required />
                </div>
                <div className='formGroup'>
                    <label htmlFor='password'>Contraseña</label>
                    <input type='password' id='password' name='password' value={formState.password} onChange={onInputChange} required />
                </div>
                <div className='formActions'>
                    <button type='submit' className='button' disabled={isAuthenticating}>Iniciar Sesión</button>
                    <span>o</span>
                    <button type='button' onClick={onGoogleSignIn} disabled={isAuthenticating}><GrGoogle /> Continuar con Google</button>
                </div>
            </form>
        </div>
    )
}
