import { Field, ErrorMessage } from 'formik'
import './_priceStockCard.scss'

// Props que mantienen compatibilidad con ambos modos
interface PriceStockCardProps {
    mode: 'create' | 'edit';
}

export const PriceStockCard = ({ mode }: PriceStockCardProps) => {
    return (
        <div className='priceStockCard'>
            <h2 className='priceStockCardTitle'>Precio y Stock</h2>
            <span className='priceStockCardSubtitle'>
                {mode === 'edit' ? 'Editar' : 'Crear'} precios y disponibilidad
            </span>

            <div className='priceStockCardContent'>
                <div className='priceStockCardGroup'>
                    <div className='priceStockCardInputGroup'>
                        <label htmlFor='price' className='priceStockCardLabel'>
                            Precio ($) *
                        </label>
                        <Field
                            type='number'
                            id='price'
                            name='price'
                            step='0.01'
                            min='0'
                            className='priceStockCardInput'
                            placeholder={mode === 'create' ? 'Ingrese el precio' : '0.00'}
                        />
                        <ErrorMessage name='price' component='span' className='error' />
                    </div>

                    <div className='priceStockCardInputGroup'>
                        <label htmlFor='stock' className='priceStockCardLabel'>
                            Stock *
                        </label>
                        <Field
                            type='number'
                            id='stock'
                            name='stock'
                            min='0'
                            step='1'
                            className='priceStockCardInput'
                            placeholder={mode === 'create' ? 'Cantidad disponible' : '0'}
                        />
                        <ErrorMessage name='stock' component='span' className='error' />
                    </div>

                    <div className='priceStockCardInputGroup'>
                        <label htmlFor='discount' className='priceStockCardLabel'>
                            Descuento (%)
                        </label>
                        <Field
                            type='number'
                            id='discount'
                            name='discount'
                            step='0.01'
                            min='0'
                            max='100'
                            className='priceStockCardInput'
                            placeholder={mode === 'create' ? 'Descuento opcional' : '0'}
                        />
                        <ErrorMessage name='discount' component='span' className='error' />
                        <small className='priceStockCardHelp'>
                            Descuento en porcentaje (0-100%)
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};
