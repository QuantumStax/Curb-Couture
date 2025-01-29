import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const letters = textRef.current.querySelectorAll(".letter");
    gsap.fromTo(
      letters,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        stagger: 0.1,
        duration: 1.5,
        ease: "power3.out",
      }
    );
    gsap.fromTo(
      "#slogan",
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        delay: 1,
        duration: 1.5,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="relative flex items-center lg:justify-center md:justify-center h-[36.1rem] w-full sm:h-[28rem]">
      {/* Background Image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url('/images/hero/burgess-milner-OYYE4g-I5ZQ-unsplash.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "brightness(40%)",
        }}
      ></div>

      {/* Content */}
      <div className="relative text-secondary px-5 w-full">
        {/* Heading */}
        <h1
          className="font-fraunces flex justify-center md:justify-center space-x-1 overflow-hidden text-center"
          ref={textRef}
        >
          {"Curb Coture".split("").map((char, index) => (
            <span
              key={index}
              className="letter inline-block text-5xl lg:text-9xl md:text-7xl sm:text-4xl"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Slogan */}
        <p
          className="text-3xl md:text-2xl sm:text-xl text-center mt-3"
          id="slogan"
        >
          Redesigning Modern Elegance
        </p>

        {/* Explore Button */}
        <div className="flex justify-center mt-10">
          <div className="flex items-center justify-center rounded-3xl text-center w-[10rem] h-[3rem] bg-primary text-text-main text-lg md:w-[8rem] md:h-[2.5rem] sm:w-[7rem] sm:h-[2.5rem] sm:text-base hover:bg-secondary transition-all duration-500 cursor-pointer font-semibold">
            <h3>Explore</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
