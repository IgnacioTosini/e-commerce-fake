import { useEffect, useState } from 'react';
import { SizeItem } from '../SizeItem/SizeItem';
import './_sizeList.scss';

type SizeListProps = {
    sizes?: string[];
    onSizeSelect: (size: string) => void;
    resetSelection?: boolean;
};

export const SizeList = ({ sizes, onSizeSelect, resetSelection }: SizeListProps) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    useEffect(() => {
        if (resetSelection) {
            setSelectedSize(null);
        }
    }, [resetSelection]);

    const handleSizeClick = (size: string) => {
        setSelectedSize(size);
        onSizeSelect(size);
    };

    return (
        <div className="sizeList">
            {(sizes ?? []).map(size => (
                <SizeItem
                    key={size}
                    size={size}
                    isActive={size === selectedSize}
                    onClick={() => handleSizeClick(size)}
                />
            ))}
        </div>
    );
};
