// Test.js
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Test() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Sticky header background transition on scroll
    const header = document.querySelector("header");
    ScrollTrigger.create({
      trigger: header,
      start: "top top",
      onEnter: () => gsap.to(header, { backgroundColor: darkMode ? "rgba(31,41,55,0.9)" : "rgba(255,255,255,0.9)", duration: 0.5 }),
      onLeaveBack: () => gsap.to(header, { backgroundColor: "transparent", duration: 0.5 }),
    });

    // Hero section timeline animation
    const heroTimeline = gsap.timeline();
    heroTimeline.from(".hero-title", { opacity: 0, duration: 1, y: -50 })
      .from(".hero-subtitle", { opacity: 0, duration: 1, y: 50 }, "-=0.5")
      .from(".hero-button", { opacity: 0, duration: 1, y: 50 }, "-=0.5");

    // Animate sections on scroll with subtle reveal
    gsap.utils.toArray(".animate-section").forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    });

    // Enhanced multi-layer parallax effect for dramatic scroll experience
    gsap.to(".parallax-layer", {
      y: -150,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top bottom",
        scrub: true,
      },
    });
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
        {/* Sticky Header */}
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 transition-all duration-500">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Curb-Couture</h1>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-gray-800 dark:text-gray-200 transition-colors duration-300"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </header>

        <main className="pt-20">
          {/* Hero Banner */}
          <section
            className="hero-section relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: 'url("/images/categories/hoodies.png")' }}
          >
            <div className="overlay absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
            <div className="relative z-10 text-center px-4">
              <h2 className="hero-title text-5xl md:text-7xl font-extrabold text-white">
                Elevate Your Style
              </h2>
              <p className="hero-subtitle mt-4 text-xl text-white">
                Discover premium, playful T-shirts for the modern youth.
              </p>
              <button className="hero-button mt-8 px-6 py-3 bg-white text-gray-900 font-semibold rounded hover:bg-gray-100 transition duration-300">
                Explore Collection
              </button>
            </div>
          </section>

          {/* Product Collection Section */}
          <section className="animate-section py-20 px-4">
            <div className="container mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Collection
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="group relative overflow-hidden rounded-lg shadow-lg">
                    <img
                      src="https://via.placeholder.com/400"
                      alt={`Product ${item}`}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="text-white font-semibold text-xl">T-Shirt {item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Enhanced Parallax Section */}
          <section className="parallax-section relative h-96 overflow-hidden">
            <div
              className="parallax-layer absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url("https://via.placeholder.com/1500")' }}
            ></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <h3 className="text-4xl font-bold text-white">Experience the Difference</h3>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="animate-section py-20 px-4 bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                At Curb-Couture, we blend premium aesthetics with playful energy, crafting T-shirts that redefine street style for the modern youth. Our designs celebrate individuality and bold self-expression.
              </p>
            </div>
          </section>

          {/* Optional Testimonials Section */}
          <section className="animate-section py-20 px-4">
            <div className="container mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">What Our Customers Say</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map((testimonial) => (
                  <div key={testimonial} className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                    <p className="text-gray-700 dark:text-gray-200">
                      I absolutely love Curb-Couture! The quality is unmatched, and the designs are bold and stylish.
                    </p>
                    <span className="block mt-4 text-gray-500 dark:text-gray-400">- Customer {testimonial}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-6 text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Curb-Couture. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Test;
