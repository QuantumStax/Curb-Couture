/* eslint-disable react/prop-types */
// src/components/PageTransitionWrapper.jsx
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";

const PageTransitionWrapper = ({ children }) => {
  const wrapperRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    gsap.set(wrapperRef.current, { x: -100 });

    const tl = gsap.timeline();
    tl.to(wrapperRef.current, {
      x: 0,
      duration: 1,
      ease: "power1.out",
    });

    return () => {
      tl.kill();
    };
  }, [location]);

  return (
    <div ref={wrapperRef} className="min-h-screen">
      {children}
    </div>
  );
};

export default PageTransitionWrapper;
