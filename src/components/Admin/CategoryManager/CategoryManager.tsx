import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { selectUniqueCategories, selectCategoryStats } from '../../../store/products/productsSlice';
import { startAddingCategory, startDeletingCategory, startLoadingCategories } from '../../../store/products/thunks';
import type { AppDispatch } from '../../../store/store';
import { CategoryManagerSkeleton } from './CategoryManagerSkeleton';
import './_categoryManager.scss';

type CategoryManagerProps = {
    onCategorySelect: (category: string) => void;
    selectedCategory: string;
    onAddCategory?: (category: string) => void;
    showAddNew?: boolean;
};

export const CategoryManager = ({
    onCategorySelect,
    selectedCategory,
    onAddCategory,
    showAddNew = true
}: CategoryManagerProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector(selectUniqueCategories);
    const categoryStats = useSelector(selectCategoryStats);
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

    // Cargar categorías al montar el componente
    useEffect(() => {
        dispatch(startLoadingCategories());
    }, [dispatch]);

    const handleDeleteCategory = (categoryName: string) => {
        const categoryInfo = categoryStats.find(cat => cat.name === categoryName);
        if (categoryInfo && !categoryInfo.canDelete) {
            toast.error(`No se puede eliminar la categoría "${categoryName}" porque tiene ${categoryInfo.productCount} productos asociados`);
            return;
        }
        setShowDeleteConfirm(categoryName);
    };

    const confirmDeleteCategory = (categoryName: string) => {
        dispatch(startDeletingCategory(categoryName));
        setShowDeleteConfirm(null);

        // Si la categoría eliminada era la seleccionada, limpiar la selección
        if (selectedCategory === categoryName) {
            onCategorySelect('');
        }
    };

    const handleNewCategorySubmit = async () => {
        if (newCategory.trim()) {
            const trimmedCategory = newCategory.trim();

            if (categories.includes(trimmedCategory)) {
                toast.error('Esta categoría ya existe');
                return;
            }

            // Agregar categoría al store/Firebase
            await dispatch(startAddingCategory(trimmedCategory));

            // Seleccionar la nueva categoría
            onCategorySelect(trimmedCategory);

            // Callback opcional para el componente padre
            if (onAddCategory) {
                onAddCategory(trimmedCategory);
            }

            setShowNewCategoryInput(false);
            setNewCategory('');
        }
    };

    const handleNewCategoryCancel = () => {
        setShowNewCategoryInput(false);
        setNewCategory('');
    };

    const handleCategorySelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === 'new-category') {
            setShowNewCategoryInput(true);
        } else {
            onCategorySelect(value);
        }
    };

    // Mostrar skeleton si no hay categorías cargadas
    if (!categories.length && !showNewCategoryInput) {
        return <CategoryManagerSkeleton />;
    }

    return (
        <div className='categoryManager'>
            {!showNewCategoryInput ? (
                <select
                    className='categorySelect'
                    value={selectedCategory}
                    onChange={handleCategorySelectChange}
                >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                    {showAddNew && (
                        <option value="new-category">+ Agregar nueva categoría</option>
                    )}
                </select>
            ) : (
                <div className='newCategoryContainer'>
                    <input
                        type='text'
                        className='newCategoryInput'
                        placeholder='Nombre de la nueva categoría'
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleNewCategorySubmit();
                            }
                            if (e.key === 'Escape') {
                                handleNewCategoryCancel();
                            }
                        }}
                        autoFocus
                    />
                    <div className='categoryButtons'>
                        <button
                            type='button'
                            className='btnConfirm'
                            onClick={handleNewCategorySubmit}
                            disabled={!newCategory.trim()}
                            title="Confirmar nueva categoría"
                        >
                            ✓
                        </button>
                        <button
                            type='button'
                            className='btnCancel'
                            onClick={handleNewCategoryCancel}
                            title="Cancelar"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Lista de categorías existentes con opciones de eliminar */}
            {categoryStats.length > 0 && (
                <div className='categoryList'>
                    <h4 className='categoryListTitle'>Categorías existentes:</h4>
                    {categoryStats.map((category) => (
                        <div key={category.name} className='categoryItem'>
                            <span className='categoryName'>
                                {category.name}
                                <span className='productCount'>
                                    ({category.productCount} producto{category.productCount !== 1 ? 's' : ''})
                                </span>
                            </span>

                            {category.canDelete ? (
                                <button
                                    type='button'
                                    className='btnDelete'
                                    onClick={() => handleDeleteCategory(category.name)}
                                    title={`Eliminar categoría "${category.name}"`}
                                >
                                    🗑️
                                </button>
                            ) : (
                                <span
                                    className='cannotDelete'
                                    title={`No se puede eliminar porque tiene ${category.productCount} producto${category.productCount !== 1 ? 's' : ''} asociado${category.productCount !== 1 ? 's' : ''}`}
                                >
                                    🔒
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de confirmación para eliminar */}
            {showDeleteConfirm && (
                <div className='deleteConfirmModal'>
                    <div className='deleteConfirmContent'>
                        <h3>¿Eliminar categoría?</h3>
                        <p>¿Estás seguro de que quieres eliminar la categoría "{showDeleteConfirm}"?</p>
                        <div className='deleteConfirmButtons'>
                            <button
                                className='btnConfirmDelete'
                                onClick={() => confirmDeleteCategory(showDeleteConfirm)}
                            >
                                Eliminar
                            </button>
                            <button
                                className='btnCancelDelete'
                                onClick={() => setShowDeleteConfirm(null)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};