import { useState, useEffect } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, PackageOpen } from 'lucide-react'
import ProductFormModal from '../components/ProductFormModal'
import './Products.css'

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState(null) // null = add, object = edit

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products')
            setProducts(res.data.products || [])
        } catch (error) {
            toast.error('Products load nahi ho paaye')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchProducts() }, [])

    const handleAdd = () => { setEditing(null); setModalOpen(true) }
    const handleEdit = (product) => { setEditing(product); setModalOpen(true) }

    const handleDelete = async (id, name) => {
        if (!window.confirm(`"${name}" delete karna hai?`)) return
        try {
            await api.delete(`/products/${id}`)
            toast.success('Product deleted')
            setProducts((prev) => prev.filter((p) => p._id !== id))
        } catch (error) {
            toast.error(error.response?.data?.message || 'Delete fail hua')
        }
    }

    const handleSaved = () => {
        setModalOpen(false)
        fetchProducts()
    }

    return (
        <div className="page">
            <div className="page-head row">
                <div>
                    <h2>Products</h2>
                    <p className="muted">{products.length} products in your store</p>
                </div>
                <button className="btn-primary" onClick={handleAdd}>
                    <Plus size={17} /> Add Product
                </button>
            </div>

            {loading ? (
                <div className="empty"><p>Loading...</p></div>
            ) : products.length === 0 ? (
                <div className="empty">
                    <PackageOpen size={40} />
                    <h3>Abhi koi product nahi</h3>
                    <p>Apna pehla product add karke shuruaat karo.</p>
                    <button className="btn-primary" onClick={handleAdd}>
                        <Plus size={17} /> Add Product
                    </button>
                </div>
            ) : (
                <div className="table-wrap">
                    <table className="prod-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Badge</th>
                                <th className="ta-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p._id}>
                                    <td>
                                        <div className="cell-product">
                                            <span className="cell-thumb">
                                                {p.images?.[0]
                                                    ? <img src={p.images[0] || "/placeholder.svg"} alt={p.name} />
                                                    : <span className="cell-emoji">{p.emoji || '🌸'}</span>}
                                            </span>
                                            <span className="cell-name">{p.name}</span>
                                        </div>
                                    </td>
                                    <td className="cap">{p.category}</td>
                                    <td>
                                        ₹{p.price}
                                        {p.mrp ? <span className="cell-mrp">₹{p.mrp}</span> : null}
                                    </td>
                                    <td>
                                        <span className={`pill ${p.inStock ? 'pill-green' : 'pill-rose'}`}>
                                            {p.inStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td>{p.badge ? <span className="pill pill-gold">{p.badge}</span> : <span className="dash">—</span>}</td>
                                    <td>
                                        <div className="cell-actions">
                                            <button className="icon-btn" onClick={() => handleEdit(p)} title="Edit">
                                                <Pencil size={16} />
                                            </button>
                                            <button className="icon-btn danger" onClick={() => handleDelete(p._id, p.name)} title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {modalOpen && (
                <ProductFormModal
                    product={editing}
                    onClose={() => setModalOpen(false)}
                    onSaved={handleSaved}
                />
            )}
        </div>
    )
}

export default Products