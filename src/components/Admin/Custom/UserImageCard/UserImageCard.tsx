import { useRef } from 'react';
import { Field, ErrorMessage, type FieldProps } from 'formik';
import { GrUpload } from "react-icons/gr";
import { TbTrash } from 'react-icons/tb';
import { toast } from 'react-toastify';
import './_userImageCard.scss';

interface UserImageCardProps {
    mode: 'create' | 'edit';
    userName?: string;
    googlePhotoURL?: string;
}

export const UserImageCard = ({ mode, userName, googlePhotoURL }: UserImageCardProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (
        { target }: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: string) => void
    ) => {
        const file = target.files?.[0];
        if (!file) return;

        if (file.type.startsWith('image/')) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error(`La imagen es demasiado grande. Máximo 5MB.`);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                if (result) {
                    setFieldValue('image', result);
                    toast.success('Imagen de perfil actualizada.', {
                        position: "bottom-right",
                        autoClose: 3000,
                    });
                }
            };
            reader.readAsDataURL(file);
        } else {
            toast.error('Solo se permiten archivos de imagen.');
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="userImageCard">
            <h2 className="userImageCardTitle">Imagen de Perfil</h2>
            <span className="userImageCardSubtitle">
                {mode === 'edit' ? 'Actualizar' : 'Agregar'} imagen de perfil del usuario
            </span>

            <div className="userImageCardForm">
                <Field name="image">
                    {({ field, form }: FieldProps) => {
                        // Lógica de prioridad: Personalizada > Google > Placeholder
                        const displayImage = typeof field.value === 'string'
                            ? field.value
                            : field.value.url || googlePhotoURL;
                        const isPersonalImage = !!field.value.public_id;
                        const isGoogleImage = !field.value.url && !!googlePhotoURL;
                        return (
                            <div className="userImageCardSection">
                                {/* Contenedor único de imagen */}
                                <div className="imagePreview">
                                    {displayImage ? (
                                        <div className='imageContainer'>
                                            <img
                                                src={displayImage}
                                                alt={`Imagen de ${userName || 'usuario'}`}
                                                className='profileImage'
                                            />
                                            {/* Overlay para eliminar solo imagen personalizada */}
                                            {isPersonalImage && (
                                                <div className="imageOverlay">
                                                    <TbTrash
                                                        className='removeImage'
                                                        onClick={() => {
                                                            form.setFieldValue('image', '');
                                                            toast.success(
                                                                googlePhotoURL
                                                                    ? 'Imagen personalizada eliminada. Se usará la imagen de Google.'
                                                                    : 'Imagen personalizada eliminada.'
                                                            );
                                                        }}
                                                        title="Eliminar imagen personalizada"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        // Placeholder cuando no hay ninguna imagen
                                        <div className="noImage">
                                            <div className="avatarPlaceholder">
                                                {userName?.charAt(0)?.toUpperCase() || 'U'}
                                            </div>
                                            <p className='noImageText'>
                                                {mode === 'create'
                                                    ? 'No hay imagen de perfil. Agrega una imagen.'
                                                    : 'No hay imagen disponible. Agrega una imagen.'
                                                }
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Controles de imagen */}
                                <div className="imageControls">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileUpload(e, form.setFieldValue)}
                                    />

                                    <div className="controlButtons">
                                        <button
                                            type="button"
                                            className='uploadButton primary'
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <GrUpload />
                                            <span>
                                                {isPersonalImage
                                                    ? 'Cambiar imagen'
                                                    : isGoogleImage
                                                        ? 'Reemplazar con imagen personalizada'
                                                        : 'Subir imagen'
                                                }
                                            </span>
                                        </button>

                                        {isPersonalImage && (
                                            <button
                                                type="button"
                                                className='removeButton secondary'
                                                onClick={() => {
                                                    form.setFieldValue('image', '');
                                                    toast.success(
                                                        googlePhotoURL
                                                            ? 'Imagen personalizada eliminada. Se usará la imagen de Google.'
                                                            : 'Imagen personalizada eliminada.'
                                                    );
                                                }}
                                            >
                                                <TbTrash />
                                                <span>Eliminar personalizada</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <ErrorMessage name="image" component="span" className="error" />
                            </div>
                        );
                    }}
                </Field>
            </div>
        </div>
    );
};