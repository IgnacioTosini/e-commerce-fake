import type { Product } from '../../../../types'
import { GrUpload } from "react-icons/gr";
import { TbTrash } from 'react-icons/tb';
import './_imagesInformationEditCard.scss'

type ImagesInformationEditCardProps = {
    product: Product | null | undefined;
}

export const ImagesInformationEditCard = ({ product }: ImagesInformationEditCardProps) => {
    return (
        <div className="imagesInformationEditCard">
            <h2>Imágenes</h2>
            <div className="imagesInformationEditCardSection">
                {product ? (
                    product.images.map((image, index) => (
                        <div key={index} className='imageContainer'>
                            <img src={image} alt={`Product Image ${index + 1}`} className='image' />
                            <TbTrash className='removeImage' />
                        </div>
                    ))
                ) : (
                    <p>No hay imagenes</p>
                )}
                <button className='addButton'><GrUpload /> <span>Agregar imagen</span></button>
            </div>
        </div>
    )
}
