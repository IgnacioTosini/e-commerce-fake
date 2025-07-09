import { useRef } from 'react';
import { FieldArray, ErrorMessage, Field, type FieldProps, type FormikProps } from 'formik';
import { GrUpload } from "react-icons/gr";
import { TbTrash } from 'react-icons/tb';
import { toast } from 'react-toastify';
import './_imageUploadCard.scss';

interface ImageUploadCardProps {
    mode: 'create' | 'edit';
    type: 'product' | 'user';
    fieldName: string; // 'images' para productos, 'image' para usuarios
    title?: string;
    subtitle?: string;
    maxImages?: number;
    maxSizeMB?: number;
}

export const ImageUploadCard = ({
    mode,
    type,
    fieldName,
    title,
    subtitle,
    maxImages = type === 'user' ? 1 : 10,
    maxSizeMB = 5
}: ImageUploadCardProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Títulos por defecto según el tipo
    const defaultTitle = type === 'user'
        ? 'Foto de Perfil'
        : 'Imágenes del Producto';

    const defaultSubtitle = type === 'user'
        ? `${mode === 'edit' ? 'Editar' : 'Agregar'} foto de perfil del usuario`
        : `${mode === 'edit' ? 'Editar' : 'Agregar'} imágenes del producto`;

    // Función para manejar la subida de archivos
    const handleFileUpload = (
        { target }: React.ChangeEvent<HTMLInputElement>,
        push?: (value: string) => void,
        setValue?: (value: string) => void
    ) => {
        const files = target.files;
        if (!files) return;

        const file = files[0]; // Para usuarios solo tomamos el primer archivo

        if (file.type.startsWith('image/')) {
            // Validar tamaño
            if (file.size > maxSizeMB * 1024 * 1024) {
                toast.error(`La imagen es demasiado grande. Máximo ${maxSizeMB}MB.`);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                if (result) {
                    if (type === 'user' && setValue) {
                        // Para usuarios, reemplazamos la imagen
                        setValue(result);
                        toast.success('Imagen de perfil actualizada (se subirá al guardar).', {
                            position: "bottom-right",
                            autoClose: 3000,
                        });
                    } else if (type === 'product' && push) {
                        // Para productos, agregamos a la lista
                        push(result);
                        toast.success('Imagen agregada (se subirá al guardar el producto).', {
                            position: "bottom-right",
                            autoClose: 3000,
                        });
                    }
                }
            };
            reader.readAsDataURL(file);
        } else {
            toast.error('Solo se permiten archivos de imagen.');
        }

        // Limpiar el input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Render para usuario (imagen única)
    const renderUserImage = (form: FormikProps<Record<string, unknown>>) => (
        <div className="imageUploadCardSection">
            <div className="userImageContainer">
                {form.values[fieldName] ? (
                    <div className='imageContainer userImage'>
                        <img
                            src={form.values[fieldName] as string}
                            alt="Foto de perfil"
                            className='image'
                            onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/150x150?text=Sin+Foto';
                            }}
                        />
                        <div className="imageOverlay">
                            <TbTrash
                                className='removeImage'
                                onClick={() => {
                                    form.setFieldValue(fieldName, '');
                                    toast.success('Imagen eliminada exitosamente.');
                                }}
                                title="Eliminar imagen"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="noImage">
                        <div className="placeholderImage">
                            <span>Sin foto</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="imageControls">
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload(e, undefined, (value) => form.setFieldValue(fieldName, value))}
                />

                <div className="controlButtons">
                    <button
                        type="button"
                        className='addButton primary'
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <GrUpload />
                        <span>
                            {form.values[fieldName] ? 'Cambiar foto' : 'Subir foto'}
                        </span>
                    </button>
                </div>

                <div className="imageInfo">
                    <small>
                        Formatos: JPG, PNG, WebP |
                        Tamaño máximo: {maxSizeMB}MB |
                        <strong> Se subirá al guardar</strong>
                    </small>
                </div>
            </div>

            <ErrorMessage name={fieldName} component="span" className="error" />
        </div>
    );

    // Render para producto (múltiples imágenes)
    const renderProductImages = () => (
        <FieldArray name={fieldName}>
            {({ push, remove, form }) => (
                <div className="imageUploadCardSection">
                    <div className="imagesGrid">
                        {form.values[fieldName] && form.values[fieldName].length > 0 ? (
                            form.values[fieldName].map((image: string, index: number) => (
                                <div key={index} className='imageContainer'>
                                    <img
                                        src={image}
                                        alt={`Imagen del producto ${index + 1}`}
                                        className='image'
                                        onError={(e) => {
                                            e.currentTarget.src = '/placeholder-image.png';
                                        }}
                                    />
                                    <div className="imageOverlay">
                                        <TbTrash
                                            className='removeImage'
                                            onClick={() => {
                                                remove(index);
                                                toast.success('Imagen eliminada exitosamente.');
                                            }}
                                            title="Eliminar imagen"
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="noImages">
                                <p>
                                    {mode === 'create'
                                        ? 'No hay imágenes aún. Agrega nuevas imágenes.'
                                        : 'No hay imágenes disponibles.'
                                    }
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="imageControls">
                        <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileUpload(e, push)}
                        />

                        <div className="controlButtons">
                            <button
                                type="button"
                                className='addButton primary'
                                onClick={() => fileInputRef.current?.click()}
                                disabled={form.values[fieldName] && form.values[fieldName].length >= maxImages}
                            >
                                <GrUpload />
                                <span>
                                    {mode === 'create' ? 'Subir imágenes' : 'Agregar imágenes'}
                                </span>
                            </button>
                        </div>

                        <div className="imageInfo">
                            <small>
                                Imágenes: {form.values[fieldName] ? form.values[fieldName].length : 0}/{maxImages} |
                                Formatos: JPG, PNG, WebP |
                                Tamaño máximo: {maxSizeMB}MB cada una |
                                <strong> Se subirán al guardar el producto</strong>
                            </small>
                        </div>
                    </div>

                    <ErrorMessage name={fieldName} component="span" className="error" />
                </div>
            )}
        </FieldArray>
    );

    return (
        <div className="imageUploadCard">
            <h2 className="imageUploadCardTitle">{title || defaultTitle}</h2>
            <span className="imageUploadCardSubtitle">
                {subtitle || defaultSubtitle}
            </span>

            <div className="imageUploadCardForm">
                {type === 'user' ? (
                    <Field name={fieldName}>
                        {({ form }: FieldProps) => renderUserImage(form)}
                    </Field>
                ) : (
                    renderProductImages()
                )}
            </div>
        </div>
    );
};
