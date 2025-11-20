

import axios from "axios";
import { createContext } from "react";

const ProductContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_URL;

const ProductProvider = ({ children }) => {

  
  

  const addProducts = async (values) => {
    try {
 
     
    
     await axios.post(`${API_BASE_URL}/api/products`,values   , {
      headers: { "Content-Type": "multipart/form-data" }});

      console.log("Product added successfully");
    
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ProductContext.Provider value={{ addProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext };
export default ProductProvider; 
