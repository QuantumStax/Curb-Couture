/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ProductCard from "../components/productCard";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

const Carousel = ({ mainHead, subPara, itemList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setItemsPerSlide(4); // lg
      else if (width >= 768) setItemsPerSlide(2); // md
      else if (width >= 640) setItemsPerSlide(2); // sm
      else setItemsPerSlide(1); // mobile
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (currentIndex < itemList.length - itemsPerSlide) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="carousel-heading"
    >
      <div role="heading" className="mx-4 md:mx-10 lg:mx-20 my-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          {mainHead}
        </h1>
        <p className="text-gray-600 text-sm md:text-base">{subPara}</p>
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
            <div
              key={i}
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 p-2 sm:p-4"
            >
              <ProductCard
                offer={item.offer}
                badge={item.badge}
                imgSrc={item.imgSrc}
                brand={item.badge}
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
            className={`bg-white shadow-lg p-2 sm:p-3 rounded-full text-gray-700 hover:text-gray-900 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentIndex === 0}
            aria-label="Previous slide"
          >
            <KeyboardArrowLeftOutlinedIcon
              style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
            />
          </button>
        </div>
        <div className="absolute top-1/2 right-2 transform -translate-y-16">
          <button
            onClick={handleNext}
            className={`bg-white shadow-lg p-2 sm:p-3 rounded-full text-gray-700 hover:text-gray-900 ${
              currentIndex >= itemList.length - itemsPerSlide
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={currentIndex >= itemList.length - itemsPerSlide}
            aria-label="Next slide"
          >
            <KeyboardArrowRightOutlinedIcon
              style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
