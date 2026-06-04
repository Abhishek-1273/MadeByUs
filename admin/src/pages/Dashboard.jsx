import { useState, useEffect } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { Package, CheckCircle, XCircle } from 'lucide-react'
import './Dashboard.css'

const Dashboard = () => {
    const [stats, setStats] = useState({ total: 0, inStock: 0, outOfStock: 0 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/products')
                const products = res.data.products || []
                const total = products.length
                const inStock = products.filter((p) => p.inStock).length
                setStats({ total, inStock, outOfStock: total - inStock })
            } catch (error) {
                toast.error('Stats load nahi ho paaye')
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    const cards = [
        { label: 'Total Products', value: stats.total, icon: <Package size={20} />, tone: 'ink' },
        { label: 'In Stock', value: stats.inStock, icon: <CheckCircle size={20} />, tone: 'green' },
        { label: 'Out of Stock', value: stats.outOfStock, icon: <XCircle size={20} />, tone: 'rose' },
    ]

    return (
        <div className="page">
            <div className="page-head">
                <h2>Overview</h2>
                <p className="muted">Aapke store ke products ek nazar mein.</p>
            </div>

            <div className="stats-grid">
                {cards.map((c) => (
                    <div className="stat-card" key={c.label}>
                        <div className="stat-top">
                            <span className="stat-label">{c.label}</span>
                            <span className={`stat-icon stat-icon--${c.tone}`}>{c.icon}</span>
                        </div>
                        <span className="stat-number">{loading ? '--' : c.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard