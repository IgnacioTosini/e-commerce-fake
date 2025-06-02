import { useContext } from 'react';
import { FiltersContext } from './FiltersContext';

export const useFilters = () => {
    const context = useContext(FiltersContext);
    if (!context) {
        throw new Error('useFilters debe ser usado dentro de un FiltersProvider');
    }
    return context;
};
