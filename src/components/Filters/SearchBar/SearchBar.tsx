import { useEffect, useRef, useCallback } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { useFilters } from "../../../context/useFilters";
import { SearchResults } from "../SearchResults/SearchResults";
import { useSearchInput } from '../../../hooks/useSearchInput';
import './_searchBar.scss';

export const SearchBar = () => {
    const { localQuery, showLocalResults, handleInputChange, clearLocalQuery } = useSearchInput();
    const { filteredProducts } = useFilters();
    const searchBarRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
            clearLocalQuery(); // Limpia el estado local y el contexto
        }
    }, [clearLocalQuery]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div className="searchBarContainer" ref={searchBarRef}>
            <div className="searchBar">
                <input
                    type="text"
                    placeholder="Buscar Productos..."
                    className='searchInput'
                    onChange={handleInputChange}
                    value={localQuery}
                />
                <IoSearchSharp className='searchIcon' />
            </div>
            {showLocalResults && (
                filteredProducts.length === 0 ? (
                    <p className="noResults">No se encontraron productos.</p>
                ) : (
                    <SearchResults
                        filteredProducts={filteredProducts}
                        onItemClick={() => {
                            clearLocalQuery(); // Limpia el estado local y el contexto al hacer clic en un item
                        }}
                    />
                )
            )}
        </div>
    );
};
