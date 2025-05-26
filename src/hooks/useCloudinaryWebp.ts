// Hook para transformar URLs de Cloudinary a formato WebP
export function useCloudinaryWebp() {
    return (url: string) => {
        if (!url) return '';
        if (url.includes('res.cloudinary.com')) {
            return url.replace('/upload/', '/upload/f_webp/');
        }
        return url;
    };
}
