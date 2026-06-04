import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import './Login.css'
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Package, ImageUp } from 'lucide-react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
}

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const result = await login(email, password)
        if (result.success) {
            toast.success('Welcome back!')
            navigate('/dashboard')
        } else {
            toast.error(result.message)
        }
        setIsLoading(false)
    }

    return (
        <div className="login-wrap">
            {/* ── LEFT: brand showcase ───────────────────────── */}
            <aside className="login-aside">
                <div className="aside-glow" />
                <div className="aside-content">
                    <span className="aside-eyebrow">
                        <Sparkles size={13} /> Admin Access
                    </span>
                    <h1 className="aside-title">
                        Manage your<br /><em>handcrafted</em> store
                    </h1>
                    <span className="aside-divider" />
                    <p className="aside-sub">
                        Add new pieces, update your collection, and keep your
                        catalog fresh — all from one calm little dashboard.
                    </p>

                    <ul className="aside-features">
                        <li>
                            <span className="feat-icon"><Package size={16} /></span>
                            Add, edit &amp; remove products
                        </li>
                        <li>
                            <span className="feat-icon"><ImageUp size={16} /></span>
                            Upload product photos
                        </li>
                        <li>
                            <span className="feat-icon"><ShieldCheck size={16} /></span>
                            Secure admin-only access
                        </li>
                    </ul>
                </div>
                <div className="aside-foot">Handcrafted with love · Made in India</div>
            </aside>

            {/* ── RIGHT: login form ──────────────────────────── */}
            <main className="login-main">
                <div className="login-card">
                    <div className="brand-icon"><Sparkles size={18} /></div>

                    <div className="login-head">
                        <h2>Welcome <em>back</em></h2>
                        <p>Sign in to your admin panel</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-wrap">
                                <Mail size={17} className="input-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrap">
                                <Lock size={17} className="input-icon" />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    className="pass-toggle"
                                    onClick={() => setShowPass(!showPass)}
                                    aria-label={showPass ? 'Hide password' : 'Show password'}
                                >
                                    {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="login-btn" disabled={isLoading}>
                            {isLoading ? 'Signing in...' : <>Sign In <ArrowRight size={16} /></>}
                        </button>
                    </form>

                    <p className="login-note">Authorized personnel only</p>
                </div>
            </main>
        </div>
    )
}

export default Login