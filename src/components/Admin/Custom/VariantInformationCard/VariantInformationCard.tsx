import { ErrorMessage, useFormikContext } from 'formik';
import { VariantSelector } from '../../VariantSelector/VariantSelector';
import './_variantInformationCard.scss';

interface VariantInformationCardProps {
    mode: 'create' | 'edit';
}

interface FormValues {
    colors: string[];
    sizes: string[];
}

export const VariantInformationCard = ({ mode }: VariantInformationCardProps) => {
    const { values, setFieldValue } = useFormikContext<FormValues>();

    const handleColorsChange = (colors: string[]) => {
        setFieldValue('colors', colors);
    };

    const handleSizesChange = (sizes: string[]) => {
        setFieldValue('sizes', sizes);
    };

    return (
        <div className='variantInformationCard'>
            <h2 className='variantInformationCardTitle'>Información de variantes</h2>
            <span className='variantInformationCardSubtitle'>
                {mode === 'edit' ? 'Editar' : 'Seleccionar'} colores y tallas disponibles
            </span>

            <div className='variantInformationCardContent'>
                {/* Sección de Colores */}
                <section className='variantInformationCardSection'>
                    <h3 className='variantInformationCardSectionTitle'>Colores</h3>

                    <VariantSelector
                        type="colors"
                        selectedItems={values.colors || []}
                        onSelectionChange={handleColorsChange}
                    />

                    <ErrorMessage name="colors" component="span" className="error" />
                </section>

                {/* Sección de Tallas */}
                <section className='variantInformationCardSection'>
                    <h3 className='variantInformationCardSectionTitle'>Tallas</h3>

                    <VariantSelector
                        type="sizes"
                        selectedItems={values.sizes || []}
                        onSelectionChange={handleSizesChange}
                    />

                    <ErrorMessage name="sizes" component="span" className="error" />
                </section>
            </div>
        </div>
    );
};