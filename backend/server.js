const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago');
const { sendOrderConfirmationEmail } = require('./services/emailService');
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

        // Permitir notification_url, back_urls y auto_return desde el frontend
        const notification_url = req.body.notification_url;
        const back_urls = req.body.back_urls;
        const auto_return = req.body.auto_return;

        const preferenceData = {
            items: req.body.items.map(item => ({
                id: item.id,
                title: item.title,
                quantity: Number(item.quantity),
                currency_id: 'ARS',
                unit_price: Number(item.unit_price),
                description: item.description,
                picture_url: item.picture_url
            })),
            payer: {
                name: req.body.payer?.name,
                surname: req.body.payer?.surname,
                email: req.body.payer?.email
            },
            external_reference: req.body.external_reference,
            ...(notification_url && { notification_url }),
            ...(back_urls && { back_urls }),
            ...(auto_return && { auto_return })
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

        if (type === 'payment' && data && data.id) {
            console.log('💳 Notificación de pago:', data);
            // Consultar a la API de MercadoPago para obtener status y external_reference
            const paymentId = data.id;
            const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
                }
            });
            if (!mpRes.ok) {
                console.error('❌ Error consultando pago a MercadoPago:', await mpRes.text());
                return res.status(500).json({ error: 'No se pudo consultar el pago a MercadoPago' });
            }
            const paymentData = await mpRes.json();
            console.log('🔎 Datos completos del pago:', paymentData);

            const status = paymentData.status;
            const externalReference = paymentData.external_reference;

            console.log('🟡 Estado del pago recibido:', status);
            console.log('🟡 External Reference:', externalReference);

            // Verificar si el pago fue aprobado
            if (status === 'approved') {
                console.log('🟢 ¡Pago aprobado! Bajando stock...');
                await updateProductStock(externalReference);
                // Obtener la orden y enviar el email
                const orderRef = db.collection('orders').doc(externalReference);
                const orderSnap = await orderRef.get();
                if (orderSnap.exists) {
                    const order = orderSnap.data();
                    order.id = orderSnap.id; // Asegurarse de que el ID de la orden esté disponible
                    try {
                        await sendOrderConfirmationEmail(order);
                        console.log('✉️ Email de confirmación enviado a', order.userEmail);
                    } catch (mailErr) {
                        console.error('❌ Error enviando email:', mailErr);
                    }
                }
                // Responder éxito explícito
                return res.status(200).json({
                    message: 'Pago aprobado, stock actualizado y mail enviado',
                    orderId: externalReference
                });
            } else {
                console.log('🔴 El pago NO está aprobado. No se baja stock.');
                return res.status(200).json({
                    message: 'Pago no aprobado, no se actualiza stock ni se envía mail',
                    status: status
                });
            }
        }

        res.status(200).send('OK');
    } catch (error) {
        console.error('❌ Error en webhook:', error);
        res.status(500).json({ error: 'Error en webhook', details: error.message });
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

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dtlzigqui',
    api_key: process.env.CLOUDINARY_API_KEY || 'TU_API_KEY',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'TU_API_SECRET'
});

app.post('/api/delete-cloudinary-images', async (req, res) => {
    const { publicIds } = req.body;
    try {
        const results = await Promise.all(
            publicIds.map(id => cloudinary.uploader.destroy(id))
        );
        res.json({ success: true, results });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
});

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