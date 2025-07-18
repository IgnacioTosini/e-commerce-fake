import './_customFilterCheckedItem.scss'

type CustomFilterCheckedItemProps = {
    item: string;
    index?: number;
    onClick: (filter: string) => void;
    categoryName?: string; // Se agrega categoryName para generar ids únicos
    isSelected: boolean; // Nueva propiedad para indicar si está seleccionado
    cant?: number; // Cantidad de elementos, opcional
};

export const CustomFilterCheckedItem = ({ item, index, onClick, categoryName, isSelected, cant }: CustomFilterCheckedItemProps) => {
    const uniqueId = `${categoryName || 'filter'}-${index}`; // Generar un id único
    const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation(); // Asegura que el evento no se propague innecesariamente
        onClick(item); // Llama a la función onClick con el filtro seleccionado
    };

    return (
        <div className="customFilterCheckedItem">
            <input
                type="checkbox"
                id={uniqueId}
                checked={isSelected}
                onChange={handleClick} // Asegura que el cambio del checkbox actualice los filtros
            />
            <label htmlFor={uniqueId} className="customFilterCheckedItemLabel">
                {item.replace(/_/g, ' ')} {/* Reemplazar guiones bajos por espacios */}
            </label>
            <span>({cant})</span>
        </div>
    );
};
