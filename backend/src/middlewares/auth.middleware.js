import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized, no token'
            })
        }
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id).select("-password")
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            })
        }
        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token invalid or expired'
        })
    }
}

// ── Sirf Admin access ──────────────────────────────
export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next()
    } else {
        return res.status(403).json({
            success: false,
            message: "Admin access only"
        })
    }
}