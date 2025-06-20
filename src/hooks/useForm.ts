import { useEffect, useState } from 'react';
import type { FormState, FormValidation } from '../types/formTypes';

export const useForm = (
    initialForm: FormState = { username: '', email: '', password: '' },
    formValidations: Record<keyof FormState, [(value: string) => boolean, string]> = {
        username: [(value) => value.length >= 3, 'El nombre de usuario debe tener al menos 3 caracteres.'],
        email: [(value) => value.includes('@'), 'El email debe ser válido.'],
        password: [(value) => value.length >= 6, 'La contraseña debe tener al menos 6 caracteres.'],
    }
) => {
    const [formState, setFormState] = useState<FormState>(initialForm);
    const [formValidation, setFormValidation] = useState<FormValidation>({
        username: null,
        email: null,
        password: null,
    });

    useEffect(() => {
        const createValidators = () => {
            const formCheckedValues: Partial<FormValidation> = {};

            for (const formField of Object.keys(formValidations) as Array<keyof FormState>) {
                const [validationFn, errorMessage] = formValidations[formField];
                formCheckedValues[formField] = validationFn(formState[formField]) ? null : errorMessage;
            }
            setFormValidation(formCheckedValues as FormValidation);
        };

        createValidators();
    }, [formState, formValidations]);

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value as keyof FormState
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
    };
};