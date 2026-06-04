import cloudinary from '../config/cloudinary.js'

// ── Single Image Upload ────────────────────────────
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            image: {
                url: req.file.path,        // Cloudinary URL
                publicId: req.file.filename,    // Delete ke liye zaroori
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// ── Multiple Images Upload ─────────────────────────
export const uploadMultipleImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files uploaded'
            })
        }

        const images = req.files.map(file => ({
            url: file.path,
            publicId: file.filename,
        }))

        res.status(200).json({
            success: true,
            message: `${images.length} image(s) uploaded`,
            images
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// ── Delete Image ───────────────────────────────────
export const deleteImage = async (req, res) => {
    try {
        const { publicId } = req.body

        if (!publicId) {
            return res.status(400).json({
                success: false,
                message: 'Public ID required'
            })
        }

        await cloudinary.uploader.destroy(publicId)

        res.status(200).json({
            success: true,
            message: 'Image deleted'
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}