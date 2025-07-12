import { Link } from 'react-router';
import './_quickActionCardSkeleton.scss';

export const QuickActionCardSkeleton = () => {
    return (
        <div className='quickActionCardSkeleton'>
            <div className='quickActionCardHeaderSkeleton'>
            <picture className='quickActionCardIcon'></picture>
            <h2 className='quickActionCardTitle'></h2>
            </div>
            <div className='quickActionCardLinksSkeleton'>
                {[1, 2, 3].map((i) => (
                    <Link key={i} to={''} className='quickActionCardLinkSkeleton'></Link>
                ))}
            </div>
        </div>
    )
}
