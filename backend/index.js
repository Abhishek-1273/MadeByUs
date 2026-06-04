import app from "./src/app.js";
import connectDB from './src/config/db.js'
import dotenv from 'dotenv'
import express from 'express'
import morgan from "morgan";
import cors from 'cors'
import authRoutes from './src/routes/auth.routes.js'
import productRoutes from './src/routes/product.routes.js'
import uploadRoutes from './src/routes/upload.routes.js'

dotenv.config()

// DB Connect
connectDB();

// Middleware
app.use(express.json())
// Allowed origins (local + deploy). Comma-separated env: CLIENT_URLS
const allowedOrigins = (
  process.env.CLIENT_URLS ||
  "http://localhost:5173,http://localhost:5174,http://localhost:3000"
).split(",").map(o => o.trim())

app.use(cors({
  origin: function (origin, callback) {
    // no-origin (Postman / server-to-server) allow karo
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error("Not allowed by CORS: " + origin))
  },
  credentials: true
}))
app.use(morgan('dev'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/upload', uploadRoutes)


// Checking
app.get('/', (req, res) => {
    res.json({ message: "Made by us is running" })
})

// 404 Handling
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

// Global Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Server Error'
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})