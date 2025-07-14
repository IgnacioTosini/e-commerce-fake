import * as Yup from 'yup';

// Schema de validación combinado
export const productCreateSchema = Yup.object().shape({
    id: Yup.string().optional(),
    // Información básica
    title: Yup.string().required('El nombre es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
    brand: Yup.string().required('La marca es obligatoria'),
    categoryName: Yup.string().required('La categoría es obligatoria'),

    // Precio y descuento
    price: Yup.number().min(0, 'El precio debe ser mayor a 0').required('El precio es obligatorio'),
    discount: Yup.number().min(0).max(100, 'El descuento debe estar entre 0 y 100'),

    // Variantes (nuevo modelo)
    variants: Yup.array()
        .of(
            Yup.object().shape({
                id: Yup.string().required('ID de variante requerido'),
                size: Yup.string().required('Talle requerido'),
                color: Yup.string().required('Color requerido'),
                stock: Yup.number().min(0, 'El stock debe ser mayor o igual a 0').required('Stock requerido'),
                sku: Yup.string().optional(),
            })
        )
        .min(1, 'Debe tener al menos una variante'),
    // Campos informativos (opcional, según modelo)
    colors: Yup.array().of(Yup.string()),
    sizes: Yup.array().of(Yup.string()),

    // Imágenes: aceptar string (base64/url) o ProductImage (objeto con url y public_id)
    images: Yup.array().of(
        Yup.mixed()
            .test('is-string-or-productimage', 'Debe ser una URL, base64 o un objeto de imagen válido', (value) => {
                if (typeof value === 'string') return true;
                if (typeof value === 'object' && value !== null && 'url' in value && 'public_id' in value) {
                    // Validar que url sea string y public_id string (puede ser vacío)
                    return typeof value.url === 'string' && typeof value.public_id === 'string';
                }
                return false;
            })
    )
});

// Esquema para imágenes
export const imagesSchema = Yup.object({
    images: Yup.array()
        .of(
            Yup.string()
                .test('is-url-or-base64', 'Debe ser una URL válida o imagen base64', (value) => {
                    if (!value) return false;

                    // Verificar si es base64
                    if (value.startsWith('data:image/')) {
                        return true;
                    }

                    // Verificar si es URL válida
                    try {
                        new URL(value);
                        return true;
                    } catch {
                        return false;
                    }
                })
                .required('URL o imagen requerida')
        )
        .min(1, 'Debe tener al menos una imagen')
        .max(10, 'Máximo 10 imágenes permitidas')
        .required('Las imágenes son requeridas')
});
