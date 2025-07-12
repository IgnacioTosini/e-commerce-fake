import React from 'react';
import './_informationCustomCardSkeleton.scss';

export const InformationCustomCardSkeleton: React.FC = () => {
    return (
        <div className='informationCustomCard'>
            <h2 className='informationCustomCardTitle skeleton-title' />
            <span className='informationCustomCardSubtitle skeleton-subtitle' />
            <div className='informationCustomCardForm'>
                <div className='informationCustomCardGroup'>
                    <div className='informationCustomCardInputGroup'>
                        <div className='skeleton-label' />
                        <div className='skeleton-input' />
                    </div>
                    <div className='informationCustomCardInputGroup'>
                        <div className='skeleton-label' />
                        <div className='skeleton-input' />
                    </div>
                </div>
                <div className='informationCustomCardGroup'>
                    <div className='informationCustomCardInputGroup'>
                        <div className='skeleton-label' />
                        <div className='skeleton-textarea' />
                    </div>
                    <div className='informationCustomCardInputGroup'>
                        <div className='skeleton-label' />
                        <div className='skeleton-select' />
                    </div>
                </div>
            </div>
        </div>
    );
};
