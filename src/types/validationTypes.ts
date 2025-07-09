import type { FormikErrors } from 'formik';

// Tipos para resultados de validación
export interface FormValidationResult<T = unknown> {
    ref: string;
    errors: FormikErrors<T>;
    values?: T;
}

// Tipos para el manejo de errores en formularios
export interface FormErrorState {
    hasErrors: boolean;
    errorsByForm: Record<string, Record<string, string>>;
    errorCount: number;
}

// Tipos para el estado de formularios
export interface FormSubmissionState {
    isSubmitting: boolean;
    isValidating: boolean;
    hasBeenSubmitted: boolean;
    lastSubmissionTime?: Date;
}

// Tipos para hooks de formulario personalizados
export interface UseFormValidationOptions {
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
    revalidateOnProps?: boolean;
}

// Tipos para el manejo de archivos en formularios
export interface FileUploadState {
    isUploading: boolean;
    progress: number;
    error?: string;
    uploadedFiles: string[];
}

// Tipos para componentes de formulario genéricos
export interface BaseFormComponentProps {
    label?: string;
    placeholder?: string;
    helpText?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
}

// Tipos para validación async
export interface AsyncValidationResult {
    isValid: boolean;
    error?: string;
    isChecking: boolean;
}
