import { useEffect, useRef } from 'react';
import { Banner } from '../../components/ProductDisplay/Banner/Banner'
import type { Product } from '../../types'
import { mockProducts } from '../../utils/mockProducts'
import { animateOnScroll } from '../../hooks/gsapEffects';
import { CategoriesList } from '../../components/ProductDisplay/CategoriesList/CategoriesList';
import { CustomList } from '../../components/ui/CustomList/CustomList';
import { ProductCard } from '../../components/ProductDisplay/ProductCard/ProductCard';
import './_homePage.scss'

// Simulación de productos recientes (reemplaza esto por tus datos reales)
const recentProducts: Product[] = mockProducts;

export const HomePage = () => {
  const categoriesListRef = useRef<HTMLDivElement>(null);
  const customListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categoriesListRef.current) {
      animateOnScroll(categoriesListRef.current, 40, 0);
    }
    if (customListRef.current) {
      animateOnScroll(customListRef.current, 40, 0.2);
    }
  }, []);

  return (
    <div className="homePage">
      <Banner />
      <div ref={categoriesListRef}>
        <CategoriesList />
      </div>
      <div ref={customListRef}>
        <CustomList flexOptions={{ direction: 'row', wrap: 'wrap' }} maxItems={4} as='div' className='homePageRecentProducts'>
          {recentProducts.map((product, idx) => (
            <ProductCard key={product.id || idx} product={product} onClick={() => { }} />
          ))}
        </CustomList>
      </div>
    </div>
  )
}
