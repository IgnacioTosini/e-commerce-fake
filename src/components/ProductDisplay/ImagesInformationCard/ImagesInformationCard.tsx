import type { Product } from '../../../types'
import './_imagesInformationCard.scss'

type ImagesInformationCardProps = {
    product: Product | null | undefined;
}

export const ImagesInformationCard = ({ product }: ImagesInformationCardProps) => {
    return (
        <div className="imagesInformationCard">
            <h2>Imágenes</h2>
            <div className="imagesInformationCardSection">
                {product ? (
                    product.images.map((image, index) => (
                        <img key={index} src={image} alt={`Product Image ${index + 1}`} />
                    ))
                ) : (
                    <p>No hay imagenes</p>
                )}
            </div>
        </div>
    )
}
