import { useState } from 'react';
import { Badge } from '../../ui/Badge/Badge';
import { AVAILABLE_COLORS, AVAILABLE_SIZES } from '../../../utils/productVariants';
import './_variantSelector.scss';

interface VariantSelectorProps {
    type: 'colors' | 'sizes';
    selectedItems: string[];
    onSelectionChange: (items: string[]) => void;
    options?: string[]; // Opciones permitidas (sobrescribe las default)
    singleSelect?: boolean; // Si true, solo permite seleccionar una opción
}

export const VariantSelector = ({ type, selectedItems, onSelectionChange, options, singleSelect }: VariantSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const availableItems = (options && options.length > 0)
        ? options
        : (type === 'colors' ? Object.keys(AVAILABLE_COLORS) : Object.values(AVAILABLE_SIZES));
    const label = type === 'colors' ? 'colores' : 'tallas';

    const filteredItems = availableItems.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleItemToggle = (item: string) => {
        let newSelection: string[];
        if (singleSelect) {
            newSelection = selectedItems.includes(item) ? [] : [item];
        } else {
            newSelection = selectedItems.includes(item)
                ? selectedItems.filter(selected => selected !== item)
                : [...selectedItems, item];
        }
        onSelectionChange(newSelection);
    };

    return (
        <div className='variantSelector'>
            {/* Mostrar items seleccionados */}
            <div className='variantSelectorSelected'>
                {selectedItems.length > 0 ? (
                    selectedItems.map((item, index) => (
                        <div key={index} className='variantSelectorBadgeWrapper'>
                            <Badge color='info'>
                                {item}
                            </Badge>
                        </div>
                    ))
                ) : (
                    <span className='variantSelectorEmpty'>
                        No hay {label} seleccionados
                    </span>
                )}
            </div>

            {/* Selector desplegable */}
            <div className='variantSelectorDropdown'>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className='variantSelectorTrigger'
                >
                    Seleccionar {label} {isOpen ? '▼' : '▶'}
                </button>

                {isOpen && (
                    <div className='variantSelectorMenu'>
                        <input
                            type="text"
                            placeholder={`Buscar ${label}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='variantSelectorSearch'
                        />

                        <div className='variantSelectorOptions'>
                            {filteredItems.map((item) => (
                                <label key={item} className='variantSelectorOption'>
                                    <input
                                        type={singleSelect ? 'radio' : 'checkbox'}
                                        name={singleSelect ? `variant-${type}` : undefined}
                                        checked={selectedItems.includes(item)}
                                        onChange={() => handleItemToggle(item)}
                                    />
                                    <span>{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};