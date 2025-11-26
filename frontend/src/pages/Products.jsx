import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";

function Product(){

  return(
    <>
        <div className="h-full  w-full  sm:bg-gray-100 bg-white" >
          
       <div className="">
       
        <Filter/>

       </div>
        <div className="mt-[100px]">

        <ProductCard/>
        <Pagination/>
        </div>
      
      </div>
    </>
  )
}

export default Product;