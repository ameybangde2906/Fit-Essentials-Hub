import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import roleRoute from './routes/auth/role.js';
import authRoute from './routes/auth/auth.js';
import userRoute from './routes/auth/user.js';
import cartRoute from './routes/cart/cart.js'
import wishlistRoute from './routes/wishlist/wishlist.js'
import productsRoute from './routes/products/products.js'
import addressRoute from './routes/address/address.js'
import orderRoutes from './routes/orderDetails/orderDetails.js'
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 8000
dotenv.config();
const __dirname = path.resolve();

app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:8000',
    credentials: true
}))
app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/products", productsRoute);
app.use('/api/address', addressRoute)
app.use("/api/orders",orderRoutes)

//response handler middleware
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(statusCode).json({
        success: [200, 201, 204].some(a => a === statusCode) ? true : false,
        status: statusCode,
        message: message,
        obj: err.data
    });
});

if (process.env.NODE_ENV === 'production') {
    // Serve static files from the Angular app's dist directory
    app.use(express.static(path.join(__dirname, '/new-project/dist/new-project/browser')));

    // Handle all other routes by sending the Angular app's index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '/new-project/dist/new-project/browser', 'index.html'));
    });
}


//db connection
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to database...")
    } catch (error) {
        console.log(`Error connection to mongodb: ${error.message}`)
        process.exit(1)
    }
}


app.listen(port, () => {
    connectMongoDB();
    console.log("Connected to backend!");
})