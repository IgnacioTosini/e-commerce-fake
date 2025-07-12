import { useEffect, useRef } from 'react';
import { Banner } from '../../components/ProductDisplay/Banner/Banner'
import { animateOnScroll } from '../../hooks/gsapEffects';
import { CategoriesList } from '../../components/ProductDisplay/CategoriesList/CategoriesList';
import { CustomList } from '../../components/ui/CustomList/CustomList';
import { ProductCard } from '../../components/ProductDisplay/ProductCard/ProductCard';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import './_homePage.scss'
import { ProductCardSkeleton } from '../../components/ProductDisplay/ProductCard/ProductCardSkeleton';
import { CategoriesListSkeleton } from '../../components/ProductDisplay/CategoriesList/CategoriesListSkeleton';

export const HomePage = () => {
  const categoriesListRef = useRef<HTMLDivElement>(null);
  const customListRef = useRef<HTMLDivElement>(null);
  const { products, isLoading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (categoriesListRef.current) {
      animateOnScroll(categoriesListRef.current, 40, 0);
    }
    if (customListRef.current) {
      animateOnScroll(customListRef.current, 40, 0.2);
    }
  }, []);

  if (isLoading || !products) {
    return (
      <div className="homePage">
        <div />
        <CategoriesListSkeleton />
        <div className="homePageRecentProducts" style={{ display: 'flex', gap: 16 }}>
          {[1, 2, 3, 4].map((index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="homePage">
      <Banner />
      <div ref={categoriesListRef}>
        <CategoriesList />
      </div>
      <div ref={customListRef}>
        <CustomList flexOptions={{ direction: 'row', wrap: 'wrap' }} maxItems={4} as='div' className='homePageRecentProducts'>
          {products.map((product, idx) => (
            <ProductCard key={product.id || idx} product={product} onClick={() => { }} />
          ))}
        </CustomList>
      </div>
    </div>
  )
}
