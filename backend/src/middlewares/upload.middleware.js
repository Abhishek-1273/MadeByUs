import multer from "multer";
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary.js'

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'made-by-us/products',  // Cloudinary mein folder
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [
            { width: 800, height: 800, crop: 'limit' },  // Max size
            { quality: 'auto' }                           // Auto compress
        ]
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }  // 5MB max
})

export default upload
