import { Field, ErrorMessage } from 'formik';
import type { BaseFormComponentProps } from '../../../types/validationTypes';

/**
 * Props para el componente FormField genérico
 * Extiende BaseFormComponentProps que incluye: label, placeholder, helpText, required, disabled, readonly
 */
interface FormFieldProps extends BaseFormComponentProps {
    name: string; // Nombre del campo (requerido para Formik)
    type?: string; // Tipo de input (text, number, email, etc.)
    as?: string; // Renderizar como select, textarea u otro elemento
    rows?: number; // Número de filas para textarea
    step?: string; // Incremento para inputs numéricos
    min?: string; // Valor mínimo para inputs numéricos
    max?: string; // Valor máximo para inputs numéricos
    options?: { value: string; label: string }[]; // Opciones para select
    className?: string; // Clases CSS personalizadas
    errorClassName?: string; // Clase CSS para errores
    children?: React.ReactNode; // Contenido adicional (ej: opciones de select personalizadas)
}

/**
 * Componente genérico para campos de formulario
 * 
 * Este componente unifica la creación de campos de formulario para evitar duplicación.
 * Soporta diferentes tipos: input, textarea, select
 * Maneja automáticamente: labels, validación, errores, hints
 * 
 * @example
 * // Input de texto básico
 * <FormField name="name" label="Nombre" required />
 * 
 * // Input numérico con validaciones
 * <FormField name="price" label="Precio" type="number" min="0" step="0.01" />
 * 
 * // Select con opciones
 * <FormField name="category" label="Categoría" as="select" options={categories} />
 * 
 * // Textarea
 * <FormField name="description" label="Descripción" as="textarea" rows={4} />
 */
export const FormField = ({
    name,
    label,
    type = 'text', // Por defecto es input de texto
    as, // Determina si es input, select o textarea
    placeholder,
    helpText,
    required = false,
    disabled = false,
    readonly = false,
    rows,
    step,
    min,
    max,
    options,
    className = '',
    errorClassName = 'error',
    children
}: FormFieldProps) => {
    // Construcción dinámica de props para el Field de Formik
    // Solo incluye props que tienen valor para evitar atributos vacíos en el DOM
    const fieldProps = {
        type,
        id: name, // Vincula label con input
        name, // Requerido por Formik para manejo del estado
        placeholder,
        disabled,
        readOnly: readonly,
        className,
        // Spread condicional: solo agrega la prop si tiene valor
        ...(rows && { rows }), // Para textarea
        ...(step && { step }), // Para inputs numéricos
        ...(min && { min }), // Para validación HTML5
        ...(max && { max }), // Para validación HTML5
    };

    return (
        <div className="formFieldGroup">
            {/* Label opcional con indicador de campo requerido */}
            {label && (
                <label htmlFor={name} className="formFieldLabel">
                    {label} {required && <span className="required">*</span>}
                </label>
            )}

            {/* Renderizado condicional según el tipo de campo */}
            {as === 'select' ? (
                // Select con opciones automáticas
                <Field as="select" {...fieldProps}>
                    <option value="">Selecciona una opción</option>
                    {/* Mapeo automático de opciones */}
                    {options?.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                    {/* Opciones personalizadas via children */}
                    {children}
                </Field>
            ) : as === 'textarea' ? (
                // Textarea para textos largos
                <Field as="textarea" {...fieldProps} />
            ) : (
                // Input por defecto (text, number, email, etc.)
                <Field {...fieldProps} />
            )}

            {/* Texto de ayuda opcional */}
            {helpText && <small className="formFieldHint">{helpText}</small>}

            {/* Mensaje de error automático de Formik */}
            <ErrorMessage name={name} component="span" className={errorClassName} />
        </div>
    );
};

/**
 * Componente contenedor para agrupar campos de formulario
 * 
 * Proporciona un wrapper consistente para organizar campos en grupos lógicos.
 * Útil para crear layouts responsivos y agrupar campos relacionados.
 * 
 * @example
 * // Agrupar campos de precio y stock en una fila
 * <FormFieldGroup className="row">
 *   <FormField name="price" label="Precio" />
 *   <FormField name="stock" label="Stock" />
 * </FormFieldGroup>
 * 
 * // Grupo con clase personalizada para estilos específicos
 * <FormFieldGroup className="priceStockGroup">
 *   {campos relacionados}
 * </FormFieldGroup>
 */
export const FormFieldGroup = ({
    children,
    className = ''
}: {
    children: React.ReactNode;
    className?: string
}) => (
    <div className={`formFieldGroupContainer ${className}`}>
        {children}
    </div>
);

/**
 * Props para el componente PriceSummary
 */
interface PriceSummaryProps {
    price: number; // Precio original del producto
    discount: number; // Porcentaje de descuento (0-100)
}

/**
 * Componente especializado para mostrar resumen de precios con descuentos
 * 
 * Calcula automáticamente:
 * - Precio final después del descuento
 * - Monto de ahorro
 * - Formateo de moneda
 * 
 * Se oculta automáticamente si no hay precio o descuento válido.
 * 
 * @example
 * // En un formulario de producto
 * <PriceSummary price={100} discount={20} />
 * // Resultado: "Precio original: $100, Precio final: $80, Ahorro: $20 (20%)"
 * 
 * // Se oculta si no hay descuento
 * <PriceSummary price={100} discount={0} /> // No renderiza nada
 */
export const PriceSummary = ({ price, discount }: PriceSummaryProps) => {
    // Validación: solo mostrar si hay precio y descuento válidos
    if (price <= 0 || discount <= 0) return null;

    // Cálculos automáticos de precios
    const finalPrice = price * (1 - discount / 100); // Precio con descuento aplicado
    const savings = price * (discount / 100); // Monto ahorrado

    return (
        <div className="priceSummaryContainer">
            <div className="priceSummary">
                {/* Precio original sin descuento */}
                <span className="originalPrice">Precio original: ${price}</span>

                {/* Precio final con descuento aplicado */}
                <span className="finalPrice">Precio final: ${finalPrice.toFixed(2)}</span>

                {/* Cantidad ahorrada y porcentaje */}
                <span className="savings">Ahorro: ${savings.toFixed(2)} ({discount}%)</span>
            </div>
        </div>
    );
};
