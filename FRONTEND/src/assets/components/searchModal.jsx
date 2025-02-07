/* eslint-disable react/prop-types */
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const SearchModal = ({ setIsModalOpen }) => {
  const [isResult, setIsResult] = useState(false);
  const resultItems = [
    {
      img: "/images/collection/specials/starry-night-385896.webp",
      name: "Starry Night Oversized T-Shirt",
      price: "$876",
    },
    {
      img: "/images/collection/specials/starry-night-385896.webp",
      name: "Starry Night Oversized T-Shirt",
      price: "$876",
    },
    {
      img: "/images/collection/specials/starry-night-385896.webp",
      name: "Starry Night Oversized T-Shirt",
      price: "$876",
    },
    {
      img: "/images/collection/specials/starry-night-385896.webp",
      name: "Starry Night Oversized T-Shirt",
      price: "$876",
    },
    {
      img: "/images/collection/specials/starry-night-385896.webp",
      name: "Starry Night Oversized T-Shirt",
      price: "$876",
    },
  ];

  return (
    <section className="fixed inset-0 flex flex-col items-center justify-center z-50 backdrop-brightness-50 backdrop-blur-sm">
      {/* Close Button */}
      <div
        className="absolute top-2 right-5 lg:top-8 lg:right-10 text-primary cursor-pointer"
        onClick={() => setIsModalOpen(false)}
      >
        <CloseIcon
          style={{
            fontSize: "2rem",
          }}
        />
      </div>

      {/* Modal Content */}
      <section className="bg-white w-[90%] lg:w-[60rem] h-[90vh] lg:h-[75vh] rounded-xl overflow-hidden shadow-lg">
        {/* Search Input */}
        <div className="flex items-center p-5 border-b border-gray-200">
          <input
            type="search"
            name="search"
            className="flex-1 h-12 px-4 bg-transparent border-none focus:outline-none text-lg z-50"
            placeholder="Search"
          />
          <button
            className="text-gray-500 hover:text-gray-800 transition-opacity duration-200 z-50"
            onClick={() => setIsResult(false)}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Search Results */}
        {isResult ? (
          <div className="grid gap-4 p-5 lg:grid-cols-2 overflow-y-auto max-h-[70vh]">
            {resultItems.map((result, i) => (
              <div
                key={i}
                className="flex gap-4 items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow duration-200"
              >
                <img
                  src={result.img}
                  alt={result.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h1 className="text-lg font-medium text-gray-800">
                    {result.name}
                  </h1>
                  <p className="text-gray-600">{result.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center translate-y-[-5rem] h-full opacity-60">
            <p className="text-xl font-medium text-gray-700">No Result!</p>
            <p className="text-lg text-gray-500">Search for an Item</p>
          </div>
        )}
      </section>
    </section>
  );
};

export default SearchModal;
