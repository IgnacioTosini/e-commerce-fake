import { useState } from 'react';
import { useFormikContext } from 'formik';
import { VariantSelector } from '../../VariantSelector/VariantSelector';
import type { ProductVariant } from '../../../../types';
import './_variantInformationCard.scss';

interface VariantInformationCardProps {
    mode: 'create' | 'edit';
}

interface FormValues {
    variants: ProductVariant[];
    sizes?: string[];
    colors?: string[];
}

export const VariantInformationCard = ({ mode }: VariantInformationCardProps) => {
    const { values, setFieldValue } = useFormikContext<FormValues>();

    // Estado para selección y edición de variantes
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [stock, setStock] = useState(0);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Genera un id único simple (puedes usar uuid si tienes la lib)
    const generateId = () => `${selectedSize}-${selectedColor}-${Date.now()}`;

    const resetForm = () => {
        setSelectedSize('');
        setSelectedColor('');
        setStock(0);
        setEditingId(null);
    };

    const handleAddOrUpdateVariant = () => {
        if (!selectedSize || !selectedColor) return;
        if (editingId) {
            // Editar variante existente
            setFieldValue('variants', (values.variants || []).map(v =>
                v.id === editingId
                    ? { ...v, size: selectedSize, color: selectedColor, stock }
                    : v
            ));
        } else {
            // Evitar duplicados
            const exists = (values.variants || []).some(v => v.size === selectedSize && v.color === selectedColor);
            if (exists) return;
            setFieldValue('variants', [
                ...(values.variants || []),
                { id: generateId(), size: selectedSize, color: selectedColor, stock, image: '' },
            ]);
        }
        resetForm();
    };

    const handleRemoveVariant = (id: string) => {
        setFieldValue('variants', (values.variants || []).filter(v => v.id !== id));
        if (editingId === id) resetForm();
    };

    const handleEditVariant = (variant: ProductVariant) => {
        setSelectedSize(variant.size);
        setSelectedColor(variant.color);
        setStock(variant.stock);
        setEditingId(variant.id);
    };

    return (
        <div className='variantInformationCard'>
            <h2 className='variantInformationCardTitle'>Información de variantes</h2>
            <span className='variantInformationCardSubtitle'>
                {mode === 'edit' ? 'Editar' : 'Agregar'} variantes (talle + color + stock)
            </span>

            <div className='variantInformationCardContent'>
                {/* Formulario para agregar nueva variante usando VariantSelector */}
                <section className='variantInformationCardSection'>
                    <h3 className='variantInformationCardSectionTitle'>Agregar variante</h3>
                    <div className='variantFormRow'>
                        <VariantSelector
                            type='sizes'
                            selectedItems={selectedSize ? [selectedSize] : []}
                            onSelectionChange={arr => setSelectedSize(arr[0] || '')}
                            options={values.sizes || []}
                            singleSelect
                        />
                        <VariantSelector
                            type='colors'
                            selectedItems={selectedColor ? [selectedColor] : []}
                            onSelectionChange={arr => setSelectedColor(arr[0] || '')}
                            options={values.colors || []}
                            singleSelect
                        />
                        <label htmlFor="stock">Stock</label>
                        <input
                            type='number'
                            placeholder='Stock'
                            min={0}
                            value={stock}
                            onChange={e => setStock(Number(e.target.value))}
                        />
                        <section className='variantFormActions'>
                            <button type='button' className='buttonVariant' onClick={handleAddOrUpdateVariant}>
                                {editingId ? 'Actualizar' : 'Agregar'}
                            </button>
                            {editingId && (
                                <button type='button' className='buttonVariant' onClick={resetForm} style={{ marginLeft: 8 }}>Cancelar</button>
                            )}
                        </section>
                    </div>
                </section>
                <section className='variantInformationCardSection'>
                    <h3 className='variantInformationCardSectionTitle'>Variantes existentes</h3>
                    <div className='variantList'>
                        {(values.variants || []).map(variant => (
                            <div key={variant.id} className='variantListItem'>
                                <span
                                    style={{ cursor: 'pointer', textDecoration: editingId === variant.id ? 'underline' : 'none' }}
                                    onClick={() => handleEditVariant(variant)}
                                    title='Editar variante'
                                >
                                    {variant.size} / {variant.color} / {variant.stock}
                                </span>
                                <button type='button' className='buttonVariant' onClick={() => handleRemoveVariant(variant.id)}>Eliminar</button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};