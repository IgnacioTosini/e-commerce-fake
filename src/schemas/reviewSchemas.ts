import * as Yup from 'yup';

export const reviewSchema = Yup.object().shape({
    productId: Yup.string().required('El ID del producto es obligatorio'),
    userId: Yup.string().required('El ID del usuario es obligatorio'),
    rating: Yup.number()
        .min(1, 'La calificación mínima es 1')
        .max(5, 'La calificación máxima es 5')
        .required('La calificación es obligatoria'),
    comment: Yup.string().max(500, 'El comentario no puede exceder los 500 caracteres').required('El comentario es obligatorio'),
    images: Yup.array()
        .of(
            Yup.string()
                .test('is-url-or-base64', 'Debe ser una URL válida o imagen base64', (value) => {
                    if (!value) return false;
                    if (value.startsWith('data:image/')) return true;
                    try {
                        new URL(value);
                        return true;
                    } catch {
                        return false;
                    }
                })
        )
        .max(5, 'No se pueden adjuntar más de 5 imágenes'),
    isVerified: Yup.boolean(),
    likes: Yup.number().min(0, 'Los "likes" no pueden ser negativos'),
    sellerReply: Yup.string().max(500, 'La respuesta del vendedor no puede exceder los 500 caracteres'),
    createdAt: Yup.date(),
    updatedAt: Yup.date()
});