import { fileUpload } from './../../src/helpers/fileUpload';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dtlzigqui',
    api_key: '971865862674216',
    api_secret: '7NfSrAURyEBGsMbZ4kajEVeXy6k',
    secure: true,
});

describe('Pruebas en fileUpload', () => {
    test('debe de subir el archivo correctamente', async () => {
        const imageUrl = 'https://res.cloudinary.com/chelsea-production/image/upload/c_fit,h_630,w_1200/v1/site-assets/Backgrounds/Screensaver';
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        const file = new File([blob], 'test-image.jpg');
        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');

        await cloudinary.api.delete_resources([imageId]);

        /* test('debe de retornar null si no se proporciona un archivo', async () => {
            const file = new File([], 'test-image.jpg');
            const url = await fileUpload(file);
            expect(url).toBeNull();
        }) */


    })
});