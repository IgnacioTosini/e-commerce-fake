import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import type { AppDispatch, RootState } from "../store";
import { addProduct, deleteProduct, savingNewProduct, setLoading, setProducts, updateProduct, addCategory, removeCategory, setCategories } from "./productsSlice";
import slugify from "slugify";
import { FirebaseDB } from "../../firebase/config";
import { loadProducts } from "../../helpers/loadProducts";
import type { Product, ProductImage } from "../../types";
import { toast } from "react-toastify";
import { uploadBase64Images } from "../../helpers/fileUpload";

const apiUrl =
    import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_API_URL_PROD
        : import.meta.env.VITE_API_URL;

export const startNewProduct = (formData: Partial<Product>) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(savingNewProduct());

        try {
            // Subir solo imágenes nuevas (sin public_id), conservar las ya subidas
            let uploadedImages: ProductImage[] = [];
            if (formData.images && formData.images.length > 0) {
                const alreadyUploaded: ProductImage[] = (formData.images as (ProductImage | string)[]).filter(
                    (img): img is ProductImage => typeof img === 'object' && img !== null && 'public_id' in img && 'url' in img
                );
                const toUpload: string[] = (formData.images as (ProductImage | string)[]).filter(
                    (img): img is string => typeof img === 'string'
                );
                try {
                    let uploaded: ProductImage[] = [];
                    if (toUpload.length > 0) {
                        uploaded = await uploadBase64Images(toUpload);
                        toast.success('Imágenes subidas correctamente');
                    }
                    uploadedImages = [...alreadyUploaded, ...uploaded];
                } catch (imageError) {
                    console.error('Error al subir imágenes:', imageError);
                    toast.error('Error al subir algunas imágenes, usando imagen por defecto');
                    uploadedImages = alreadyUploaded.length > 0 ? alreadyUploaded : [{ url: 'https://placehold.co/300x300', public_id: '' }];
                }
            } else {
                uploadedImages = [{ url: 'https://placehold.co/300x300', public_id: '' }];
            }

            // Generar SKU automáticamente para cada variante
            const productSlug = slugify(formData.title || '', { lower: true, strict: true });
            const variantsWithSku = (formData.variants || []).map(variant => ({
                ...variant,
                sku: `${productSlug}-${variant.color}-${variant.size}`
            }));

            const newProduct: Product = {
                id: "",
                title: formData.title || "",
                description: formData.description || "",
                price: formData.price || 0,
                images: uploadedImages,
                categoryName: formData.categoryName || "Sin categoría",
                rating: formData.rating || 0,
                variants: variantsWithSku,
                totalStock: variantsWithSku.reduce((acc, variant) => acc + (variant.stock || 0), 0),
                brand: formData.brand || "",
                discount: formData.discount || 0,
                isActive: formData.isActive || true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const newDoc = doc(collection(FirebaseDB, `products`));
            await setDoc(newDoc, newProduct);

            newProduct.id = newDoc.id;

            console.log("Nuevo producto creado:", newProduct);
            dispatch(addProduct(newProduct));

            toast.success("Producto creado correctamente");
        } catch (error) {
            console.error('Error al crear producto:', error);
            toast.error("Error al crear el producto");
        }
    };
}

