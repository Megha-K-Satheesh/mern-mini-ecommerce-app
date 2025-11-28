import express from "express";
import { createProduct, getProducts } from "../controllers/productController.js";
const productRouters = express.Router();



//productRouters.post("/products", upload.single("images"), createProduct);
productRouters.post("/products",createProduct)
productRouters.get("/products",getProducts)

export default productRouters;
