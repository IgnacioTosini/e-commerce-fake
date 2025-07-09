import type { Product, User } from '../../../types';
import { Badge } from '../../ui/Badge/Badge';
import './_variantInformationCard.scss';

type VariantInformationCardProps = {
    data: Product | User | null | undefined;
};

export const VariantInformationCard = ({ data }: VariantInformationCardProps) => {
    return (
        <div className="variantInformationCard">
            <h2>Información de variantes</h2>
            <section className="variantInformationCardSection">
                <h2>Colores</h2>
                <span className='variantInformationCardColor'>
                    {(data as Product)?.colors?.length ? (
                        (data as Product)?.colors?.map((color, index) => (
                            <Badge key={index} color='info'>{color}</Badge>
                        ))
                    ) : (
                        <span>No hay colores disponibles</span>
                    )}
                </span>
            </section>
            <section className="variantInformationCardSection">
                <h2>Tallas</h2>
                <span className='variantInformationCardSize'>
                    {(data as Product)?.sizes?.length ? (
                        (data as Product)?.sizes?.map((size, index) => (
                            <Badge key={index} color='info'>{size}</Badge>
                        ))
                    ) : (
                        <span>No hay tallas disponibles</span>
                    )}
                </span>
            </section>
        </div>
    );
};
