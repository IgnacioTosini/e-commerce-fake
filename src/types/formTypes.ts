export type FormState = {
    username: string;
    email: string;
    password: string;
}

export type FormValidation = {
    username: string | null;
    email: string | null;
    password: string | null;
}

import type { FormikProps } from 'formik';
import type { Product } from './index';

// Tipos base para formularios
export interface InformationFormValues {
    name: string;
    description: string;
    category: string;
    brand: string;
    sku: string;
}

export interface PriceStockFormValues {
    price: number;
    stock: number;
    discount: number;
}

export interface VariantFormValues {
    colors: string[];
    sizes: string[];
}

export interface ImagesFormValues {
    images: string[];
}

// Tipo para datos acumulados
export interface AccumulatedProductData {
    title?: string;
    description?: string;
    categoryName?: string;
    brand?: string;
    sku?: string;
    price?: number;
    stock?: number;
    discount?: number;
    colors?: string[];
    sizes?: string[];
    images?: string[];
}

// Props para componentes de formulario
export interface BaseFormCardProps<T> {
    data: Product | null;
    type: 'product' | 'user';
    mode: 'edit' | 'create';
    formRef?: React.RefObject<FormikProps<T> | null>;
    onFormChange?: () => void;
}

export type InformationCustomCardProps = BaseFormCardProps<InformationFormValues>;

export interface PriceStockCardProps {
    product: Partial<Product> | null;
    mode: 'create' | 'edit';
    formRef?: React.RefObject<FormikProps<PriceStockFormValues> | null>;
}

export interface VariantInformationCardProps {
    data: Partial<Product> | null;
    type: 'product' | 'user';
    mode: 'create' | 'edit';
    formRef?: React.RefObject<FormikProps<VariantFormValues> | null>;
}

export interface ImagesInformationCardProps {
    product: Partial<Product> | null;
    mode: 'create' | 'edit';
    formRef?: React.RefObject<FormikProps<ImagesFormValues> | null>;
}

// Props para HeaderCustomActions
export interface HeaderCustomActionsProps {
    type: 'product' | 'user';
    mode: 'create' | 'edit';
    onSaveAll?: () => Promise<{ success: boolean; data?: AccumulatedProductData }>;
}

// Resultado de validación de formularios
export interface FormValidationResult<T = unknown> {
    ref: string;
    errors: Record<string, string>;
    values?: T;
}