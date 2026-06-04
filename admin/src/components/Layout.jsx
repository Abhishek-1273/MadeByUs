import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Sparkles, LayoutDashboard, Package, LogOut } from 'lucide-react'
import './Layout.css'

const Layout = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="layout">
            <aside className="sidebar">
                <div className="sidebar-brand">
                    <div className="brand-icon sm"><Sparkles size={15} /></div>
                    <div>
                        <h1>Admin</h1>
                        <span className="sb-sub">Store Management</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/dashboard" className="nav-link">
                        <LayoutDashboard size={18} /> Dashboard
                    </NavLink>
                    <NavLink to="/products" className="nav-link">
                        <Package size={18} /> Products
                    </NavLink>
                </nav>

                <div className="sidebar-foot">
                    <div className="sb-user">
                        <span className="sb-avatar">{user?.name?.charAt(0)?.toUpperCase()}</span>
                        <div className="sb-user-info">
                            <span className="sb-name">{user?.name}</span>
                            <span className="sb-role">Administrator</span>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="sb-logout">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            <main className="layout-main">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout