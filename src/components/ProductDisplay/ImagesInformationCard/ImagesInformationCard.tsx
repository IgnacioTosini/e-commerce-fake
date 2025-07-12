import { useSelector } from 'react-redux';
import type { Product } from '../../../types'
import type { RootState } from '../../../store/store';
import { ImagesInformationCardSkeleton } from '../../Admin/Custom/ImagesInformationCard/ImagesInformationCardSkeleton';
import './_imagesInformationCard.scss'

type ImagesInformationCardProps = {
    product: Product | null | undefined;
}

export const ImagesInformationCard = ({ product }: ImagesInformationCardProps) => {
    const { isLoading } = useSelector((state: RootState) => state.products);

    if (isLoading) {
        return <ImagesInformationCardSkeleton />;
    }
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
