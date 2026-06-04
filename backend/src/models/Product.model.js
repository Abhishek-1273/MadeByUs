import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },
    mrp: {
        type: Number,
        default: null,
    },
    category: {
        type: String,
        required: true,
        enum: ['pendants', 'earrings', 'bracelets', 'keychains', 'couple-gifts', 'custom-orders'],
    },
    colors: {
        type: [String],
        default: []
    },
    images: {
        type: [String],   // Images URLs from Cloudinary
        default: []
    },
    emoji: {
        type: String,
        default: '🌸',
    },
    badge: {
        type: String,
        enum: ['Bestseller', 'New', 'Limited', 'Unique', null],
        default: null,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema)
export default Product;