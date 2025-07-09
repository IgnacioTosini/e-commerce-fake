import { useState } from 'react';
import { Badge } from '../../ui/Badge/Badge';
import { AVAILABLE_COLORS, AVAILABLE_SIZES } from '../../../utils/productVariants';
import './_variantSelector.scss';

interface VariantSelectorProps {
    type: 'colors' | 'sizes';
    selectedItems: string[];
    onSelectionChange: (items: string[]) => void;
}

export const VariantSelector = ({ type, selectedItems, onSelectionChange }: VariantSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const availableItems = type === 'colors' ? AVAILABLE_COLORS : AVAILABLE_SIZES;
    const label = type === 'colors' ? 'colores' : 'tallas';

    const filteredItems = availableItems.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleItemToggle = (item: string) => {
        const newSelection = selectedItems.includes(item)
            ? selectedItems.filter(selected => selected !== item)
            : [...selectedItems, item];

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
                                        type="checkbox"
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