/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CarouselCard from "./carouselCard";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

// Separate product details data
const productDetailsData = [
  { name: "Product 1", price: "$10", description: "Description for product 1" },
  { name: "Product 2", price: "$20", description: "Description for product 2" },
  { name: "Product 3", price: "$30", description: "Description for product 3" },
  { name: "Product 4", price: "$40", description: "Description for product 4" },
  { name: "Product 5", price: "$50", description: "Description for product 5" },
];

const ProductCarouselWithDetails = ({ mainHead, subPara, itemList, Icon }) => {
  // rotateInt controls the carousel rotation (positive for Prev clicks, negative for Next)
  const [rotateInt, setRotateInt] = useState(0);
  const innerCarouselRef = useRef(null);
  const cardRefs = useRef([]);
  const detailsRef = useRef(null);
  // To compare rotation changes and decide slide direction for details
  const prevRotateIntRef = useRef(rotateInt);

  // Memoized function to animate carousel cards using GSAP
  const animateSlider = useCallback(() => {
    if (!innerCarouselRef.current) return;
    const size = itemList.length;
    const panelSize = innerCarouselRef.current.clientWidth;
    // Calculate translateZ based on panel width and number of cards (using a multiplier)
    const translateZ =
      Math.round(panelSize / 2 / Math.tan(Math.PI / size)) * 1.7;
    const ry = 360 / size;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      // Compute the angle for this card based on the rotation index
      const z = rotateInt * ry + i * ry;
      gsap.to(card, {
        duration: 0.5,
        transform: `rotateY(${z}deg) translateZ(${translateZ}px) rotateY(${-z}deg)`,
        ease: "power3.out",
      });
    });
  }, [rotateInt, itemList]);

  // Animate the carousel cards when rotateInt changes
  useEffect(() => {
    animateSlider();
  }, [rotateInt, animateSlider]);

  // Handle window resize so the 3D layout remains correct
  useEffect(() => {
    const handleResize = () => {
      animateSlider();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [animateSlider]);

  // Animate the product details section whenever the rotation changes.
  useEffect(() => {
    if (!detailsRef.current) return;
    const prev = prevRotateIntRef.current;
    let fromX = 0;
    // If rotateInt increases (Prev button clicked), slide in from right.
    if (rotateInt > prev) {
      fromX = 100;
    } else if (rotateInt < prev) {
      // If rotateInt decreases (Next button clicked), slide in from left.
      fromX = -100;
    }
    gsap.fromTo(
      detailsRef.current,
      { x: fromX, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.inOut" }
    );
    prevRotateIntRef.current = rotateInt;
  }, [rotateInt]);

  // Navigation Handlers for Prev and Next buttons.
  const handlePrev = () => {
    setRotateInt((prev) => prev + 1);
  };
  const handleNext = () => {
    setRotateInt((prev) => prev - 1);
  };

  // Helper to check if a card is near the side and should be clickable.
  const getCardClickData = (i) => {
    const size = itemList.length;
    const ry = 360 / size;
    const z = rotateInt * ry + i * ry;
    const normalized = ((z % 360) + 360) % 360;
    const tolerance = 5;
    if (Math.abs(normalized - ry) < tolerance) {
      return { clickable: true, delta: -1, type: "clockwise" };
    } else if (Math.abs(normalized - (360 - ry)) < tolerance) {
      return { clickable: true, delta: 1, type: "counterclockwise" };
    }
    return { clickable: false, delta: 0, type: "" };
  };

  // Compute active card index based on rotateInt.
  // When rotateInt is 0, active index is 0; for negative rotateInt, the active index is (-rotateInt mod n)
  const activeIndex =
    ((-rotateInt % itemList.length) + itemList.length) % itemList.length;

  return (
    <div
      className="flex items-center px-20 bg-bg-main p-4"
      style={{ minHeight: "100vh" }}
    >
      {/* Left Section: Card Carousel */}
      <div
        className="relative"
        style={{
          width: "37.5rem",
          height: "28.125rem",
          perspective: "125rem",
          perspectiveOrigin: "top",
        }}
      >
        <button
          onClick={handlePrev}
          className="button-spin counterclockwise absolute top-[60%] -left-[5%] transform -translate-y-1/2 text-2xl font-bold text-primary_2 z-10 bg-bg-main pb-4 rounded-full w-[4rem] p-3"
        >
          <ArrowBackIosNewIcon />
        </button>
        <div
          className="inner-carousel relative mx-auto"
          ref={innerCarouselRef}
          style={{
            width: "14.063rem",
            top: "5rem",
            transformStyle: "preserve-3d",
          }}
        >
          {itemList.map((card, i) => {
            const { clickable, delta, type } = getCardClickData(i);
            let extraClasses = "";
            if (type === "clockwise" || type === "counterclockwise") {
              extraClasses = "cursor-pointer";
            } else {
              const ry = 360 / itemList.length;
              const z = rotateInt * ry + i * ry;
              const normalized = ((z % 360) + 360) % 360;
              if (Math.abs(normalized) < 5) extraClasses = "front";
            }
            return (
              <div
                key={card.id}
                ref={(el) => (cardRefs.current[i] = el)}
                onClick={
                  clickable
                    ? () => setRotateInt((prev) => prev + delta)
                    : undefined
                }
                className={`absolute p-5 w-[18rem] h-[20rem] px-2 rounded-lg shadow-xl ${extraClasses}`}
              >
                {/* <h4 className="font-light text-lg mb-2">{card.content}</h4> */}
                <CarouselCard
                  imgSrc={card.imgSrc}
                  brand={card.badge}
                  title={card.title}
                  price={card.price}
                  discount={card.discount}
                  rating={card.rating}
                />
              </div>
            );
          })}
        </div>
        <button
          onClick={handleNext}
          className="button-spin clockwise absolute top-[60%] -right-[15%] transform -translate-y-1/2 text-2xl font-bold text-primary_2 z-10 p-3 bg-bg-main pb-4 rounded-full w-[4rem]"
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
      {/* Right Section: Product Details */}
      <div
        className="relative left-[15%] top-[2rem] p-4 rounded-lg font-robert-regular"
        style={{ width: "30rem", minHeight: "25rem" }}
        ref={detailsRef}
      >
        <h1 className="text-4xl font-bold mb-2">
          {itemList[activeIndex].title}
        </h1>
        <h2 className="text-xl text-primary_2mb-2">
          {itemList[activeIndex].price}
        </h2>
        <p className="text-primary_2">
          {itemList[activeIndex].description}
        </p>
      </div>
    </div>
  );
};

export default ProductCarouselWithDetails;
