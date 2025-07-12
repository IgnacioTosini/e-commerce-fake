import './_cartItemCardSkeleton.scss'

export const CartItemCardSkeleton = () => {
    return (
        <div className='cartItemCardSkeleton'>
            <div className='cartItemCardImageSkeleton' />
            <div className='cartItemCardDetailsContainerSkeleton'>
                <div className='cartItemCardDetailsSkeleton'>
                    <div className='cartItemCardInfoSkeleton'>
                        <div className='cartItemCardTitleSkeleton' />
                        <div className='cartItemCardDescriptionSkeleton' />
                    </div>
                    <div className='cartItemCardPriceContainerSkeleton'>
                        <div className='cartItemCardPriceSkeleton' />
                        <div className='cartItemCardPriceSkeleton discount' />
                    </div>
                </div>
                <div className='cartItemCardActionsSkeleton'>
                    <div className='counterSkeleton' />
                    <div className='cartItemCardRemoveButtonSkeleton' />
                </div>
            </div>
        </div>
    )
}
