export const fileUpload = async (file: File) => {
    if (!file) throw new Error("No hay archivo para subir");
    const cloudUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dt1wkwlxc'}/upload`;
    const formData = new FormData();
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '');
    formData.append('file', file);
    formData.append('folder', import.meta.env.VITE_CLOUDINARY_FOLDER || '');

    try {
        const response = await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        })
        if (!response.ok) {
            throw new Error("Error al subir el archivo");
        }
        const data = await response.json();
        return {
            url: data.secure_url,
            public_id: data.public_id
        }; // Retorna la URL y el public_id
    } catch (error) {
        console.error("Error al subir el archivo:", error);
        throw new Error("Error al subir el archivo");
    }
}

// Función para convertir base64 a File
export const base64ToFile = (base64String: string, filename: string): File => {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

// Función para subir imágenes desde base64
// Ahora retorna un array de objetos { url, public_id }
export const uploadBase64Images = async (base64Images: string[]): Promise<{ url: string, public_id: string }[]> => {
    const uploadPromises = base64Images.map(async (base64, index) => {
        // Si ya es una URL de Cloudinary, no la subimos de nuevo
        if (base64.startsWith('http://') || base64.startsWith('https://')) {
            // No tenemos el public_id, solo la url
            return { url: base64, public_id: '' };
        }

        // Convertir base64 a File y subirlo
        const file = base64ToFile(base64, `image-${Date.now()}-${index}.jpg`);
        return await fileUpload(file);
    });

    return await Promise.all(uploadPromises);
};
