import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Check if admin is already logged in
    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        const savedUser = localStorage.getItem('adminUser')

        if (token && savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    // Login function
    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password })
            const { token, user: userData } = response.data

            // Check if user is admin
            if (userData.role !== 'admin') {
                throw new Error('Access denied. Admin only.')
            }

            // Save to localStorage
            localStorage.setItem('adminToken', token)
            localStorage.setItem('adminUser', JSON.stringify(userData))
            setUser(userData)

            return { success: true }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Login failed'
            }
        }
    }
    // Logout function
    const logout = () => {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        setUser(null)
    }
    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}