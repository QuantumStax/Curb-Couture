/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import gsap from "gsap";

const HamburgerIcon = ({ isOpen, onClick }) => {
  const topBar = useRef(null);
  const middleBar = useRef(null);
  const bottomBar = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Animate to "X" (open state)
      gsap.to(topBar.current, {
        rotation: 45,
        y: 8,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(middleBar.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(bottomBar.current, {
        rotation: -45,
        y: -8,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      // Animate back to hamburger (closed state)
      gsap.to(topBar.current, {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(middleBar.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(bottomBar.current, {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  return (
    <button
      onClick={onClick}
      className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none z-[60]"
      aria-label="Toggle menu"
    >
      <span ref={topBar} className="block w-full h-0.5 bg-current my-1" />
      <span ref={middleBar} className="block w-full h-0.5 bg-current my-1" />
      <span ref={bottomBar} className="block w-full h-0.5 bg-current my-1" />
    </button>
  );
};

export default HamburgerIcon;
