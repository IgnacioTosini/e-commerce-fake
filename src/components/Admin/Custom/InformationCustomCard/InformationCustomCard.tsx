
import { Field, ErrorMessage, useFormikContext } from 'formik';
import { CategoryManager } from '../../CategoryManager/CategoryManager';
import { InformationCustomCardSkeleton } from './InformationCustomCardSkeleton';
import type { RootState } from '../../../../store/store';
import { useSelector } from 'react-redux';
import './_informationCustomCard.scss';

type SimpleInformationCardProps = {
    mode: 'create' | 'edit';
}

type InformationFormValues = {
    title: string;
    brand: string;
    description: string;
    categoryName: string;
};

export const InformationCustomCard = ({ mode }: SimpleInformationCardProps) => {
    const { setFieldValue, values } = useFormikContext<InformationFormValues>();
    const { isLoading } = useSelector((state: RootState) => state.products);

    if (isLoading) {
        return <InformationCustomCardSkeleton />;
    }

    const handleCategorySelect = (category: string) => {
        setFieldValue('categoryName', category);
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
                        <label htmlFor='title' className='informationCustomCardLabel'>
                            Nombre del producto *
                        </label>
                        <Field
                            type='text'
                            id='title'
                            name='title'
                            className='informationCustomCardInput'
                            placeholder='Ej: iPhone 15 Pro Max'
                        />
                        <ErrorMessage name='title' component='span' className='error' />
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

                <div className='informationCustomCardGroup'>
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

                    <div className='informationCustomCardInputGroup'>
                        <label className='informationCustomCardLabel'>
                            Categoría *
                        </label>

                        {/* Mostrar la categoría actual en modo edición */}

                        {mode === 'edit' && values.categoryName && (
                            <div className='previousValue'>
                                <span className='previousValueLabel'>Categoría actual:</span> {values.categoryName}
                            </div>
                        )}

                        <CategoryManager
                            onCategorySelect={handleCategorySelect}
                            selectedCategory={values.categoryName || ''}
                        />

                        <ErrorMessage name='categoryName' component='span' className='error' />
                    </div>
                </div>
            </div>
        </div>
    );
};