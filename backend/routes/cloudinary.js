const express = require('express');
const router = express.Router();
let cloudinary;

function init({ cloudinaryInstance }) {
    cloudinary = cloudinaryInstance;
}

router.post('/delete-images', async (req, res) => {
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

module.exports = { router, init };
