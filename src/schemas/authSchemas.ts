import * as Yup from 'yup';

// Esquema para login
export const loginSchema = Yup.object({
    email: Yup.string()
        .email('Email inválido')
        .required('El email es requerido'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es requerida')
});

// Esquema para registro
export const registerSchema = Yup.object({
    displayName: Yup.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede tener más de 50 caracteres')
        .required('El nombre es requerido'),
    email: Yup.string()
        .email('Email inválido')
        .required('El email es requerido'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'La contraseña debe contener al menos una letra minúscula, una mayúscula y un número'
        )
        .required('La contraseña es requerida'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
        .required('Confirmar contraseña es requerido')
});

// Esquema para cambio de contraseña
export const changePasswordSchema = Yup.object({
    currentPassword: Yup.string()
        .required('La contraseña actual es requerida'),
    newPassword: Yup.string()
        .min(6, 'La nueva contraseña debe tener al menos 6 caracteres')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'La contraseña debe contener al menos una letra minúscula, una mayúscula y un número'
        )
        .required('La nueva contraseña es requerida'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Las contraseñas deben coincidir')
        .required('Confirmar nueva contraseña es requerido')
});

// Esquema para recuperación de contraseña
export const forgotPasswordSchema = Yup.object({
    email: Yup.string()
        .email('Email inválido')
        .required('El email es requerido')
});
