import type { Icon } from '../../../types';
import { CustomIcon } from '../../ui/CustomIcon/CustomIcon'
import './_iconList.scss'

type IconListProps = {
    icons: Icon[];
}

export const IconList = ({ icons }: IconListProps) => {
    return (
        <div className='iconList'>
            {icons.map(icon => (
                <CustomIcon key={icon.image} typeOfIcon={icon.image} />
            ))}
        </div>
    )
}
