import { useState, useEffect } from 'react';
import './_galleryProduct.scss'

type GalleryProductProps = {
    images: string[];
}

export const GalleryProduct = ({ images }: GalleryProductProps) => {
    const [mainImage, setMainImage] = useState<string>(images[0]);

    // Actualizar la imagen principal cuando cambie el array de imágenes
    useEffect(() => {
        setMainImage(images[0]);
    }, [images]);

    return (
        <div className='galleryProduct'>
            <img src={mainImage} alt='Imagen principal' className='mainImage' />
            <div className='thumbnailContainer'>
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Product Image ${index + 1}`} className={`thumbnail ${mainImage === image ? 'active' : 'inactive'}`} onClick={() => setMainImage(image)} />
                ))}
            </div>
        </div>
    )
}
