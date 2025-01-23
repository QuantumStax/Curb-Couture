import { useState } from "react";
import ProductCard from "./productCard";

/* eslint-disable react/prop-types */
const ShopCatalog = ({ items }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-8">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ml-16">
        {displayedItems.map((item) => (
          <ProductCard
            key={item.id}
            offer={item.offer}
            badge={item.badge}
            imgSrc={item.image}
            brand={item.brand}
            title={item.name}
            price={item.price}
            discount={item.discount}
            rating={item.rating}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            } text-gray-700 px-3 py-1 rounded-md`}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`${
                  currentPage === pageNumber
                    ? "bg-gray-800 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                } px-3 py-1 border rounded-md`}
                aria-current={currentPage === pageNumber ? "page" : undefined}
                aria-label={`Page ${pageNumber}`}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            } text-gray-700 px-3 py-1 rounded-md`}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopCatalog;
