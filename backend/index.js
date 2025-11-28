
import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import productRouters from './routes/productRouters.js';

import connectDB from './config/db.js';
dotenv.config();

connectDB()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

//.use('/api/upload', express.static('public/uploads'));

app.use('/api', productRouters)


const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

