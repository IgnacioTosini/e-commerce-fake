const express = require('express');
const router = express.Router();
const { MercadoPagoConfig, Preference } = require('mercadopago');
const { sendOrderConfirmationEmail } = require('../services/emailService');

// MercadoPago client debe ser inicializado en server.js y pasado aquí
let client;
let db;

function init({ mercadoPagoClient, firestoreDb }) {
    client = mercadoPagoClient;
    db = firestoreDb;
}

router.post('/create-preference', async (req, res) => {
    try {
        const preference = new Preference(client);
        if (!req.body.items || !Array.isArray(req.body.items) || req.body.items.length === 0) {
            throw new Error('Items son requeridos y deben ser un array no vacío');
        }
        if (!req.body.payer || !req.body.payer.email) {
            throw new Error('Información del pagador es requerida');
        }

        // Validar stock por variante antes de crear la preferencia
        for (const item of req.body.items) {
            const productRef = db.collection('products').doc(item.id);
            const productSnap = await productRef.get();
            if (!productSnap.exists) {
                return res.status(400).json({ error: `Producto no encontrado: ${item.title}` });
            }
            const product = productSnap.data();
            // Buscar variante específica por color y talla
            if (!item.size || !item.color) {
                return res.status(400).json({ error: `Faltan datos de variante para ${item.title}` });
            }
            const variant = (product.variants || []).find(v => v.size === item.size && v.color === item.color);
            if (!variant) {
                return res.status(400).json({ error: `Variante no encontrada para ${item.title} (${item.size}, ${item.color})` });
            }
            if ((variant.stock || 0) < Number(item.quantity)) {
                return res.status(400).json({ error: `Stock insuficiente para ${item.title} (${item.size}, ${item.color})` });
            }
        }

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
        res.status(500).json({
            error: 'Error creating preference',
            details: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

router.post('/webhook', async (req, res) => {
    try {
        const { type, data } = req.body;
        if (type === 'payment' && data && data.id) {
            const paymentId = data.id;
            const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
                }
            });
            if (!mpRes.ok) {
                return res.status(500).json({ error: 'No se pudo consultar el pago a MercadoPago' });
            }
            const paymentData = await mpRes.json();
            const status = paymentData.status;
            const externalReference = paymentData.external_reference;
            if (status === 'approved') {
                await updateProductStock(externalReference);
                const orderRef = db.collection('orders').doc(externalReference);
                const orderSnap = await orderRef.get();
                if (orderSnap.exists) {
                    const order = orderSnap.data();
                    order.id = orderSnap.id;
                    try {
                        await sendOrderConfirmationEmail(order);
                    } catch (mailErr) {
                        console.error('❌ Error enviando email:', mailErr);
                    }
                }
                return res.status(200).json({
                    message: 'Pago aprobado, stock actualizado y mail enviado',
                    orderId: externalReference
                });
            } else {
                return res.status(200).json({
                    message: 'Pago no aprobado, no se actualiza stock ni se envía mail',
                    status: status
                });
            }
        }
        res.status(200).send('OK');
    } catch (error) {
        res.status(500).json({ error: 'Error en webhook', details: error.message });
    }
});

async function updateProductStock(orderId) {
    try {
        const orderRef = db.collection('orders').doc(orderId);
        const orderSnap = await orderRef.get();
        if (!orderSnap.exists) return;
        const order = orderSnap.data();
        const batch = db.batch();
        for (const item of order.items) {
            const productRef = db.collection('products').doc(item.productId);
            const productSnap = await productRef.get();
            if (!productSnap.exists) continue;
            const product = productSnap.data();
            // Buscar variante específica por color y talla
            if (!item.size || !item.color) continue;
            const variants = product.variants || [];
            const variantIndex = variants.findIndex(v => v.size === item.size && v.color === item.color);
            if (variantIndex === -1) continue;
            const variant = variants[variantIndex];
            const newStock = Math.max((variant.stock || 0) - item.quantity, 0);
            variants[variantIndex].stock = newStock;
            // Actualizar variantes y updatedAt
            batch.update(productRef, { variants, updatedAt: new Date().toISOString() });
        }
        batch.update(orderRef, { status: 'paid', updatedAt: new Date().toISOString() });
        await batch.commit();
    } catch (error) {
        console.error('Error actualizando stock:', error);
    }
}

module.exports = { router, init };
