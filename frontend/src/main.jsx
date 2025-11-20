import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ProductProvider from './context/productContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    
    <ProductProvider>

    <App />
    </ProductProvider>
    </BrowserRouter>
  </StrictMode>,
)
