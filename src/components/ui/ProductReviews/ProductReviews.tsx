import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { useRealtimeReviews } from '../../../hooks/useRealtimeReviews';
import './_productReviews.scss';

type ProductReviewsProps = {
    productId: string;
};

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
    const { reviews, loading, error } = useSelector((state: RootState) => state.reviews);
    useRealtimeReviews(productId);

    return (
        <section className="productReviews">
            <h3>Reseñas / Preguntas</h3>
            {loading && reviews.length === 0 && <p className="loading">Cargando respuestas...</p>}
            {error && <p className="error">{error}</p>}
            <ul>
                {reviews.length !== 0 && (
                    reviews.map(review => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                        />
                    ))
                )}
            </ul>
            <ReviewForm productId={productId} />
        </section>
    );
};