import { Link } from 'react-router';
import type { Product } from '../../../types';
import './_searchResults.scss';

type SearchResultsProps = {
  filteredProducts: Product[];
  onItemClick: () => void;
};

export const SearchResults = ({ filteredProducts, onItemClick }: SearchResultsProps) => {
  return (
    <>
      {filteredProducts.length > 0 && (
        <ul className="searchResults">
          {filteredProducts.map(product => (
            <li
              key={product.id}
              className="resultItem"
              onClick={onItemClick}
            >
              <Link to={`/productos/${product.id}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{product.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
