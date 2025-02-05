import { useState } from "react";
import ProductCard from "./productCard";
import { Link } from "react-router-dom";

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
    <div className="relative lg:left-0 left-[-2rem]  lg:p-8 pb-5">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gap-6 md:gap-[2rem] ml-16">
        {displayedItems.map((item, i) => (
          <Link key={i} to={`/view/${item.product_id}`}>
            <ProductCard
              offer={item.offer}
              badge={item.badge}
              imgSrc={item.images?.length > 0 ? item.images[0] : "/images/placeholder.jpg"}
              brand={item.brand}
              title={item.name}
              price={item.price}
              discount={item.discount}
              rating={item.rating}
            />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="relative left-[30%] lg:left-[50%] lg:translate-x-[-50%] w-fit flex justify-center mt-6 items-center space-x-2">
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
