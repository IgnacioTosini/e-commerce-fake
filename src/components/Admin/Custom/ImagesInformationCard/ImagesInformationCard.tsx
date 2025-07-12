import { useRef } from 'react';
import { ImagesInformationCardSkeleton } from './ImagesInformationCardSkeleton';
import { FieldArray, ErrorMessage } from 'formik';
import type { Product } from '../../../../types';
import { GrUpload } from "react-icons/gr";
import { TbTrash } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store/store';
import './_imagesInformationCard.scss';

interface ImagesInformationCardProps {
    mode: 'create' | 'edit';
    product?: Product | null;
}

export const ImagesInformationCard = ({ mode }: ImagesInformationCardProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { isLoading } = useSelector((state: RootState) => state.products);

    if (isLoading) {
        return <ImagesInformationCardSkeleton />;
    }

    const handleFileUpload = (
        { target }: React.ChangeEvent<HTMLInputElement>,
        push: (value: string) => void
    ) => {
        const files = target.files;
        if (!files) return;

        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                if (file.size > 5 * 1024 * 1024) {
                    toast.error(`La imagen ${file.name} es demasiado grande. Máximo 5MB.`);
                    return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target?.result as string;
                    if (result) {
                        push(result);
                        toast.success('Imagen agregada (se subirá al guardar el producto).', {
                            position: "bottom-right",
                            autoClose: 3000,
                        });
                    }
                };
                reader.readAsDataURL(file);
            } else {
                toast.error('Solo se permiten archivos de imagen.');
            }
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="imagesInformationCard">
            <h2 className="imagesInformationCardTitle">Imágenes del Producto</h2>
            <span className="imagesInformationCardSubtitle">
                {mode === 'edit' ? 'Editar' : 'Agregar'} imágenes del producto
            </span>
            <div className="imagesInformationCardForm">
                <FieldArray name="images">
                    {({ push, remove, form }) => (
                        <div className="imagesInformationCardSection">
                            <div className="imagesList">
                                {form.values.images && form.values.images.length > 0 ? (
                                    form.values.images.map((image: string, index: number) => (
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
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleFileUpload(e, push)}
                                />
                                <div className="controlButtons">
                                    <button
                                        type="button"
                                        className='addButton primary'
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={form.values.images && form.values.images.length >= 10}
                                    >
                                        <GrUpload />
                                        <span>
                                            {mode === 'create' ? 'Subir imágenes' : 'Agregar imágenes'}
                                        </span>
                                    </button>
                                </div>
                                <div className="imageInfo">
                                    <small>
                                        Imágenes: {form.values.images ? form.values.images.length : 0}/10 |
                                        Formatos: JPG, PNG, WebP |
                                        Tamaño máximo: 5MB cada una |
                                        <strong> Se subirán al guardar el producto</strong>
                                    </small>
                                </div>
                            </div>
                            <ErrorMessage name="images" component="span" className="error" />
                        </div>
                    )}
                </FieldArray>
            </div>
        </div>
    );
};