import type { Order } from '../types';

const apiUrl =
    import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_API_URL_PROD
        : import.meta.env.VITE_API_URL;

export const createMercadoPagoPreference = async (
    orderData: Order,
    userEmail: string,
    userName: string
): Promise<string> => {
    try {
        console.log('🔄 Iniciando creación de preferencia MercadoPago');
        console.log('📦 Datos de la orden:', orderData);

        // Mapear items de la orden
        const items = orderData.items.map(item => ({
            id: item.productId,
            title: item.title,
            description: `${item.title} - Talle: ${item.size || 'N/A'} - Color: ${item.color || 'N/A'}`,
            quantity: item.quantity,
            currency_id: 'ARS',
            unit_price: item.price,
            picture_url: item.images?.[0] || ''
        }));

        // Separar nombre y apellido
        const [firstName, ...lastNameParts] = userName.split(' ');
        const lastName = lastNameParts.join(' ') || 'Apellido';

        const backUrl =
            import.meta.env.MODE === 'production'
                ? import.meta.env.VITE_FRONTEND_URL_PROD
                : import.meta.env.VITE_FRONTEND_URL;

        const preferenceData = {
            items,
            payer: {
                name: firstName,
                surname: lastName,
                email: userEmail
            },
            external_reference: orderData.id,
            notification_url: `${apiUrl}/api/mercadopago/webhook`,
            back_urls: {
                success: backUrl,
                failure: backUrl,
                pending: backUrl
            },
            auto_return: 'approved'
        };
        console.log('📄 Datos de la preferencia:', preferenceData);
        // Llamar al backend
        const response = await fetch(`${apiUrl}/api/mercadopago/create-preference`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(preferenceData)
        });

        console.log('📥 Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Error response:', errorText);
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('✅ Preferencia creada exitosamente:', data);
        return data.init_point;
    } catch (error) {
        console.error('❌ Error en createMercadoPagoPreference:', error);
        throw error;
    }
};