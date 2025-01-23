import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Hero3GSAP = () => {
  const slides = [
    {
      id: 1,
      image: "/images/collection/doodle/doodles-shirt-559986.webp",
      heading: "Exciting Deal #1",
      button: "Shop Now",
    },
    {
      id: 2,
      image:
        "/images/collection/oversized/egyptian-oversized-t-shirt-302886.webp",
      heading: "Exciting Deal #2",
      button: "Discover More",
    },
    {
      id: 3,
      image:
        "/images/collection/oversized/medusa-oversized-t-shirt-753500.webp",
      heading: "Exciting Deal #3",
      button: "Check It Out",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const slideRefs = useRef([]);

  const handleNext = useCallback(() => {
    const tl = gsap.timeline();

    // Animate the current slide out
    tl.to(slideRefs.current[currentIndex], {
      x: "-100%",
      duration: 0.6,
      ease: "power2.out",
    });

    // Move to the next slide
    const nextIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(nextIndex);

    // Animate the next slide in
    tl.fromTo(
      slideRefs.current[nextIndex],
      { x: "100%" },
      { x: "0%", duration: 0.6, ease: "power2.out" }
    );

    setProgress(0);
  }, [currentIndex, slides.length]);

  const handlePrev = () => {
    const tl = gsap.timeline();

    // Animate the current slide out
    tl.to(slideRefs.current[currentIndex], {
      x: "100%",
      duration: 0.6,
      ease: "power2.out",
    });

    // Move to the previous slide
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(prevIndex);

    // Animate the previous slide in
    tl.fromTo(
      slideRefs.current[prevIndex],
      { x: "-100%" },
      { x: "0%", duration: 0.6, ease: "power2.out" }
    );

    setProgress(0);
  };

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [handleNext]);

  return (
    <div className="relative w-full overflow-hidden h-[40rem]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          ref={(el) => (slideRefs.current[index] = el)}
          className={`absolute inset-0 transition-opacity ${
            index === currentIndex ? "z-10" : "z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${slide.id}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
              {slide.heading}
            </h1>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all rounded-md text-lg">
              {slide.button}
            </button>
          </div>
        </div>
      ))}

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-50">
        {slides.map((_, index) => (
          <div
            key={index}
            className="h-2 w-1/4 bg-gray-400 rounded-full overflow-hidden relative"
          >
            <div
              className={`h-full bg-blue-600 transition-all duration-[100ms]`}
              style={{ width: index === currentIndex ? `${progress}%` : "0%" }}
            ></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 z-50"
        onClick={handlePrev}
      >
        <ArrowBackIosIcon fontSize="large" />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 z-50"
        onClick={handleNext}
      >
        <ArrowForwardIosIcon fontSize="large" />
      </button>
    </div>
  );
};

export default Hero3GSAP;
