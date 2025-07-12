import './_categoryCardSkeleton.scss';

export const CategoryCardSkeleton = () => {
    return (
        <div className="categoryCardSkeleton">
            <img src={''} alt={''} />
            <div className="categoryCardOverlaySkeleton">
                <h2 className="categoryCardTitleSkeleton">{''}</h2>
                <p className="categoryCardContentSkeleton"></p>
            </div>
        </div>
    );
};