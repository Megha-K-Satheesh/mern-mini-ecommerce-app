import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import connectDB from './config/db.js';
import productRouters from './routes/productRouters.js';


dotenv.config();
connectDB()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

app.use('/uploads', express.static('uploads'));

app.use('/api', productRouters)


const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

