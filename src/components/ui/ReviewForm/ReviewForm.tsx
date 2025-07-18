import { ErrorMessage, Field, Formik } from 'formik';
import type { Review } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { loadReviewsForProduct, startCreateReview, startUpdateReview } from '../../../store/reviews/thunks';
import type { RootState } from '../../../store/store';
import type { AppDispatch } from '../../../store/store';
import { reviewSchema } from '../../../schemas/reviewSchemas';
import { toast } from 'react-toastify';
import './_reviewForm.scss';
import { setReviewSelected } from '../../../store/reviews/reviewsSlice';

const initialValues: Omit<Review, 'id' | 'createdAt' | 'updatedAt'> = {
    rating: 0,
    comment: '',
    images: [],
    isVerified: false,
    likes: 0,
    sellerReply: '',
    productId: '',
    userId: '',
};

type ReviewFormProps = {
    productId: string;
};

export const ReviewForm = ({ productId }: ReviewFormProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user: { id: userId } } = useSelector((state: RootState) => state.user);
    const { reviewSelected } = useSelector((state: RootState) => state.reviews);

    // Determinar valores iniciales
    const formInitialValues = reviewSelected
        ? {
            rating: reviewSelected.rating,
            comment: reviewSelected.comment,
            images: reviewSelected.images || [],
            isVerified: reviewSelected.isVerified || false,
            likes: reviewSelected.likes || 0,
            sellerReply: reviewSelected.sellerReply || '',
            productId: reviewSelected.productId,
            userId: reviewSelected.userId,
        }
        : {
            ...initialValues,
            productId,
            userId: userId || '',
        };

    // Handler para crear o editar
    const handleSubmitReview = async (
        values: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>,
        { resetForm }: { resetForm: () => void }
    ) => {
        if (reviewSelected) {
            // Editar
            await dispatch(startUpdateReview({ ...reviewSelected, ...values }));
            await dispatch(loadReviewsForProduct(productId));
            dispatch(setReviewSelected(null));
            toast.success('Reseña actualizada con éxito');
        } else {
            // Crear
            await dispatch(startCreateReview({ ...values, productId, userId }));
            await dispatch(loadReviewsForProduct(productId));
            toast.success('Reseña enviada con éxito');
        }
        resetForm();
    };

    return (
        <div className="reviewFormContainer">
            <h4>{reviewSelected ? 'Editar reseña' : 'Deja tu reseña'}</h4>
            <Formik
                enableReinitialize
                initialValues={formInitialValues}
                validationSchema={reviewSchema}
                onSubmit={handleSubmitReview}
            >
                {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
                    <form onSubmit={handleSubmit} className="reviewForm">
                        <div className="formGroup ratingGroup">
                            <label htmlFor="rating">Calificación:</label>
                            <div className="starsInput">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span
                                        key={star}
                                        className={star <= values.rating ? 'star filled' : 'star'}
                                        onClick={() => setFieldValue('rating', star)}
                                        role="button"
                                        aria-label={`Calificar con ${star} estrellas`}
                                        tabIndex={0}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter' || e.key === ' ') setFieldValue('rating', star);
                                        }}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <ErrorMessage name="rating" component="div" className="errorMsg" />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="comment">Comentario:</label>
                            <Field
                                as="textarea"
                                name="comment"
                                id="comment"
                                rows={3}
                                placeholder="¿Qué te pareció el producto?"
                                className="commentInput"
                            />
                            <ErrorMessage name="comment" component="div" className="errorMsg" />
                        </div>
                        <div className='formGroup'>
                            <button type="submit" disabled={isSubmitting} className="submitBtn">
                                {isSubmitting ? 'Enviando...' : 'Enviar Reseña'}
                            </button>
                            {reviewSelected && (
                                <button type="button" className="submitBtn" onClick={() => dispatch(setReviewSelected(null))}>
                                    Cancelar Edición
                                </button>
                            )}
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}
