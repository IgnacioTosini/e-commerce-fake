import { Link } from 'react-router'
import { useForm } from '../../hooks/useForm'
import './_registerPage.scss'

const formData = {
    username: '',
    email: '',
    password: '',
}

const formValidations = {
    username: [(value: string) => value.length >= 3, 'El nombre de usuario debe tener al menos 3 caracteres.'] as [(value: string) => boolean, string],
    email: [(value: string) => value.includes('@'), 'El email debe ser válido.'] as [(value: string) => boolean, string],
    password: [(value: string) => value.length >= 6, 'La contraseña debe tener al menos 6 caracteres.'] as [(value: string) => boolean, string],
}

export const RegisterPage = () => {
    const { onInputChange, formState } = useForm(formData, formValidations)

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Aquí puedes manejar el registro, por ejemplo, enviando los datos a tu API
        console.log('Registrando usuario:', formState);
    }

    return (
        <div className='registerPage'>
            <form className='registerForm' onSubmit={onSubmit}>
                <h1>Registrate</h1>
                <p className='registerDescription'>Inicia sesión con tu cuenta de Google o con tu correo electrónico.</p>
                <div className='formGroup'>
                    <label htmlFor='username'>Nombre de Usuario:</label>
                    <input type='text' id='username' name='username' value={formState.username} onChange={onInputChange} required />
                </div>
                <div className='formGroup'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' value={formState.email} onChange={onInputChange} required />
                </div>
                <div className='formGroup'>
                    <label htmlFor='password'>Contraseña:</label>
                    <input type='password' id='password' name='password' value={formState.password} onChange={onInputChange} required />
                </div>
                <div className='formActions'>
                    <span>Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></span>
                    <button type='submit' className='button'>Registrarse</button>
                </div>
            </form>
        </div>
    )
}
