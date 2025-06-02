import { useState, useCallback } from 'react';

/**
 * Custom hook para manejar la lógica del input de búsqueda.
 */
export const useSearchInput = () => {
    const [localQuery, setLocalQuery] = useState('');
    const [showLocalResults, setShowLocalResults] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalQuery(value);
        setShowLocalResults(value.length >= 1);
    };

    const clearLocalQuery = useCallback(() => {
        setLocalQuery('');
        setShowLocalResults(false);
    }, []);

    return {
        localQuery,
        showLocalResults,
        handleInputChange,
        clearLocalQuery
    };
};
