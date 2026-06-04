import { body } from 'express-validator'

export const createProductValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be 2-100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom(val => val > 0)
    .withMessage('Price must be greater than 0'),

  body('mrp')
    .optional()
    .isNumeric()
    .withMessage('MRP must be a number')
    .custom((val, { req }) => {
      if (val && val <= req.body.price) {
        throw new Error('MRP must be greater than price')
      }
      return true
    }),

  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['pendants', 'earrings', 'bracelets', 'keychains', 'couple-gifts', 'custom-orders'])
    .withMessage('Invalid category'),

  body('colors')
    .optional()
    .isArray()
    .withMessage('Colors must be an array'),

  body('badge')
    .optional()
    .isIn(['Bestseller', 'New', 'Limited', 'Unique', null])
    .withMessage('Invalid badge'),

  body('inStock')
    .optional()
    .isBoolean()
    .withMessage('inStock must be true or false'),
]

export const updateProductValidator = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be 2-100 characters'),

  body('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number')
    .custom(val => val > 0)
    .withMessage('Price must be greater than 0'),

  body('category')
    .optional()
    .isIn(['pendants', 'earrings', 'bracelets', 'keychains', 'couple-gifts', 'custom-orders'])
    .withMessage('Invalid category'),

  body('badge')
    .optional()
    .isIn(['Bestseller', 'New', 'Limited', 'Unique', null])
    .withMessage('Invalid badge'),
]