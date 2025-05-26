import { Banner } from '../../components/Banner/Banner'
import { CategoriesList } from '../../components/CategoriesList/CategoriesList'
import { CustomList } from '../../components/CustomList/CustomList'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import type { Product } from '../../types'
import { mockProducts } from '../../utils/mockProducts'
import './_homePage.scss'

// Simulación de productos recientes (reemplaza esto por tus datos reales)
const recentProducts: Product[] = mockProducts;

export const HomePage = () => {
  return (
    <div className="homePage">
      <Banner />
      <CategoriesList />
      <CustomList direction="row" maxItems={4} wrap='wrap'>
        {recentProducts.map((product, idx) => (
          <ProductCard key={product.id || idx} product={product} />
        ))}
      </CustomList>
    </div>
  )
}
