import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

const cards = [
  {
    id: 1,
    content: "Now, now. Perfectly symmetrical violence never solved anything.",
  },
  { id: 2, content: "No! The cat shelter's on to me." },
  { id: 3, content: "Acting Unit 0.8" },
  { id: 4, content: "Uh, is the puppy mechanical in any way?" },
  { id: 5, content: "Dr. Zoidberg, that doesn't make sense." },
];

const CardCarousel3D = () => {
  const [rotateInt, setRotateInt] = useState(0);
  const innerCarouselRef = useRef(null);
  const cardRefs = useRef([]);

  const animateSlider = useCallback(() => {
    if (!innerCarouselRef.current) return;
    const size = cards.length;
    const panelSize = innerCarouselRef.current.clientWidth;
    // Calculate translateZ value (using original formula and multiplier)
    const translateZ =
      Math.round(panelSize / 2 / Math.tan(Math.PI / size)) * 1.7;
    const ry = 360 / size;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const z = rotateInt * ry + i * ry;
      gsap.to(card, {
        duration: 0.5,
        transform: `rotateY(${z}deg) translateZ(${translateZ}px) rotateY(${-z}deg)`,
        ease: "power3.out",
      });
    });
  }, [rotateInt]);

  useEffect(() => {
    animateSlider();
  }, [rotateInt, animateSlider]);

  // Handle window resize to re-calc positions
  useEffect(() => {
    const handleResize = () => {
      animateSlider();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [animateSlider]);

  const handlePrev = () => {
    setRotateInt((prev) => prev + 1);
  };

  const handleNext = () => {
    setRotateInt((prev) => prev - 1);
  };

  // Determine clickable card data using a tolerance threshold (5°)
  const getCardClickData = (i) => {
    const size = cards.length;
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

  return (
    <div
      className="relative mx-auto"
      style={{
        height: "450px",
        perspective: "2000px",
        perspectiveOrigin: "top",
      }}
    >
      {/* Left Navigation Button */}
      <button
        onClick={handlePrev}
        className="button-spin counterclockwise absolute top-1/2 left-0 transform -translate-y-1/2 text-2xl font-bold text-gray-700 hover:text-gray-900"
      >
        &lt;
      </button>

      {/* Inner Carousel Container */}
      <div
        className="inner-carousel relative mx-auto"
        ref={innerCarouselRef}
        style={{
          width: "225px",
          top: "80px",
          transformStyle: "preserve-3d",
        }}
      >
        {cards.map((card, i) => {
          const { clickable, delta, type } = getCardClickData(i);
          let extraClasses = "";
          if (type === "clockwise" || type === "counterclockwise") {
            extraClasses = "cursor-pointer";
          } else {
            const ry = 360 / cards.length;
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
              className={`absolute p-5 w-[220px] h-[300px] bg-white rounded-lg shadow-xl ${extraClasses}`}
            >
              <h4 className="font-light text-lg mb-2">{card.content}</h4>
            </div>
          );
        })}
      </div>

      {/* Right Navigation Button */}
      <button
        onClick={handleNext}
        className="button-spin clockwise absolute top-1/2 right-0 transform -translate-y-1/2 text-2xl font-bold text-gray-700 hover:text-gray-900"
      >
        &gt;
      </button>
    </div>
  );
};

export default CardCarousel3D;