export const startUpdateProduct = (formData: Partial<Product>, productId: string, originalImages: ProductImage[]) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(setLoading(true));

            // Subir solo imágenes nuevas (sin public_id), conservar las ya subidas
            let finalImages: ProductImage[] = [];
            if (formData.images && formData.images.length > 0) {
                const alreadyUploaded: ProductImage[] = (formData.images as (ProductImage | string)[]).filter(
                    (img): img is ProductImage => typeof img === 'object' && img !== null && 'public_id' in img && 'url' in img
                );
                const toUpload: string[] = (formData.images as (ProductImage | string)[]).filter(
                    (img): img is string => typeof img === 'string'
                );
                try {
                    let uploaded: ProductImage[] = [];
                    if (toUpload.length > 0) {
                        uploaded = await uploadBase64Images(toUpload);
                        toast.success('Imágenes actualizadas correctamente', {
                            position: "bottom-right",
                            autoClose: 3000,
                        });
                    }
                    finalImages = [...alreadyUploaded, ...uploaded];
                } catch (imageError) {
                    console.error('Error al subir imágenes:', imageError);
                    toast.error('Error al subir algunas imágenes', {
                        position: "bottom-right",
                        autoClose: 3000,
                    });
                    finalImages = alreadyUploaded.length > 0 ? alreadyUploaded : [];
                }
            }

            const currentPublicIds = (finalImages as ProductImage[]).map(img => img.public_id);
            const deletedImages = originalImages.filter(img => !currentPublicIds.includes(img.public_id) && img.public_id);

            // Generar SKU automáticamente para cada variante al editar
            const productSlug = slugify(formData.title ?? '', { lower: true, strict: true });
            const variantsWithSku = (formData.variants ?? []).map(variant => ({
                ...variant,
                sku: `${productSlug}-${variant.color}-${variant.size}`
            }));

            // Calcular el totalStock sumando los stocks de las variantes
            const totalStock = variantsWithSku.reduce((acc, variant) => acc + (variant.stock || 0), 0);

            // Crear objeto de actualización
            const updatedData = {
                ...formData,
                images: finalImages,
                updatedAt: new Date().toISOString(),
                variants: variantsWithSku,
                totalStock,
            };

            // Actualizar en Firebase
            const productRef = doc(FirebaseDB, 'products', productId);
            await setDoc(productRef, updatedData, { merge: true }); //merge para no sobrescribir todo

            // Construir un objeto Product completo para cumplir con el tipado
            const completeProduct: Product = {
                id: productId,
                title: formData.title ?? "",
                description: formData.description ?? "",
                price: formData.price ?? 0,
                images: finalImages,
                categoryName: formData.categoryName ?? "Sin categoría",
                rating: formData.rating ?? 0,
                variants: variantsWithSku,
                totalStock,
                brand: formData.brand ?? "",
                discount: formData.discount ?? 0,
                isActive: formData.isActive ?? true,
                createdAt: formData.createdAt ?? new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            dispatch(updateProduct(completeProduct));
            toast.success("Producto actualizado correctamente");
            if (deletedImages.length > 0) {
                await deleteImagesFromCloudinary(deletedImages.map(img => img.public_id));
            }
            dispatch(setLoading(false));
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            toast.error("Error al actualizar el producto");
        }
    };
}

export const startDeletingProduct = (productId: string) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(setLoading(true));
            const docRef = doc(FirebaseDB, 'products', productId);
            await deleteDoc(docRef);
            dispatch(deleteProduct(productId));
            toast.success("Producto eliminado correctamente");
            dispatch(setLoading(false));
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            toast.error("Error al eliminar el producto");
        }
    };
};

export const startLoadingProducts = () => {
    return async (dispatch: AppDispatch): Promise<void> => {
        const products = await loadProducts();
        dispatch(setProducts(products));
    };
}

export const startLoadingCategories = () => {
    return async (dispatch: AppDispatch): Promise<void> => {
        try {
            const categoriesRef = collection(FirebaseDB, 'categories');
            const querySnapshot = await getDocs(categoriesRef);

            const categories: string[] = [];
            querySnapshot.forEach((doc) => {
                categories.push(doc.data().name);
            });

            dispatch(setCategories(categories));
        } catch (error) {
            console.error('Error al cargar categorías:', error);
            toast.error('Error al cargar categorías');
        }
    };
};

// Thunk para agregar una nueva categoría
export const startAddingCategory = (categoryName: string) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        try {
            const trimmedName = categoryName.trim();
            if (!trimmedName) {
                toast.error('El nombre de la categoría no puede estar vacío');
                return;
            }

            // Crear documento en Firebase
            const categoryDoc = doc(FirebaseDB, 'categories', trimmedName);
            await setDoc(categoryDoc, {
                name: trimmedName,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });

            // Actualizar estado local
            dispatch(addCategory(trimmedName));
            toast.success(`Categoría "${trimmedName}" agregada correctamente`);
        } catch (error) {
            console.error('Error al agregar categoría:', error);
            toast.error('Error al agregar la categoría');
        }
    };
};

export const startDeletingCategory = (categoryName: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            // Verificar si la categoría tiene productos asociados
            const { products } = getState().products;
            const hasProducts = products.some((product: Product) => product.categoryName === categoryName);

            if (hasProducts) {
                toast.error(`No se puede eliminar la categoría "${categoryName}" porque tiene productos asociados`);
                return;
            }

            // Eliminar de Firebase
            const categoryDoc = doc(FirebaseDB, 'categories', categoryName);
            await deleteDoc(categoryDoc);

            // Actualizar estado local
            dispatch(removeCategory(categoryName));
            toast.success(`Categoría "${categoryName}" eliminada correctamente`);
        } catch (error) {
            console.error('Error al eliminar categoría:', error);
            toast.error('Error al eliminar la categoría');
        }
    };
};

export const deleteImagesFromCloudinary = async (publicIds: string[]) => {
    await fetch(`${apiUrl}/api/cloudinary/delete-images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicIds }),
    });
};