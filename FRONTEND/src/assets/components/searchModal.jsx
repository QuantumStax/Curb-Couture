/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const SearchModal = ({ setIsModalOpen }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isResult, setIsResult] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      setIsResult(false);
      return;
    }

    setLoading(true);

    const delayDebounceFn = setTimeout(() => {
      axios
        .get(`http://localhost:3000/search?query=${encodeURIComponent(query)}`)
        .then((response) => {
          const { products = [], message = "" } = response.data;

          setResults(products);
          setIsResult(true);
          setSelectedIndex(-1);
          setLoading(false);
          setError("");
        })
        .catch((err) => {
          setError("Error fetching search results.");
          setLoading(false);
          setIsResult(false);
        });
    }, 300);

    // Cleanup function to clear the debounce timer
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleKeyDown = (e) => {
    if (!isResult || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        navigate(`/products/${results[selectedIndex].product_id}`);
        setIsModalOpen(false);
      }
    }
  };

  const handleResultClick = (product) => {
    navigate(`/products/${product.product_id}`);
    setIsModalOpen(false);
  };

  return (
    <section className="fixed inset-0 flex flex-col items-center justify-center z-50 backdrop-brightness-50 backdrop-blur-sm">
      {/* Close Button */}
      <div
        className="absolute top-2 right-5 lg:top-8 lg:right-10 text-primary cursor-pointer"
        onClick={() => setIsModalOpen(false)}
      >
        <CloseIcon style={{ fontSize: "2rem" }} />
      </div>

      {/* Modal Content */}
      <section className="bg-white w-[90%] lg:w-[60rem] h-[90vh] lg:h-[75vh] rounded-xl overflow-hidden shadow-lg">
        {/* Search Input */}
        <div className="flex items-center p-5 border-b border-gray-200">
          <input
            type="search"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 h-12 px-4 bg-transparent border-none focus:outline-none text-lg z-50"
            placeholder="Search for products..."
          />
          {query && (
            <button
              className="text-gray-500 hover:text-gray-800 transition-opacity duration-200 z-50"
              onClick={() => {
                setQuery("");
                setResults([]);
                setIsResult(false);
              }}
            >
              <CloseIcon />
            </button>
          )}
        </div>

        {/* Search Results */}
        <div className="p-5 overflow-y-auto max-h-[70vh]">
          {loading && <p className="text-gray-700">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {isResult && results.length === 0 && !loading && !error && (
            <div className="flex flex-col items-center justify-center h-full opacity-60">
              <p className="text-xl font-medium text-gray-700">
                No Results Found
              </p>
              <p className="text-lg text-gray-500">
                Try a different search term.
              </p>
            </div>
          )}
          {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((product, i) => (
                <div
                  key={product.product_id}
                  className={`flex gap-4 items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow duration-200 ${
                    selectedIndex === i ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleResultClick(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h1 className="text-lg font-medium text-gray-800">
                      {product.name}
                    </h1>
                    <p className="text-gray-600">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default SearchModal;
