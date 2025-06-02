import './_ratingStars.scss'

type RatingStarsProps = {
    rating: number;
}

export const RatingStars = ({ rating }: RatingStarsProps) => {
    return (
        <div className='ratingStars'>
            {Array.from({ length: 5 }, (_, index) => (
                <span key={index} className={index < rating ? 'filled' : ''}>
                    ★
                </span>
            ))}
        </div>
    )
}
