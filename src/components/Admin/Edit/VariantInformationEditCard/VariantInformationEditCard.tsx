import type { Product, User } from '../../../../types';
import { Badge } from '../../../ui/Badge/Badge';
import { RxCross2 } from "react-icons/rx";
import './_variantInformationEditCard.scss';

type VariantInformationCardProps = {
    data: Product | User | null | undefined;
    type: 'product' | 'user';
};

export const VariantInformationEditCard = ({ data, type }: VariantInformationCardProps) => {
    return (
        <div className="variantInformationEditCard">
            <h2>Variantes</h2>
            {type === 'product' ? (
                <form className="variantInformationEditCardForm">
                    <section className="variantInformationEditCardSection">
                        <h2>Colores</h2>
                        <span className='variantInformationEditCardColor'>
                            {(data as Product)?.colors?.map((color, index) => (
                                <Badge key={index} color='info'>
                                    {color}
                                    <RxCross2 className='remove' onClick={() => { }} />
                                </Badge>
                            ))}
                        </span>
                        <input type="text" name="color" id="color" placeholder='Agregar color' />
                    </section>
                    <section className="variantInformationEditCardSection">
                        <h2>Tallas</h2>
                        <span className='variantInformationEditCardSize'>
                            {(data as Product)?.sizes?.map((size, index) => (
                                <Badge key={index} color='info'>
                                    {size}
                                    <RxCross2 className='remove' onClick={() => { }} />
                                </Badge>
                            ))}
                        </span>
                        <input type="text" name="size" id="size" placeholder='Agregar talla' />
                    </section>
                </form>
            ) : (
                <h2>Este componente no aplica para usuarios.</h2>
            )}
        </div>
    );
};
