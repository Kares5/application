// import package
import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
// import routes 
import authRoutes from './routes/authRoutes.js'
import categoryRoutes  from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'


// configuration env
dotenv.config()


// configuration DB
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log('Connect to Mongoose 😎😍')      
    } catch (error) {
        console.log(`Error in mongo db ${error}`)
    }
}

connectDB()


const app = express()

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product' , productRoutes)



// server port 
const PORT = process.env.PORT || 5000
app.listen(PORT , () => {
    console.log(`Listen on ${PORT}`)
}) 