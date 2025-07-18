import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import type { Review, User } from '../../../types'
import { RatingStars } from '../../ProductDisplay/RatingStars/RatingStars';
import { CustomButton } from '../CustomButton/CustomButton';
import { loadReviewsForProduct, startDeleteReview } from '../../../store/reviews/thunks';
import { toast } from 'react-toastify';
import './_reviewCard.scss'
import { setReviewSelected } from '../../../store/reviews/reviewsSlice';

type ReviewCardProps = {
    review: Review
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
    const { users } = useSelector((state: RootState) => state.user);
    const auth = useSelector((state: RootState) => state.auth);
    const user = users.find(u => u.id === review.userId) || { name: 'Usuario Anónimo' } as User;
    const currentUser = users.find(u => u.id === auth.uid);
    const dispatch = useDispatch<AppDispatch>();
    const image =
        typeof user.image?.url === 'string'
            ? user.image?.url
            : typeof user.photoURL === 'string'
                ? user.photoURL
                : 'https://placehold.co/400x400/png?text=Usuario';

    const handleDeleteReview = async () => {
        dispatch(startDeleteReview(review.id));
        await dispatch(loadReviewsForProduct(review.productId));
        toast.success('Reseña eliminada con éxito');
    };

    const handleEditReview = () => {
        dispatch(setReviewSelected(review));
    };

    return (
        <li className="reviewCard">
            <div className='reviewCardContent'>
                <img src={image} alt={user.name} />
                <small>Por: {user.name} </small>
            </div>
            <div className='reviewCardFooter'>
                <div className='reviewCardDetails'>
                    <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                    <RatingStars rating={review.rating} />
                    <p>{review.comment}</p>
                </div>
                {(
                    currentUser?.role === 'admin' ||
                    (currentUser?.role === 'user' && currentUser?.id === review.userId)
                ) && (
                    <div className='reviewCardActions'>
                        <CustomButton type='button' color='primary' className='editReviewButton' onClick={handleEditReview}>
                            Editar comentario
                        </CustomButton>
                        <CustomButton type='button' color='secondary' className='deleteReviewButton' onClick={handleDeleteReview}>
                            Eliminar comentario
                        </CustomButton>
                    </div>
                )}
            </div>
        </li>
    )
}
