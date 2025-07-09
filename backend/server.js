const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

console.log('🌍 Entorno:', process.env.NODE_ENV || 'development');
console.log('🔑 MercadoPago Access Token:', process.env.MERCADOPAGO_ACCESS_TOKEN ? 'Configurado' : 'NO CONFIGURADO');

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
            back_urls: {
                success: `${process.env.FRONTEND_URL}/payment/success`,
                failure: `${process.env.FRONTEND_URL}/payment/failure`,
                pending: `${process.env.FRONTEND_URL}/payment/pending`
            },
            auto_return: 'approved',
            external_reference: req.body.external_reference,
            notification_url: `${process.env.BACKEND_URL}/api/mercadopago/webhook`
        };

        console.log('📦 Creando preferencia para producción');
        console.log('🔗 Frontend URL:', process.env.FRONTEND_URL);

        const result = await preference.create({ body: preferenceData });

        console.log('✅ Preferencia creada:', result.id);

        res.json({
            init_point: result.init_point,
            preference_id: result.id,
            test_mode: true // Indicar que es modo de prueba
        });
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            error: 'Error creating preference',
            details: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Webhook mejorado para producción
app.post('/api/mercadopago/webhook', async (req, res) => {
    try {
        console.log('🔔 Webhook recibido en producción:', JSON.stringify(req.body, null, 2));

        const { type, data } = req.body;

        if (type === 'payment') {
            console.log('💳 Notificación de pago:', data);
            
            // Aquí podrías:
            // 1. Verificar el pago con MercadoPago API
            // 2. Actualizar tu base de datos Firebase
            // 3. Enviar emails de confirmación
            // 4. Actualizar inventario
        }

        res.status(200).send('OK');
    } catch (error) {
        console.error('❌ Error en webhook:', error);
        res.status(500).send('Error');
    }
});

// Health check para producción
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        mercadopago: process.env.MERCADOPAGO_ACCESS_TOKEN ? 'Configurado' : 'NO CONFIGURADO',
        frontend_url: process.env.FRONTEND_URL
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📡 Frontend URL: ${process.env.FRONTEND_URL}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});