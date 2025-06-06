import './_sizeItem.scss';

type SizeItemProps = {
    size: string;
    isActive: boolean;
    onClick: () => void;
};

export const SizeItem = ({ size, isActive, onClick }: SizeItemProps) => {
    return (
        <div
            className={`sizeItem ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            {size}
        </div>
    );
};