
import { useContext } from "react";
import toast from "react-hot-toast";
import { ProductContext } from "../contextAPI/productContext";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function ProductCard() {
  const { state } = useContext(ProductContext);
 const { loading } = state;
  
  
  const products = state?.products || [];

  if (loading) return <p className="text-center mt-50">Loading...</p>;
  if (!products || products.length === 0) return <p className="text-center mt-50">No products available.</p>;

  return (
  
    <div className="mx-7 sm:mx-25 mt-40 sm:mt-45 ">
      {/* Desktop Grid */}
      <div className="hidden sm:grid sm:grid-cols-4 sm:grid-rows-2 sm:gap-1 sm:mx-10">
        {products.map((item) => ( 
          <div
            key={item._id}
            className=" rounded-lg overflow-hidden  sm:w-60  sm:h-110 shadow-md bg-white flex flex-col sm:mt-20  "
          >
            <img
            
              src={item.images}
              alt={item.title}
              className="sm:w-full sm:p-4 sm:h-70"
            />
            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-sm font-semibold">{item.title}</h2>
              <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
              <div className="flex items-center gap-2">
                <span className="bg-green-600 text-white text-xs px-1 py-0.5 rounded">
                  {item.rating} ★
                </span>
                <p className="text-sm font-medium">${item.price}</p>
              </div>
              <button 
                    onClick={() => toast.success("Item added to cart!")}
              className="mt- bg-amber-400 text-sm rounded-2xl py-2 hover:bg-amber-500 transition">
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile List */}
      <div className="flex flex-col sm:hidden gap-4">
        {products.map((item) => (
          <div
            key={item._id}
            className="flex  rounded-lg overflow-hidden shadow-md bg-white"
          >
            <div className="shrink-0 w-30">
              <img
                src={`${API_BASE_URL}${item.images[0]}`}
                alt={item.title}
                className="w-full h-full 
                p-1"
              />
            </div>
            <div className="p-4 flex flex-col justify-between w-2/3">
              <h2 className="text-sm font-semibold">{item.title}</h2>
              <p className="text-xs text-gray-600 line-clamp-3 mt-1">{item.description}</p>


              <div className="mt-2 flex items-center justify-between">
                <span className="bg-green-600 text-white text-xs px-1 py-0.5 rounded">
                  {item.rating} ★
                </span>
                <p className="text-sm font-medium">${item.price}</p>
              </div>
              <button 
              onClick={() => toast.success("Item added to cart!")}
              className="mt-2 bg-amber-400 text-sm rounded-2xl py-2 hover:bg-amber-500 transition  ">
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
