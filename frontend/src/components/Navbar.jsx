

import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {

  return (
    <>

      <nav className="sm:bg-blue-600 bg-white text-blue-600 flex justify-between items-center px-x   
        h-20 
        sm:h-20
        w-full 
        top-0 
        z-50 
        fixed
       
        sm:text-white
        font-serif
        ">
  
         <h1 className="text-2xl font-bold  flex pt-4 gap-x-3 font-serif sm:mx-20">
            
            <FaShoppingCart className="text-yellow-400 text-3xl" />
            Trendora</h1>

          <ul className="flex justify-end gap-x-6 w-4xl sm:font-semibold  mt-5 sm:mx-20">
            <li>
              <Link to="/">
                <span className="text-lg sm:text-xs font-semibold hidden sm:block">Home</span>
               
              </Link>
            </li>

            <li>
              <Link to="/addproducts">
                <span className="text-lg sm:text-xs font-semibold hidden sm:block">Add Products</span>
              </Link>
            </li>
          </ul>
      </nav>
    </>
  );
}

export default Navbar;
