import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';

type ProductsState = {
    products: Product[];
    selectedProduct: Product;
    formData: Partial<Product>;
    isLoading: boolean;
    error: string | null;
    categories: string[]; // Para categorías que no tienen productos aún
};

const initialState: ProductsState = {
    products: [],
    selectedProduct: {} as Product,
    formData: {},
    isLoading: false,
    error: null,
    categories: [], // Categorías adicionales sin productos
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },
        setSelectedProduct(state, action: PayloadAction<Product>) {
            state.selectedProduct = action.payload;
        },
        setFormData(state, action: PayloadAction<Partial<Product>>) {
            state.formData = { ...state.formData, ...action.payload };
        },
        resetFormData(state) {
            state.formData = {};
        },
        savingNewProduct(state) {
            state.isLoading = true;
        },
        addProduct(state, action: PayloadAction<Product>) {
            state.products.push(action.payload);
            state.isLoading = false;
        },
        updateProduct(state, action: PayloadAction<Product>) {
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        deleteProduct(state, action: PayloadAction<string>) {
            state.products = state.products.filter(p => p.id !== action.payload);
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        // Reducer para actualizar la categoría de productos cuando se renombra una categoría
        updateProductsCategory(state, action: PayloadAction<{ oldCategory: string; newCategory: string }>) {
            const { oldCategory, newCategory } = action.payload;
            state.products = state.products.map(product =>
                product.categoryName === oldCategory
                    ? { ...product, categoryName: newCategory }
                    : product
            );
        },
        // Reducers para gestión de categorías
        addCategory(state, action: PayloadAction<string>) {
            const categoryName = action.payload.trim();
            if (categoryName && !state.categories.includes(categoryName)) {
                state.categories.push(categoryName);
                state.categories.sort();
            }
        },
        removeCategory(state, action: PayloadAction<string>) {
            const categoryName = action.payload;
            // Solo eliminar si no hay productos con esa categoría
            const hasProducts = state.products.some(product => product.categoryName === categoryName);
            if (!hasProducts) {
                state.categories = state.categories.filter(cat => cat !== categoryName);
            }
        },
        updateCategory(state, action: PayloadAction<{ oldCategory: string; newCategory: string }>) {
            const { oldCategory, newCategory } = action.payload;
            // Actualizar en productos
            state.products = state.products.map(product =>
                product.categoryName === oldCategory
                    ? { ...product, categoryName: newCategory }
                    : product
            );

            // Actualizar en categorías independientes
            const categoryIndex = state.categories.indexOf(oldCategory);
            if (categoryIndex !== -1) {
                state.categories[categoryIndex] = newCategory;
                state.categories.sort();
            }
        },
        setCategories(state, action: PayloadAction<string[]>) {
            state.categories = action.payload.sort();
        },
        // Nueva acción para agregar una categoría vacía
        addEmptyCategory(state, action: PayloadAction<string>) {
            const newCategory = action.payload;
            // Solo agregar si no existe
            if (!state.categories.includes(newCategory)) {
                state.categories.push(newCategory);
            }
        },
        // Nueva acción para eliminar una categoría
        deleteCategory(state, action: PayloadAction<string>) {
            const categoryToDelete = action.payload;
            // Eliminar la categoría de la lista
            state.categories = state.categories.filter(category => category !== categoryToDelete);
            // También eliminar los productos de esa categoría
            state.products = state.products.filter(product => product.categoryName !== categoryToDelete);
        },
    },
});

// Selector base para obtener los productos
const selectProducts = (state: { products: ProductsState }) => state.products.products;
const selectStoredCategories = (state: { products: ProductsState }) => state.products.categories;

// Exportar selectores base
export { selectProducts, selectStoredCategories };

// Selector memoizado para obtener categorías únicas (de productos + almacenadas)
export const selectUniqueCategories = createSelector(
    [selectProducts, selectStoredCategories],
    (products, storedCategories) => {
        const productCategories = products.map(product => product.categoryName);
        const allCategories = [...new Set([...productCategories, ...storedCategories])];
        return allCategories.filter(Boolean).sort();
    }
);

// Selector para obtener el conteo de productos por categoría
export const selectCategoryProductCount = createSelector(
    [selectProducts],
    (products) => {
        return products.reduce((counts, product) => {
            const category = product.categoryName;
            counts[category] = (counts[category] || 0) + 1;
            return counts;
        }, {} as Record<string, number>);
    }
);

// Selector para verificar si una categoría se puede eliminar (no tiene productos)
export const selectCanDeleteCategory = createSelector(
    [selectCategoryProductCount],
    (categoryCounts) => (categoryName: string) => {
        return !categoryCounts[categoryName] || categoryCounts[categoryName] === 0;
    }
);

// Selector para obtener productos por categoría
export const selectProductsByCategory = (categoryName: string) => createSelector(
    [selectProducts],
    (products) => {
        return products.filter(product => product.categoryName === categoryName);
    }
);

// Selector para obtener estadísticas de categorías
export const selectCategoryStats = createSelector(
    [selectUniqueCategories, selectCategoryProductCount],
    (categories, productCounts) => {
        return categories.map(category => ({
            name: category,
            productCount: productCounts[category] || 0,
            canDelete: !productCounts[category] || productCounts[category] === 0
        }));
    }
);

export const {
    setProducts,
    setSelectedProduct,
    setFormData,
    resetFormData,
    savingNewProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    setLoading,
    setError,
    updateProductsCategory,
    // Acciones de categorías
    addCategory,
    removeCategory,
    updateCategory,
    setCategories,
} = productsSlice.actions;

export default productsSlice.reducer;