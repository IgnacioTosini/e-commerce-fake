const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig } = require('mercadopago');
const { sendOrderConfirmationEmail } = require('./services/emailService');
const mercadoPagoRoutes = require('./routes/mercadopago');
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

// Inicializar rutas de MercadoPago y pasar dependencias
mercadoPagoRoutes.init({ mercadoPagoClient: client, firestoreDb: db });
app.use('/api/mercadopago', mercadoPagoRoutes.router);

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
const cloudinaryRoutes = require('./routes/cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dtlzigqui',
    api_key: process.env.CLOUDINARY_API_KEY || 'TU_API_KEY',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'TU_API_SECRET'
});

cloudinaryRoutes.init({ cloudinaryInstance: cloudinary });
app.use('/api/cloudinary', cloudinaryRoutes.router);

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