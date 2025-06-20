import type { Product } from '../../../../types';
import './_priceStockEditCard.scss';

type PriceStockEditCardProps = {
    product: Product | null;
}

export const PriceStockEditCard = ({ product }: PriceStockEditCardProps) => {
    return (
        <div className='priceStockEditCard'>
            <h2 className='priceStockEditCardTitle'>Precio y Stock</h2>
            <div className='priceStockEditCardContent'>
                <div className='priceStockEditCardGroup'>
                    <div className='priceStockEditCardInputGroup'>
                        <label className='priceStockEditCardLabel'>Precio ($)</label>
                        <input
                            type='number'
                            className='priceStockEditCardInput'
                            defaultValue={product ? product.price : ''}
                        />
                    </div>
                    <div className='priceStockEditCardInputGroup'>
                        <label className='priceStockEditCardLabel'>Stock</label>
                        <input
                            type='number'
                            className='priceStockEditCardInput'
                            defaultValue={product ? product.stock : ''}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
