import './_categoryManagerSkeleton.scss';

export const CategoryManagerSkeleton = () => {
    return (
        <div className="categoryManager skeleton">
            <div className="skeleton-select" />
            <div className="skeleton-list">
                {[1, 2, 3].map((i) => (
                    <div className="skeleton-item" key={i}>
                        <div className="skeleton-category" />
                        <div className="skeleton-btn" />
                    </div>
                ))}
            </div>
        </div>
    );
};
