import { AVAILABLE_COLORS } from '../../../utils/productVariants';
import './_colorItem.scss'

type ColorItemProps = {
    color: string;
    isActive: boolean;
    onClick: () => void;
}

export const ColorItem = ({ color, isActive, onClick }: ColorItemProps) => {
    return (
        <div
            className={`colorItem ${isActive ? 'active' : ''}`}
            style={{ backgroundColor: AVAILABLE_COLORS[color as keyof typeof AVAILABLE_COLORS] || color }}
            onClick={onClick}
        >
        </div>
    );
};
