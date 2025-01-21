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
    <div className="relative flex items-center justify-center h-[36.1rem] w-full">
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

      <div className="relative text-secondary">
        <h1
          className="text-hero-head font-fraunces flex space-x-1 overflow-hidden"
          ref={textRef}
        >
          {"Curb Coture".split("").map((char, index) => (
            <span key={index} className="letter inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p className="text-3xl text-center" id="slogan">
          Redesigning Modern Elegance
        </p>

        <div className="flex flex-col justify-center rounded-3xl text-center w-[10rem] h-[3rem] translate-x-[25rem] mt-10 bg-primary text-text-main text-lg hover:bg-secondary transition-all duration-500 cursor-pointer font-semibold">
          <h3>Explore</h3>
        </div>
      </div>
    </div>
  );
};

export default Hero;
