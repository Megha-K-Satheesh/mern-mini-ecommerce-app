
import { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { ProductContext } from "../contextAPI/productContext";

function Search() {
  const { state, dispatch } = useContext(ProductContext);
  const { products } = state;
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = products.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (query === "") {
      dispatch({ type: "SET_SEARCH", payload: "" });
      dispatch({ type: "SET_PAGE", payload: 1 });
    }
  }, [query, dispatch]);

  const handleSearch = (value) => {
    dispatch({ type: "SET_SEARCH", payload: value });
    dispatch({ type: "SET_PAGE", payload: 1 });
    setShowSuggestions(false); // hide dropdown
  };

  return (
    <div className="sm:w-140 w-75 mx-5 my-5 relative ">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        placeholder="Search products..."
        onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
        className="w-full border p-2 rounded-2xl sm:rounded bg-white pl-10
        border-blue-600 text-xs
        "
    
      />
      <AiOutlineSearch className="absolute sm:bottom-2 sm:left-3  text-lg text-blue-600
      
      left-3 bottom-2"/>
      {showSuggestions && query && suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border mt-1 max-h-40 overflow-auto rounded z-50">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery(item.title); // keep input value
                handleSearch(item.title);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;

