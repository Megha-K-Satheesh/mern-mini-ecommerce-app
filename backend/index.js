
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
//app.use(cors("*"));
app.use(cors({
    origin: 'https://mern-mini-ecommerce-app-frontend-qqmcvluc5-megha-k-ss-projects.vercel.app',
    credentials: true
}));
//.use('/api/upload', express.static('public/uploads'));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use('/api', productRouters)


const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

