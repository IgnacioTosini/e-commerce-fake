import { SizeItemSkeleton } from '../SizeItem/SizeItemSkeleton';
import './_sizeListSkeleton.scss';

export const SizeListSkeleton = () => {
    return (
        <div className="sizeListSkeleton">
            {Array.from({ length: 5 }).map((_, index) => (
                <SizeItemSkeleton key={index} />
            ))}
        </div>
    );
};
