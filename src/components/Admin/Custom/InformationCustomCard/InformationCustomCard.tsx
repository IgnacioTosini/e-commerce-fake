import { Field, ErrorMessage, useFormikContext } from 'formik'
import { CategoryManager } from '../../CategoryManager/CategoryManager';
import './_informationCustomCard.scss'

type SimpleInformationCardProps = {
    mode: 'create' | 'edit';
}

type InformationFormValues = {
    name: string;
    brand: string;
    description: string;
    sku: string;
    category: string;
};

export const InformationCustomCard = ({ mode }: SimpleInformationCardProps) => {
    const { setFieldValue, values } = useFormikContext<InformationFormValues>();

    const handleCategorySelect = (category: string) => {
        setFieldValue('category', category);
    };

    return (
        <div className='informationCustomCard'>
            <h2 className='informationCustomCardTitle'>Información del Producto</h2>
            <span className='informationCustomCardSubtitle'>
                {mode === 'edit' ? 'Editar' : 'Crear'} información básica
            </span>

            <div className='informationCustomCardForm'>
                <div className='informationCustomCardGroup'>
                    <div className='informationCustomCardInputGroup'>
                        <label htmlFor='name' className='informationCustomCardLabel'>
                            Nombre del producto *
                        </label>
                        <Field
                            type='text'
                            id='name'
                            name='name'
                            className='informationCustomCardInput'
                            placeholder='Ej: iPhone 15 Pro Max'
                        />
                        <ErrorMessage name='name' component='span' className='error' />
                    </div>

                    <div className='informationCustomCardInputGroup'>
                        <label htmlFor='brand' className='informationCustomCardLabel'>
                            Marca *
                        </label>
                        <Field
                            type='text'
                            id='brand'
                            name='brand'
                            className='informationCustomCardInput'
                            placeholder='Ej: Apple'
                        />
                        <ErrorMessage name='brand' component='span' className='error' />
                    </div>
                </div>

                <div className='informationCustomCardInputGroup'>
                    <label htmlFor='description' className='informationCustomCardLabel'>
                        Descripción *
                    </label>
                    <Field
                        as='textarea'
                        id='description'
                        name='description'
                        rows={4}
                        className='informationCustomCardInput textArea'
                        placeholder='Describe las características principales del producto...'
                    />
                    <ErrorMessage name='description' component='span' className='error' />
                </div>

                <div className='informationCustomCardGroup'>
                    <div className='informationCustomCardInputGroup'>
                        <label htmlFor='sku' className='informationCustomCardLabel'>
                            SKU *
                        </label>
                        <Field
                            type='text'
                            id='sku'
                            name='sku'
                            className='informationCustomCardInput'
                            placeholder='Ej: IPH15PM-128GB'
                        />
                        <ErrorMessage name='sku' component='span' className='error' />
                    </div>

                    <div className='informationCustomCardInputGroup'>
                        <label className='informationCustomCardLabel'>
                            Categoría *
                        </label>

                        {/* Mostrar la categoría actual en modo edición */}
                        {mode === 'edit' && values.category && (
                            <div className='previousValue'>
                                <span className='previousValueLabel'>Categoría actual:</span> {values.category}
                            </div>
                        )}

                        <CategoryManager
                            onCategorySelect={handleCategorySelect}
                            selectedCategory={values.category || ''}
                        />

                        <ErrorMessage name='category' component='span' className='error' />
                    </div>
                </div>
            </div>
        </div>
    );
};