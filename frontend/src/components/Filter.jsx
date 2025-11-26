
import { useContext, useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import { ProductContext } from "../contextAPI/productContext";
import { CategoryDropdown } from "./CategoryDropDown";
import Search from "./Search";
import { SortDropdown } from "./SortDrowpdown";

function Filter() {
  const { state, dispatch, allCategories } = useContext(ProductContext);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
    
  return (
    <div className=" w-full fixed top-20  sm:bg-blue-600 sm:top-20 z-50 sm:shadow-md bg-white sm:h-20   ">

      <div className="flex justify-between items-center px-4 sm:px-8 py-2  ">
        {/* Search */}
        <div className="flex sm:ml-34 ">
          <Search />
        </div>

        {/* Mobile Filter Icon */}
        <div className="sm:hidden ml-2">
          {showMobileFilter ? (
            <FiX
              className="text-2xl cursor-pointer"
              onClick={() => setShowMobileFilter(false)}
            />
          ) : (
            <FiFilter
              className="text-4xl text-blue-600 cursor-pointer"
              onClick={() => setShowMobileFilter(true)}
            />
          )}
        </div>

        {/* Desktop Selects */}
        <div className="hidden sm:flex gap-4 items-center  sm:text-xs ">
          {/* Category */}
          <select
          
  
            value={state.category}
            onChange={(e) =>
              dispatch({ type: "SET_CATEGORY", payload: e.target.value })
            }
            className="border p-2 rounded sm:w-60 bg-white  "
          >
            <option value="">All Category</option>
            {allCategories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={state.sort}
            onChange={(e) =>
              dispatch({ type: "SET_SORT", payload: e.target.value })
            }
            className="border p-2 rounded bg-white sm:mr-70 sm:w-40"
          >
            <option value="">Sort by Price</option>
            <option value="price">Low to High</option>
            <option value="-price">High to Low</option>
          </select>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {showMobileFilter && (
        <div className="sm:hidden fixed top-[5rem] left-0 w-full h-full bg-yellow-500 p-10 overflow-y-auto z-50 ">
          <h2 className=" text-xl font-bold mb-4 text-black">Filter</h2>

          {/* Category + Sort Dropdowns */}
          <div className="flex flex-col gap-4">
            <CategoryDropdown
              options={allCategories}
              value={state.category}
              setCategory={(val) =>
                dispatch({ type: "SET_CATEGORY", payload: val })
              }
             
            />

            <SortDropdown
              value={state.sort}
              setSort={(val) => dispatch({ type: "SET_SORT", payload: val })}
            />
          </div>

          {/* Close Button */}
          <button
            onClick={() => setShowMobileFilter(false)}
            className="absolute top-8 right-9  text-2xl font-bold"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default Filter;
