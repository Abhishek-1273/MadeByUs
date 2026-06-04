import { useState } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { X, UploadCloud, Loader2 } from 'lucide-react'

const CATEGORIES = ['pendants', 'earrings', 'bracelets', 'keychains', 'couple-gifts', 'custom-orders']
const BADGES = ['', 'Bestseller', 'New', 'Limited', 'Unique']

const ProductFormModal = ({ product, onClose, onSaved }) => {
    const isEdit = Boolean(product)

    // existing images ko {url, publicId} shape mein laao
    const initialImages = (product?.images || []).map((img) =>
        typeof img === 'string' ? { url: img, publicId: null } : img
    )

    const [form, setForm] = useState({
        name: product?.name || '',
        category: product?.category || 'pendants',
        price: product?.price || '',
        mrp: product?.mrp || '',
        description: product?.description || '',
        colors: product?.colors?.join(', ') || '',
        emoji: product?.emoji || '🌸',
        badge: product?.badge || '',
        inStock: product?.inStock ?? true,
    })
    const [images, setImages] = useState(initialImages)
    const [uploading, setUploading] = useState(false)
    const [saving, setSaving] = useState(false)

    const change = (e) => {
        const { name, value, type, checked } = e.target
        setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    }

    // ── Cloudinary pe upload ─────────────────────────
    const handleUpload = async (e) => {
        const files = Array.from(e.target.files)
        if (files.length === 0) return

        if (images.length + files.length > 5) {
            toast.error('Max 5 images allowed')
            return
        }

        const data = new FormData()
        files.forEach((file) => data.append('images', file))

        setUploading(true)
        try {
            const res = await api.post('/upload/multiple', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            setImages((prev) => [...prev, ...(res.data.images || [])])
            toast.success(`${res.data.images.length} image(s) uploaded`)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Upload fail hua')
        } finally {
            setUploading(false)
            e.target.value = '' // same file dobara choose ho sake
        }
    }

    // ── image hatao (Cloudinary se bhi) ──────────────
    const handleRemoveImage = async (img, index) => {
        setImages((prev) => prev.filter((_, i) => i !== index))
        if (img.publicId) {
            try {
                await api.delete('/upload/delete', { data: { publicId: img.publicId } })
            } catch (error) {
                console.log('[v0] image delete error:', error.message)
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        const payload = {
            name: form.name,
            category: form.category,
            price: Number(form.price),
            mrp: form.mrp ? Number(form.mrp) : null,
            description: form.description,
            colors: form.colors.split(',').map((c) => c.trim()).filter(Boolean),
            images: images.map((img) => img.url), // sirf URLs backend ko
            emoji: form.emoji || '🌸',
            badge: form.badge || null,
            inStock: form.inStock,
        }

        try {
            if (isEdit) {
                await api.put(`/products/${product._id}`, payload)
                toast.success('Product updated')
            } else {
                await api.post('/products', payload)
                toast.success('Product added')
            }
            onSaved()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Save fail hua')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-head">
                    <h3>{isEdit ? 'Edit Product' : 'Add New Product'}</h3>
                    <button className="icon-btn" onClick={onClose}><X size={18} /></button>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="fg">
                        <label>Product Name *</label>
                        <input name="name" value={form.name} onChange={change} required placeholder="Rose Pendant" />
                    </div>

                    <div className="fg-row">
                        <div className="fg">
                            <label>Category *</label>
                            <select name="category" value={form.category} onChange={change}>
                                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="fg">
                            <label>Badge</label>
                            <select name="badge" value={form.badge} onChange={change}>
                                {BADGES.map((b) => <option key={b} value={b}>{b || 'None'}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="fg-row">
                        <div className="fg">
                            <label>Price (₹) *</label>
                            <input name="price" type="number" min="0" value={form.price} onChange={change} required placeholder="499" />
                        </div>
                        <div className="fg">
                            <label>MRP (₹) — optional</label>
                            <input name="mrp" type="number" min="0" value={form.mrp} onChange={change} placeholder="699" />
                        </div>
                    </div>

                    <div className="fg">
                        <label>Description *</label>
                        <textarea name="description" rows="3" value={form.description} onChange={change} required placeholder="Handmade rose resin pendant..." />
                    </div>

                    <div className="fg-row">
                        <div className="fg">
                            <label>Colors (comma se)</label>
                            <input name="colors" value={form.colors} onChange={change} placeholder="Red, Pink, Gold" />
                        </div>
                        <div className="fg">
                            <label>Emoji (image na ho to fallback)</label>
                            <input name="emoji" value={form.emoji} onChange={change} placeholder="🌸" />
                        </div>
                    </div>

                    {/* ── IMAGE UPLOAD ─────────────────────────── */}
                    <div className="fg">
                        <label>Product Images (max 5)</label>

                        <div className="img-grid">
                            {images.map((img, i) => (
                                <div className="img-thumb" key={i}>
                                    <img src={img.url || "/placeholder.svg"} alt={`product ${i + 1}`} />
                                    <button type="button" className="img-remove" onClick={() => handleRemoveImage(img, i)} aria-label="Remove image">
                                        <X size={13} />
                                    </button>
                                </div>
                            ))}

                            {images.length < 5 && (
                                <label className={`img-upload ${uploading ? 'busy' : ''}`}>
                                    {uploading
                                        ? <Loader2 size={20} className="spin-inline" />
                                        : <><UploadCloud size={20} /><span>Upload</span></>}
                                    <input type="file" accept="image/*" multiple hidden onChange={handleUpload} disabled={uploading} />
                                </label>
                            )}
                        </div>
                        <span className="img-hint">The first image will appear as the main image.</span>
                    </div>

                    <label className="fg-check">
                        <input name="inStock" type="checkbox" checked={form.inStock} onChange={change} />
                        <span>In Stock</span>
                    </label>

                    <div className="modal-foot">
                        <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={saving || uploading}>
                            {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductFormModal