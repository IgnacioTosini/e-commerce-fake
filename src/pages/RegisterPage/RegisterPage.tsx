import './_registerPage.scss'

export const RegisterPage = () => {
    return (
        <div className='registerPage'>
            <form className='registerForm'>
                <h1>Registrate</h1>
                <p className='registerDescription'>Inicia sesión con tu cuenta de Google o con tu correo electrónico.</p>
                <div className='formGroup'>
                    <label htmlFor='username'>Nombre de Usuario:</label>
                    <input type='text' id='username' name='username' required />
                </div>
                <div className='formGroup'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' required />
                </div>
                <div className='formGroup'>
                    <label htmlFor='password'>Contraseña:</label>
                    <input type='password' id='password' name='password' required />
                </div>
                <div className='formGroup'>
                    <label htmlFor='confirmPassword'>Confirmar Contraseña:</label>
                    <input type='password' id='confirmPassword' name='confirmPassword' required />
                </div>
                <button type='submit' className='button'>Registrarse</button>
            </form>
        </div>
    )
}
