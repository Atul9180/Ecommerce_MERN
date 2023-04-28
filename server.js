import colors from 'colors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';
import cors from 'cors';


dotenv.config();
connectDB();

//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));


//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/products', productRoutes);


//rest api
app.get('/', (req, res) => {
    res.send(`<h1>Atul</h1>`);
});



const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server Running on port ${port} on ${process.env.DEV_MODE} mode`.bgCyan.white);
});















//using 'express-formidable' package which helps in easily uploading files aof any type