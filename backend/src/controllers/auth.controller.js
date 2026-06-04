import User from '../models/User.model.js'
import generateToken from '../utils/generateToken.js'

// ── Register ───────────────────────────────────────
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        })

        const token = generateToken(user._id, user.role)
        res.status(201).json({
            message: "Registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// ── Login ───────────────────────────────────────
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Validation
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: 'Email and password required'
            })
        }

        // Email match?
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            })
        }

        // Password match?
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            })
        }

        // Active?
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: 'Account is deactivated'
            })
        }

        // Token
        const token = generateToken(user._id, user.role)
        res.status(200).json({
            success: true,
            message: "Login successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// ── Get Me (logged in user ki info) ───────────────
export const getMe = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}