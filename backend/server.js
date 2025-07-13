const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const admin = require('firebase-admin');
if (!admin.apps.length) {
    // En producción, lee el JSON de la variable de entorno
    const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
        ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
        : require('./react-cursos-fd169-firebase-adminsdk-fbsvc-e08a0bfb1a.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}
const db = admin.firestore();

// Configurar MercadoPago
const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

app.post('/api/mercadopago/create-preference', async (req, res) => {
    try {
        const preference = new Preference(client);

        // Validar datos requeridos
        if (!req.body.items || !Array.isArray(req.body.items) || req.body.items.length === 0) {
            throw new Error('Items son requeridos y deben ser un array no vacío');
        }

        if (!req.body.payer || !req.body.payer.email) {
            throw new Error('Información del pagador es requerida');
        }

        const preferenceData = {
            items: req.body.items.map(item => ({
                id: item.id,
                title: item.title,
                quantity: Number(item.quantity),
                currency_id: 'ARS',
                unit_price: Number(item.unit_price)
            })),
            payer: {
                email: req.body.payer.email
            },
            // Sin back_urls para evitar problemas con localhost
            external_reference: req.body.external_reference
        };

        const result = await preference.create({ body: preferenceData });

        res.json({
            init_point: result.init_point,
            preference_id: result.id
        });
    } catch (error) {
        console.error('❌ Error completo:', error);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error stack:', error.stack);

        res.status(500).json({
            error: 'Error creating preference',
            details: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Webhook para recibir notificaciones de MercadoPago
app.post('/api/mercadopago/webhook', async (req, res) => {
    try {
        console.log('🔔 Webhook recibido en producción:', JSON.stringify(req.body, null, 2));

        const { type, data } = req.body;

        if (type === 'payment') {
            console.log('💳 Notificación de pago:', data);
            // Depuración: mostrar status y external_reference

            console.log('🟡 Estado del pago recibido:', data.status);
            console.log('🟡 External Reference:', data.external_reference);

            // Verificar si el pago fue aprobado
            if (data.status === 'approved') {
                console.log('🟢 ¡Pago aprobado! Bajando stock...');
                const externalReference = data.external_reference; // ID de la orden
                await updateProductStock(externalReference);
                // Obtener la orden y enviar el email
                const orderRef = db.collection('orders').doc(externalReference);
                const orderSnap = await orderRef.get();
                if (orderSnap.exists) {
                    const order = orderSnap.data();
                    await sendOrderConfirmationEmail(order);
                }
            } else {
                console.log('🔴 El pago NO está aprobado. No se baja stock.');
            }
        }

        res.status(200).send('OK');
    } catch (error) {
        console.error('❌ Error en webhook:', error);
        res.status(500).send('Error');
    }
});

async function updateProductStock(orderId) {
    try {
        // 1. Obtener la orden por ID
        const orderRef = db.collection('orders').doc(orderId);
        const orderSnap = await orderRef.get();
        if (!orderSnap.exists) {
            console.error('Orden no encontrada:', orderId);
            return;
        }
        const order = orderSnap.data();

        // 2. Actualizar el stock de cada producto
        const batch = db.batch();
        for (const item of order.items) {
            const productRef = db.collection('products').doc(item.productId);
            const productSnap = await productRef.get();
            if (!productSnap.exists) continue;
            const currentStock = productSnap.data().stock || 0;
            const newStock = Math.max(currentStock - item.quantity, 0);
            batch.update(productRef, { stock: newStock, updatedAt: new Date().toISOString() });
        }

        // 3. Marcar la orden como 'paid'
        batch.update(orderRef, { status: 'paid', updatedAt: new Date().toISOString() });

        await batch.commit();
        console.log('Stock actualizado y orden marcada como pagada');
    } catch (error) {
        console.error('Error actualizando stock:', error);
    }
}

// Endpoint de prueba
app.get('/api/test', (req, res) => {
    res.json({
        message: 'Backend funcionando correctamente',
        timestamp: new Date().toISOString(),
        mercadopago: process.env.MERCADOPAGO_ACCESS_TOKEN ? 'Configurado' : 'NO CONFIGURADO',
        tokenLength: process.env.MERCADOPAGO_ACCESS_TOKEN ? process.env.MERCADOPAGO_ACCESS_TOKEN.length : 0
    });
});

const PORT = process.env.PORT || 3001;

// Selección automática de URL del frontend según entorno
const FRONTEND_URL =
    process.env.NODE_ENV === 'production'
        ? process.env.VITE_FRONTEND_URL_PROD
        : process.env.VITE_FRONTEND_URL;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Frontend URL: ${FRONTEND_URL}`);
    console.log(`🔗 Test endpoint: http://localhost:${PORT}/api/test`);
});

app.get('/', (req, res) => {
    res.send('API de e-commerce funcionando correctamente 🚀');
});