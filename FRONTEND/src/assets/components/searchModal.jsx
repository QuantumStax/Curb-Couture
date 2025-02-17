/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { gsap } from "gsap";

const SearchModal = ({ setIsModalOpen }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isResult, setIsResult] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const closeIconRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    gsap.set(closeIconRef.current, { rotate: 0, scale: 1 });

    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      }
    );

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Debounce search input using an async/await (try/catch) approach
  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      setIsResult(false);
      return;
    }

    setLoading(true);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/search?query=${encodeURIComponent(query)}`
        );
        const { products = [], message = "" } = response.data;
        setResults(products);
        setIsResult(true);
        setSelectedIndex(-1);
        setLoading(false);
        setError("");
      } catch (err) {
        setError("Error fetching search results.");
        setLoading(false);
        setIsResult(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    if (results.length > 0) {
      gsap.fromTo(
        ".search-result-item",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, [results]);

  const handleCloseModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIsModalOpen(false);
      },
    });
  };

  const handleCloseIconClick = (e) => {
    gsap.to(closeIconRef.current, {
      rotate: 90,
      scale: 1.2,
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: handleCloseModal,
    });
  };

  const handleKeyDown = (e) => {
    if (!isResult || results.length === 0) {
      if (e.key === "Escape") {
        if (query) {
          setQuery("");
          setResults([]);
          setIsResult(false);
        } else {
          handleCloseModal();
        }
      }
      return;
    }

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
    } else if (e.key === "Escape") {
      if (query) {
        setQuery("");
        setResults([]);
        setIsResult(false);
      } else {
        handleCloseModal();
      }
    }
  };

  const handleResultClick = (product) => {
    navigate(`/products/${product.product_id}`);
    setIsModalOpen(false);
  };

  return (
    <section
      className="fixed inset-0 flex flex-col items-center justify-center z-50 backdrop-brightness-50 backdrop-blur-sm"
      ref={modalRef}
      role="dialog"
      aria-modal="true"
    >
      {/* Close Button */}
      <div
        className="absolute top-2 right-5 lg:top-8 lg:right-10 text-primary_2 cursor-pointer"
        ref={closeIconRef}
        onClick={handleCloseIconClick}
      >
        <CloseIcon style={{ fontSize: "2rem" }} />
      </div>

      {/* Modal Content */}
      <section className="bg-white w-[90%] lg:w-[60rem] h-[90vh] lg:h-[75vh] rounded-xl overflow-hidden shadow-2xl transform-gpu">
        {/* Search Input */}
        <div className="flex items-center p-6 border-b border-gray-200">
          <input
            ref={inputRef}
            type="text"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 h-12 px-4 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-secondary_2 transition-shadow text-lg z-50 appearance-none rounded-lg"
            placeholder="Start typing to discover new products!"
          />
          {query && (
            <button
              className="absolute left-[94%] text-gray-500 hover:text-gray-800 transition-opacity duration-200 z-50"
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
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {loading && (
            <div className="flex justify-center items-center h-full">
              {/* Spinner */}
              <div className="w-8 h-8 border-4 border-secondary_2 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}

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
                  className={`search-result-item flex gap-4 items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-transform duration-200 hover:scale-[1.02] ${
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
