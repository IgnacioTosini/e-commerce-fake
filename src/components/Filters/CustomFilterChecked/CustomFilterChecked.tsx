import { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { CustomFilterCheckedItem } from '../CustomFilterCheckedItem/CustomFilterCheckedItem';
import './_customFilterChecked.scss';

type CustomFilterCheckedProps = {
    categoryName?: string;
    array?: string[];
    onClick: (filter: string) => void;
    selectedFilters: string[]; // Asegurar que esta propiedad esté definida
    cant: Record<string, number>; // Cambiar el tipo de `cant` para aceptar un objeto con conteos
};

export const CustomFilterChecked = ({ categoryName, array, onClick, selectedFilters, cant }: CustomFilterCheckedProps) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleFilterClick = (filter: string) => {
        if (onClick) {
            onClick(filter);
        }
    };

    return (
        <div className="customFilterChecked">
            <button onClick={handleToggle} className={`customFilterCheckedButton ${open ? 'open' : ''}`}>
                {categoryName || 'Filtro'}
                {open ? <IoMdArrowDropup className='customFilterCheckedIcon' /> : <IoMdArrowDropdown className='customFilterCheckedIcon' />}
            </button>
            <div className={`customFilterCheckedList ${open ? 'open' : 'close'}`}>
                {array?.map((item, index) => (
                    <CustomFilterCheckedItem
                        key={index}
                        item={item}
                        index={index}
                        onClick={handleFilterClick}
                        categoryName={categoryName}
                        isSelected={selectedFilters.includes(item)}
                        cant={cant[item] || 0} // Pasar la cantidad específica
                    />
                ))}
            </div>
        </div>
    );
};