

import axios from "axios";
import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { productReducer } from '../reducer/productReducer';
const ProductContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_URL;
const initialState = {
        category : [],
       
        sort : '',
       search:'' ,
        page : 1,
        limit: 8,  
        products: [], 
        loading: false,
        totalCount: 0,
    }

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer( productReducer , initialState);
  const [allCategories,setAllCategories] =  useState([])
  const navigate = useNavigate()
    const location = useLocation()
     const navigationRef = useRef(false)

     
  const   { category,   page, limit, products, sort, loading, totalCount,search } = state

     useEffect(()=>{
         const params = {
          
              category,
            
             page, limit, sort,search
        }
  const queryString = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([key,value])=>value!==undefined&&value!==''&&value.length!==0))).toString()

        const fetchProducts = async()=>{
            dispatch({type:'SET_LOADING', payload:true})
            try {
              
                const response = await axios.get(`${API_BASE_URL}/api/products?${queryString}`, {
  headers: { 'Cache-Control': 'no-cache' }
});

              
                dispatch({type:'SET_PRODUCTS',payload:response.data.products})
                dispatch({type:'SET_TOTAL_COUNT',payload:response.data.totalCount})
                
                //set all categories to dynamically show category filter options
                setAllCategories(response.data.allCategories)

                //sync search query with url without re-loading
               if (location.pathname === '/' && location.search !== `?${queryString}`){
                navigationRef.current = true
                navigate(`?${queryString}`,{replace:false})
               }   
            } catch (error) {
                console.error(error.message)
            }
            finally {
                dispatch({type:'SET_LOADING', payload:false})
            }
        }
        fetchProducts()
    },[category,  page, limit, sort,search])

  useEffect(() => {
    const params = new URLSearchParams(location.search);
  const page = parseInt(params.get('page')) || 1
  console.log('page',page);
  
      dispatch({type: 'SET_PAGE',payload: page})

}, [location.search])




  const addProducts = async (values) => {
    try {
 
     
    
 const uploadProducts  =await axios.post(`${API_BASE_URL}/api/products`,values   , {
      headers: { "Content-Type":"application/json" }});

      console.log("Product added successfully",uploadProducts);
    
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ProductContext.Provider value={{   state,
    dispatch,
    allCategories,
    addProducts}}>
      {children}
    </ProductContext.Provider>
  );
};
export { ProductContext };
export default ProductProvider; 
