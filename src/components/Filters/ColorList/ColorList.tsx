import { useEffect, useState } from 'react';
import { ColorItem } from '../ColorItem/ColorItem';
import './_colorList.scss'

type ColorListProps = {
    colors?: string[];
    onColorSelect: (color: string) => void;
    resetSelection?: boolean;
};

export const ColorList = ({ colors, onColorSelect, resetSelection }: ColorListProps) => {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    useEffect(() => {
        if (resetSelection) {
            setSelectedColor(null);
        }
    }, [resetSelection]);

    const handleColorClick = (color: string) => {
        setSelectedColor(color);
        onColorSelect(color);
        if(selectedColor === color) {
            setSelectedColor(null);
        }
    };

    return (
        <div className="colorList">
            {colors?.map((color, index) => (
                <ColorItem key={index} color={color} isActive={color === selectedColor} onClick={() => handleColorClick(color)} />
            ))}
        </div>
    );
};
