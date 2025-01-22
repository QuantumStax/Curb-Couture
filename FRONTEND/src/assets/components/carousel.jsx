/* eslint-disable react/prop-types */
import { useState } from "react";
import { recentCollection } from "../utils/recentCollection";
import ProductCard from "../components/productCard";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

const Carousel = ({mainHead, subPara, itemList}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 4;

  const handleNext = () => {
    if (currentIndex < recentCollection.length - itemsPerSlide) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div role="heading" className="mx-20 my-10">
        <h1 className="text-4xl font-semibold">{mainHead}</h1>
        <p className="text-gray-600">
          {subPara}
        </p>
      </div>
      <div className="relative">
        {/* Card Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
          }}
        >
          {itemList.map((item, i) => (
            <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <ProductCard
                offer={item.offer}
                badge={item.badge}
                imgSrc={item.imgSrc}
                brand={item.brand}
                title={item.title}
                price={item.price}
                discount={item.discount}
                rating={item.rating}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-2 transform -translate-y-16">
          <button
            onClick={handlePrev}
            className={`bg-white shadow-lg p-3 rounded-full text-gray-700 hover:text-gray-900 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentIndex === 0}
          >
            <KeyboardArrowLeftOutlinedIcon />
          </button>
        </div>
        <div className="absolute top-1/2 right-2 transform -translate-y-16">
          <button
            onClick={handleNext}
            className={`bg-white shadow-lg p-3 rounded-full text-gray-700 hover:text-gray-900 ${
              currentIndex >=
              Math.ceil(recentCollection.length / itemsPerSlide) - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={
              currentIndex >=
              Math.ceil(recentCollection.length / itemsPerSlide) - 1
            }
          >
            <KeyboardArrowRightOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
