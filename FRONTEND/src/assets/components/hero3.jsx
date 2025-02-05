import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

const HeroSlider2 = () => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      src: "/images/hero/new_york_oversized_tshirt.webp",
      heading: "Welcome to Slide 1",
      text: "This is the first slide",
      buttonText: "Learn More",
    },
    {
      src: "/images/hero/obito_anime_oversized_tshirt.webp",
      heading: "Explore Slide 2",
      text: "This is the second slide",
      buttonText: "Discover",
    },
    {
      src: "/images/hero/one_piece_anime_oversized_tshirt.webp",
      heading: "Enjoy Slide 3",
      text: "This is the third slide",
      buttonText: "Get Started",
    },
  ];

  const slideTo = useCallback((index) => {
    const slider = sliderRef.current;
    if (slider) {
      gsap.to(slider, {
        x: -index * 100 + "%",
        duration: 0.8,
        ease: "power2.out",
      });
    }
    setCurrentIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    slideTo((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, slideTo]);

  const prevSlide = useCallback(() => {
    slideTo((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, slideTo]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-play every 5 seconds
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[92vh] overflow-hidden">
      <div
        ref={sliderRef}
        className="flex transition-transform duration-500 ease-out"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-[92vh] flex items-center justify-center bg-cover bg-center"
            style={{
              backgroundImage: `url(${image.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col items-center justify-center bg-black h-full w-full bg-opacity-50 p-6 rounded-lg">
              <h2 className="text-3xl font-bold text-white mb-4">
                {image.heading}
              </h2>
              <p className="text-white mb-4">{image.text}</p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                {image.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full hover:bg-opacity-75"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full hover:bg-opacity-75"
      >
        ❯
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => slideTo(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider2;
