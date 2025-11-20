import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

import productRouters from './routes/productRouters.js';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use('/uploads', express.static('uploads'));

app.use('/api', productRouters)
// app.get('/',(req,res)=>{
//  res.send("from index.js")
// })

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

