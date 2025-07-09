import { collection, getDocs } from 'firebase/firestore';
import { FirebaseDB } from '../firebase/config';
import type { Product } from '../types';

export const loadProducts = async () => {
    const collectionRef = collection(FirebaseDB, 'products');
    const docs = await getDocs(collectionRef);

    const products: Product[] = [];
    docs.forEach(doc => {
        const data = doc.data();
        const productWithId = { ...data, id: doc.id }; // Agregar el id del documento
        products.push(productWithId as Product);
    });
    return products;
}

export function debounce<T extends (...args: unknown[]) => void>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}