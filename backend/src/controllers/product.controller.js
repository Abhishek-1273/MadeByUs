import Product from '../models/Product.model.js'

// ── Get All Products (Public) ──────────────────────
export const getAllProducts = async (req, res) => {
    try {
        const { category, inStock, badge } = req.query;

        // Filter build karo
        const filter = { isActive: true }
        if (category) filter.category = category;
        if (inStock) filter.inStock = inStock === "true";
        if (badge) filter.badge = badge;

        const products = await Product.find(filter).sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            count: products.length,
            products
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// ── Get Single Product (Public) ────────────────────
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product || !product.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// ── Create Product (Admin only) ────────────────────

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, mrp, category, colors, images, emoji, badge, inStock } = req.body;
        const product = await Product.create({
            name,
            description,
            price,
            mrp,
            category,
            colors,
            images: images || [],
            emoji,
            badge,
            inStock
        })
        res.status(201).json({
            success: true,
            message: 'Product created',
            product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// ── Update Product (Admin only) ────────────────────
export const updateProduct = async (req, res) => {
    try {
        const updated = await Product.findOneAndUpdate(
            { _id: req.params.id, isActive: true },
            req.body,
            { new: true, runValidators: true }
        )
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: 'Product updated',
            product: updated
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// ── Delete Product (Admin only) ────────────────────
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        // Soft Delete
        product.isActive = false
        await product.save()
        res.status(200).json({
            success: true,
            message: 'Product deleted'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}