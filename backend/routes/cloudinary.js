const express = require('express');
const router = express.Router();
let cloudinary;

function init({ cloudinaryInstance }) {
    cloudinary = cloudinaryInstance;
}

router.post('/delete-images', async (req, res) => {
    const { publicIds } = req.body;
    
    if (!publicIds || !Array.isArray(publicIds) || publicIds.length === 0) {
        return res.status(400).json({ 
            success: false, 
            error: 'publicIds debe ser un array no vacío' 
        });
    }
    
    try {
        console.log('Eliminando imágenes de Cloudinary:', publicIds);
        
        const results = await Promise.all(
            publicIds.map(async (id) => {
                try {
                    const result = await cloudinary.uploader.destroy(id);
                    console.log(`Imagen ${id}: ${result.result}`);
                    return { publicId: id, result: result.result, success: true };
                } catch (error) {
                    console.error(`Error eliminando imagen ${id}:`, error);
                    return { publicId: id, error: error.message, success: false };
                }
            })
        );
        
        const successfulDeletions = results.filter(r => r.success);
        const failedDeletions = results.filter(r => !r.success);
        
        console.log(`Eliminaciones exitosas: ${successfulDeletions.length}/${results.length}`);
        
        res.json({ 
            success: true, 
            results,
            summary: {
                total: results.length,
                successful: successfulDeletions.length,
                failed: failedDeletions.length
            }
        });
    } catch (error) {
        console.error('Error general eliminando imágenes:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message || 'Error interno del servidor' 
        });
    }
});

module.exports = { router, init };
