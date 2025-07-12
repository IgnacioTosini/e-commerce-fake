import { ColorItemSkeleton } from '../ColorItem/ColorItemSkeleton';
import './_colorListSkeleton.scss'

export const ColorListSkeleton = () => {
    return (
        <div className="colorListSkeleton">
            {[1, 2, 3, 4].map((_, index) => (
                <ColorItemSkeleton key={index} />
            ))}
        </div>
    );
};
