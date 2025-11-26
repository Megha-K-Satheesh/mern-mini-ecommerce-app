import { Toaster } from "react-hot-toast";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AddProducts from './pages/AddProducts';
import Products from './pages/Products';
function App() {
 
  return (
    <>
     
<Navbar/>
     <Toaster position="bottom-center" />
       <Routes>
      <Route path='/' element={<Products/>} />
      <Route path='/addproducts' element={<AddProducts/>} />

     
    </Routes>
   
    </>
  )
}

export default App
