import type { Product } from '../types';
import type {
    InformationFormValues,
    PriceStockFormValues,
    VariantFormValues,
    ImagesFormValues
} from '../types/formTypes';

/**
 * HELPERS PARA VALORES INICIALES DE FORMULARIOS DE PRODUCTO
 * 
 * Estos helpers centralizan la lógica de inicialización de formularios,
 * proporcionando valores por defecto consistentes y manejo de casos edge.
 * Soportan tanto creación de nuevos productos como edición de existentes.
 */

/**
 * Obtiene valores iniciales para el formulario de información básica del producto
 * 
 * Mapea los datos del producto a la estructura esperada por el formulario,
 * proporcionando valores por defecto seguros si faltan datos.
 * 
 * @param product - Producto existente (para edición) o null (para creación)
 * @returns Objeto con valores iniciales para el formulario de información
 * 
 * @example
 * // Para nuevo producto
 * const initialValues = getInformationInitialValues(null);
 * // { name: '', description: '', category: '', brand: '', sku: '' }
 * 
 * // Para editar producto existente
 * const initialValues = getInformationInitialValues(existingProduct);
 * // { name: 'iPhone 14', description: '...', category: 'Electronics', ... }
 */
export const getInformationInitialValues = (product: Partial<Product> | null): InformationFormValues => ({
    name: product?.title || '',
    description: product?.description || '',
    category: product?.categoryName || '',
    brand: product?.brand || '',
    sku: product?.sku || '',
});

/**
 * Obtiene valores iniciales para el formulario de precio y stock
 * 
 * Maneja la inicialización de campos numéricos con valores por defecto de 0
 * para evitar problemas con inputs numéricos vacíos.
 * 
 * @param product - Producto existente o null
 * @returns Objeto con valores iniciales para precio, stock y descuento
 * 
 * @example
 * const initialValues = getPriceStockInitialValues(product);
 * // { price: 99.99, stock: 50, discount: 10 }
 */
export const getPriceStockInitialValues = (product: Partial<Product> | null): PriceStockFormValues => ({
    price: product?.price || 0,
    stock: product?.stock || 0,
    discount: product?.discount || 0
});

/**
 * Obtiene valores iniciales para el formulario de variantes (colores y tallas)
 * 
 * Diferencia entre modo creación y edición para manejar arrays vacíos vs existentes.
 * En modo edición preserva las variantes existentes, en creación inicia con arrays vacíos.
 * 
 * @param product - Producto existente o null
 * @param mode - Modo de operación: 'create' para nuevo producto, 'edit' para editar
 * @returns Objeto con arrays de colores y tallas
 * 
 * @example
 * // Modo creación
 * const initialValues = getVariantInitialValues(null, 'create');
 * // { colors: [], sizes: [] }
 * 
 * // Modo edición
 * const initialValues = getVariantInitialValues(product, 'edit');
 * // { colors: ['rojo', 'azul'], sizes: ['S', 'M', 'L'] }
 */
export const getVariantInitialValues = (product: Partial<Product> | null, mode: 'create' | 'edit'): VariantFormValues => {
    if (mode === 'edit' && product) {
        return {
            colors: product.colors || [],
            sizes: product.sizes || []
        };
    }
    return {
        colors: [],
        sizes: []
    };
};

/**
 * Obtiene valores iniciales para el formulario de imágenes
 * 
 * Similar a las variantes, maneja diferente inicialización según el modo.
 * Preserva imágenes existentes en edición, inicia vacío en creación.
 * 
 * @param product - Producto existente o null
 * @param mode - Modo de operación
 * @returns Objeto con array de URLs de imágenes
 * 
 * @example
 * const initialValues = getImagesInitialValues(product, 'edit');
 * // { images: ['url1.jpg', 'url2.jpg'] }
 */
export const getImagesInitialValues = (product: Partial<Product> | null, mode: 'create' | 'edit'): ImagesFormValues => {
    if (mode === 'edit' && product) {
        return {
            images: product.images || []
        };
    }
    return {
        images: []
    };
};

/**
 * HELPERS DE VALIDACIÓN Y UTILIDADES
 */

/**
 * Verifica si un producto es válido para operaciones de edición
 * 
 * Validación básica para asegurar que el producto existe cuando se requiere.
 * En modo creación siempre retorna true, en edición verifica existencia.
 * 
 * @param product - Producto a validar
 * @param mode - Modo de operación
 * @returns true si el producto es válido para el modo especificado
 * 
 * @example
 * if (isValidProductForEdit(product, 'edit')) {
 *   // Proceder con la edición
 * } else {
 *   // Mostrar error o redirigir
 * }
 */
export const isValidProductForEdit = (product: Partial<Product> | null, mode: 'create' | 'edit'): boolean => {
    if (mode === 'create') return true;
    return product !== null && product !== undefined;
};

/**
 * Generador automático de SKU (Stock Keeping Unit)
 * 
 * Crea un SKU único combinando marca, nombre del producto y timestamp.
 * Útil para generar identificadores únicos cuando no se proporciona un SKU manual.
 * 
 * Formato: {MARCA}-{NOMBRE}-{TIMESTAMP}
 * - Marca: 3 primeros caracteres alfanuméricos en mayúsculas
 * - Nombre: 6 primeros caracteres alfanuméricos en mayúsculas  
 * - Timestamp: últimos 4 dígitos del timestamp actual
 * 
 * @param name - Nombre del producto
 * @param brand - Marca del producto
 * @returns SKU generado automáticamente
 * 
 * @example
 * const sku = generateSKU('iPhone 14 Pro', 'Apple');
 * // Resultado: "APP-IPHONE-1234"
 * 
 * const sku = generateSKU('Zapatillas Running', 'Nike');
 * // Resultado: "NIK-ZAPATI-5678"
 */
export const generateSKU = (name: string, brand: string): string => {
    const cleanName = name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 6).toUpperCase();
    const cleanBrand = brand.replace(/[^a-zA-Z0-9]/g, '').substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-4);
    return `${cleanBrand}-${cleanName}-${timestamp}`;
};
