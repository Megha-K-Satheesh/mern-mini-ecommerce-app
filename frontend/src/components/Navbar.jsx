import { Link } from "react-router-dom";


function Navbar() {


  return (
    <>
  <nav className="bg-blue-600 text-white flex justify-between items-center px-4 py-6" >
    <h1 className="text-4xl font-bold">Trendora</h1>
      <div className="flex-1/1 w-1/5 mx-6 bg-amber-50"  >
        <input
          type="text"
          placeholder="Search products..."
          className="w-full  rounded-lg text-black outline-none"
        />
      </div>
    <ul className="flex justify-end gap-x-6 w-4xl">
      <li>
        <Link to="/" > Home </Link>
      </li>
      <li>
        <Link to="/addproducts" >Add Products</Link>
      </li>
    </ul>
     
  </nav>

    </>
  )
}

export default Navbar