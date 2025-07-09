import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import type { AppDispatch, RootState } from "../store";
import { addProduct, deleteProduct, savingNewProduct, setLoading, setProducts, updateProduct, addCategory, removeCategory, setCategories } from "./productsSlice";
import { FirebaseDB } from "../../firebase/config";
import { loadProducts } from "../../helpers/loadProducts";
import type { Product } from "../../types";
import { toast } from "react-toastify";
import { uploadBase64Images } from "../../helpers/fileUpload";

export const startNewProduct = (formData: Partial<Product>) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(savingNewProduct());

        try {
            // Primero subir las imágenes si existen y son base64
            let uploadedImages = formData.images || ['https://placehold.co/300x300'];
            if (formData.images && formData.images.length > 0) {
                try {
                    uploadedImages = await uploadBase64Images(formData.images);
                    toast.success('Imágenes subidas correctamente');
                } catch (imageError) {
                    console.error('Error al subir imágenes:', imageError);
                    toast.error('Error al subir algunas imágenes, usando imágenes por defecto');
                    uploadedImages = ['https://placehold.co/300x300'];
                }
            }

            const newProduct: Product = {
                id: "",
                title: formData.title || "",
                description: formData.description || "",
                price: formData.price || 0,
                images: uploadedImages,
                categoryName: formData.categoryName || "Sin categoría",
                rating: formData.rating || 0,
                stock: formData.stock || 0,
                sku: formData.sku || "",
                brand: formData.brand || "",
                discount: formData.discount || 0,
                isActive: formData.isActive || true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                sizes: formData.sizes || [],
                colors: formData.colors || [],
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

export const startUpdateProduct = (formData: Partial<Product>, productId: string) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(setLoading(true));

            // Subir nuevas imágenes si existen y son base64
            let finalImages = formData.images || [];
            if (formData.images && formData.images.length > 0) {
                try {
                    finalImages = await uploadBase64Images(formData.images);
                    toast.success('Imágenes actualizadas correctamente', {
                        position: "bottom-right",
                        autoClose: 3000,
                    });
                } catch (imageError) {
                    console.error('Error al subir imágenes:', imageError);
                    toast.error('Error al subir algunas imágenes', {
                        position: "bottom-right",
                        autoClose: 3000,
                    });
                    finalImages = formData.images; // Mantener las originales si falla
                }
            }

            // Crear objeto de actualización
            const updatedData = {
                ...formData,
                images: finalImages,
                updatedAt: new Date().toISOString(),
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
                stock: formData.stock ?? 0,
                sku: formData.sku ?? "",
                brand: formData.brand ?? "",
                discount: formData.discount ?? 0,
                isActive: formData.isActive ?? true,
                createdAt: formData.createdAt ?? new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                sizes: formData.sizes ?? [],
                colors: formData.colors ?? [],
            };

            dispatch(updateProduct(completeProduct));
            toast.success("Producto actualizado correctamente");

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