import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductCard } from '../../components/ProductDisplay/ProductCard/ProductCard';
import { CustomList } from '../../components/ui/CustomList/CustomList';
import { useFavorites } from '../../context/useFavorites';
import type { Product } from '../../types';
import type { RootState } from '../../store/store';
import { ProductCardSkeleton } from '../../components/ProductDisplay/ProductCard/ProductCardSkeleton';
import './_wishListPage.scss';

export const WishListPage = () => {
    const { favorites } = useFavorites();
    const { products } = useSelector((state: RootState) => state.products);
    const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Filtrar productos que están en favoritos
        const filtered = products.filter(product => favorites.includes(product.id));
        setFavoriteProducts(filtered);
    }, [favorites, products]);

    if (!favoriteProducts) {
        return <CustomList
            flexOptions={{
                direction: 'row',
                justify: 'start',
                wrap: 'wrap',
                align: 'startAlign'
            }}
            maxItems={12}
            as='div'
        >
            {[1, 2, 3].map((id) => (
                <ProductCardSkeleton key={id} />
            ))}
        </CustomList>
    }

    return (
        <div className='wishListPage'>
            <h1 className='wishListPageTitle'>Lista de Deseos</h1>
            <p className='wishListPageDescription'>
                Aquí puedes ver todos los productos que has añadido a tu lista de deseos.
            </p>
            <section className='wishListPageProducts'>
                {favoriteProducts.length > 0 ? (
                    <CustomList
                        flexOptions={{
                            direction: 'row',
                            justify: 'start',
                            wrap: 'wrap',
                            align: 'startAlign'
                        }}
                        maxItems={12}
                        as='div'
                    >
                        {favoriteProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </CustomList>
                ) : (
                    <p className='wishListPageEmpty'>No tienes productos en tu lista de deseos.</p>
                )}
            </section>
        </div>
    );
};