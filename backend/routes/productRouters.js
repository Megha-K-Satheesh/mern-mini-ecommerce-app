import express from "express";
import upload from "../config/multer.js";
import { createProduct, getProducts } from "../controllers/productController.js";
const productRouters = express.Router();



// productRouters.post("/products", (req,res)=>{
//    res.send(" from productRouters ")
// });

//productRouters.post("/products",createProduct)
productRouters.post("/products", upload.single("images"), createProduct);
productRouters.get("/products",getProducts)

export default productRouters;
