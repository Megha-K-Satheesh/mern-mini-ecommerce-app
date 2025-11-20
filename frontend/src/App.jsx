import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import AddProducts from './pages/AddProducts';
function App() {
 
  return (
    <>
      <Navbar/>

       <Routes>
      <Route path='/' element={<Products/>} />
      <Route path='/addproducts' element={<AddProducts/>} />

     
    </Routes>
   
    </>
  )
}

export default App
