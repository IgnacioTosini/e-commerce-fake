import * as Yup from 'yup';

// Esquema para perfil de usuario
export const userProfileSchema = Yup.object({
    name: Yup.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede tener más de 50 caracteres')
        .required('El nombre es requerido'),
    email: Yup.string()
        .email('Email inválido')
        .required('El email es requerido'),
    phone: Yup.string()
        .matches(/^[+]?[\d\s\-()]+$/, 'Número de teléfono inválido')
        .min(10, 'El teléfono debe tener al menos 10 dígitos'),
    address: Yup.string()
        .optional()
        .min(5, 'La dirección debe tener al menos 5 caracteres')
        .max(100, 'La dirección no puede tener más de 100 caracteres'),
    role: Yup.string()
        .optional()
        .oneOf(['admin', 'user'], 'Rol inválido')
        .required('El rol es requerido'),
    isActive: Yup.boolean()
        .optional()
        .oneOf([true, false], 'El estado de actividad debe ser verdadero o falso')
        .required('El estado de actividad es requerido'),
    image: Yup.string()
        .optional()
});

