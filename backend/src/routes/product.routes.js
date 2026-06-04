import express from 'express'
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js'
import { protect, adminOnly } from '../middlewares/auth.middleware.js'
import validate from '../middlewares/validate.middleware.js'
import { createProductValidator, updateProductValidator } from '../validators/product.validator.js'

const router = express.Router()

// Public routes
router.get('/', getAllProducts)
router.get('/:id', getProductById)

// Admin only routes
router.post('/', protect, adminOnly, createProductValidator, validate, createProduct)
router.put('/:id', protect, adminOnly, updateProductValidator, validate, updateProduct)
router.delete('/:id', protect, adminOnly, deleteProduct)

export default router;