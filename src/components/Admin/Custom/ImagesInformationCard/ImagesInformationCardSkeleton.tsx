import React from 'react';
import './_imagesInformationCardSkeleton.scss';

export const ImagesInformationCardSkeleton: React.FC = () => {
    return (
        <div className="imagesInformationCard">
            <h2 className="imagesInformationCardTitle skeleton-title" />
            <span className="imagesInformationCardSubtitle skeleton-subtitle" />
            <div className="imagesInformationCardForm">
                <div className="imagesInformationCardSection">
                    <div className="imagesList">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <div className="imageContainer skeleton-image" key={idx} />
                        ))}
                    </div>
                    <div className="imageControls">
                        <div className="controlButtons">
                            <button type="button" className="addButton skeleton-btn" disabled />
                        </div>
                        <div className="imageInfo">
                            <small className="skeleton-info" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};