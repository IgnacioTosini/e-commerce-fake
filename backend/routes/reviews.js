const express = require('express');
const router = express.Router();

let db;

function init({ firestoreDb }) {
    db = firestoreDb;
}

// Listar todas las reviews o por producto/usuario
router.get('/', async (req, res) => {
    const { productId, userId } = req.query;
    let query = db.collection('reviews');
    if (productId) query = query.where('productId', '==', productId);
    if (userId) query = query.where('userId', '==', userId);
    const snapshot = await query.get();
    const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(reviews);
});

// Crear review
router.post('/', async (req, res) => {
    try {
        const review = req.body;
        review.createdAt = new Date().toISOString();
        review.updatedAt = review.createdAt;
        const docRef = await db.collection('reviews').add(review);
        res.json({ id: docRef.id, ...review });
    } catch (error) {
        console.error('Error al guardar review:', error);
        res.status(500).json({ error: 'Error al guardar la reseña' });
    }
});

// Editar review
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedReview = req.body;
    updatedReview.updatedAt = new Date().toISOString();
    await db.collection('reviews').doc(id).update(updatedReview);
    res.json({ id, ...updatedReview });
});

// Eliminar review
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await db.collection('reviews').doc(id).delete();
    res.json({ id });
});

module.exports = { router, init };