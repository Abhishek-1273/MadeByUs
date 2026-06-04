import express from 'express'
import {
  uploadImage,
  uploadMultipleImages,
  deleteImage
} from '../controllers/upload.controller.js'
import { protect, adminOnly } from '../middlewares/auth.middleware.js'
import upload from '../middlewares/upload.middleware.js'

const router = express.Router()

// Single image
router.post('/single', protect, adminOnly, upload.single('image'), uploadImage);

// Multiple images
router.post('/multiple', protect, adminOnly, upload.array('images', 5), uploadMultipleImages)

// Delete image
router.delete('/delete', protect, adminOnly, deleteImage);

export default router