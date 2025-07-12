import './_galleryProductSkeleton.scss'

export const GalleryProductSkeleton = () => {
    return (
        <div className='galleryProductSkeleton'>
            <div className='mainImageSkeleton' />
            <div className='thumbnailContainerSkeleton'>
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className={`thumbnailSkeleton ${index === 0 ? 'active' : 'inactive'}`} />
                ))}
            </div>
        </div>
    )
}
