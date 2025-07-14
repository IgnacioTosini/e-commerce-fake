import './_galleryProduct.scss'

type GalleryProductProps = {
    images: string[];
    mainImage: string;
    setMainImage: (img: string) => void;
    onMainImageClick: () => void;
}

export const GalleryProduct = ({ images, mainImage, setMainImage, onMainImageClick }: GalleryProductProps) => {
    return (
        <div className='galleryProduct'>
            <img
                src={mainImage}
                alt='Imagen principal'
                className='mainImage'
                onClick={onMainImageClick}
                style={{ cursor: 'pointer' }}
            />
            <div className='thumbnailContainer'>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Product Image ${index + 1}`}
                        className={`thumbnail ${mainImage === image ? 'active' : 'inactive'}`}
                        onClick={() => setMainImage(image)}
                    />
                ))}
            </div>
        </div>
    )
}
