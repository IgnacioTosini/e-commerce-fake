import { Badge } from '../Badge/Badge'
import { CustomButton } from '../CustomButton/CustomButton'
import './_banner.scss'

export const Banner = () => {
    return (
        <div className='banner'>
            <Badge color='info'>Nueva Colección</Badge>
            <h1 className='bannerTitle'>Descubre la moda de verano</h1>
            <p className='bannerDescription'>Explora nuestra nueva colección de ropa y accesorios para el verano. ¡No te lo pierdas!</p>
            <div className='bannerButtons'>
                <CustomButton color='primary'>Ver Colección</CustomButton>
                <CustomButton color='secondary'>Ver Ofertas</CustomButton>
            </div>
        </div>
    )
}
