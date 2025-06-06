import { ProductCard } from '../../components/ProductDisplay/ProductCard/ProductCard'
import { CustomList } from '../../components/ui/CustomList/CustomList'
import { useFavorites } from '../../context/useFavorites'
import './_wishListPage.scss'

export const WishListPage = () => {
    const { favorites } = useFavorites()
    return (
        <div className='wishListPage'>
            <h1 className='wishListPageTitle'>Lista de Deseos</h1>
            <p className='wishListPageDescription'>Aquí puedes ver todos los productos que has añadido a tu lista de deseos.</p>
            <section className='wishListPageProducts'>
                <CustomList flexOptions={{ direction: 'row', justify: 'start', wrap: 'wrap', align: 'startAlign' }} maxItems={12} as='div'>
                    {favorites.map((product, idx) => (
                        <ProductCard key={product.id || idx} product={product} onClick={() => { }} />
                    ))}
                </CustomList>
            </section>
        </div>
    )
}
