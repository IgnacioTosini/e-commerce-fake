import { Counter } from '../../ui/Counter/Counter'
import { CustomButton } from '../../ui/CustomButton/CustomButton'
import { RatingStars } from '../RatingStars/RatingStars'
import { CustomList } from '../../ui/CustomList/CustomList'
import { GalleryProductSkeleton } from '../GalleryProduct/GalleryProductSkeleton'
import { ColorListSkeleton } from '../../Filters/ColorList/ColorListSkeleton'
import { SizeListSkeleton } from '../../Filters/SizeList/SizeListSkeleton'
import { ProductCardSkeleton } from '../ProductCard/ProductCardSkeleton'
import './_productDetailsSkeleton.scss'

export const ProductDetailsSkeleton = () => {
    return (
        <>
            <div className='productDetailsContainerSkeleton'>
                <GalleryProductSkeleton />
                <section className='productDetailsSkeleton'>
                    <section className='productDetailsInfoSkeleton'>
                        <h2 className='productDetailsTitleSkeleton'></h2>
                        <div className='productDetailsRatingSkeleton'>
                            <RatingStars rating={0} />
                            <p className='productDetailRatingSkeleton'>0</p>
                        </div>
                    </section>
                    <section className='productDetailsActionsSkeleton'>
                        <h3>Color</h3>
                        <ColorListSkeleton />
                        <h3>Talla</h3>
                        <SizeListSkeleton />
                        <h3>Cantidad</h3>
                        <Counter stock={0} onChange={() => { }} resetSelection={false} />
                        <section className='productDetailsButtonsSkeleton'>
                            <CustomButton color='primary' icon='cart' onClick={() => { }}>
                                Agregar al carrito
                            </CustomButton>
                            <CustomButton
                                color='secondary'
                                icon='heart'
                                onClick={() => { }}
                            >
                                {''}
                            </CustomButton>
                        </section>
                    </section>
                    <h3>Descripción</h3>
                    <p className='productDetailsDescriptionSkeleton'></p>
                </section>
            </div>
            <h2 className='relatedProductsTitle'>También te puede interesar</h2>
            <CustomList flexOptions={{ direction: 'row', wrap: 'wrap' }} as='div' maxItems={4}>
                {[1, 2, 3, 4].map((idx) => (
                    <ProductCardSkeleton key={idx} />
                ))}
            </CustomList>
        </>
    )
}