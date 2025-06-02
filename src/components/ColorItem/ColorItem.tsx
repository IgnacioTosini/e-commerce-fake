import { colorMap } from '../../utils/colorList';
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
            style={{ backgroundColor: colorMap[color] || color }}
            onClick={onClick}
        >
        </div>
    );
};
