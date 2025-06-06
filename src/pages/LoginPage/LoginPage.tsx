import './_loginPage.scss'

export const LoginPage = () => {

    return (
        <div className='loginPage'>
            <form className='loginForm'>
            <h1>Iniciar Sesión</h1>
            <p className='loginDescription'>Inicia sesión con tu cuenta de Google o con tu correo electrónico.</p>
            <div className='googleLogin'>
            </div>
                <div className='formGroup'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' required />
                </div>
                <div className='formGroup'>
                    <label htmlFor='password'>Contraseña</label>
                    <input type='password' id='password' name='password' required />
                </div>
                <button type='submit' className='button'>Iniciar Sesión</button>
            </form>
        </div>
    )
}
