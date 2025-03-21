import { useEffect, useRef } from "react";
import gsap from "gsap";
import CallMadeIcon from "@mui/icons-material/CallMade";
import SouthIcon from "@mui/icons-material/South";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const containerRef = useRef(null);

  const handleScrollToRecent = () => {
    const target = document.getElementById("recent-additions");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power2.out" },
      });

      tl.from(".hero-heading", { opacity: 0, y: -30 });
      tl.from(".hero-subheading", { opacity: 0, y: 30 }, "-=0.6");
      tl.from(".hero-button", { opacity: 0, y: 30 }, "-=0.6");
      tl.from(
        ".hero-social-link",
        { opacity: 0, x: 50, stagger: 0.2 },
        "-=0.6"
      );
      tl.fromTo(
        ".hero-product-img",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.2, force3D: true },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative top-[-4rem] w-full h-screen min-h-[600px] overflow-hidden bg-secondary_2 md:h-[100vh]"
    >
      {/* Global Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />

      {/* Social Links - Hidden on small devices, visible on md and larger */}
      <div
        aria-label="social"
        className="hidden md:flex flex-col items-center justify-end gap-20 md:gap-20 fixed md:absolute bottom-4 md:right-10 md:top-24 md:h-[80vh] w-auto md:w-[5%] py-12 text-primary_2 z-30"
      >
        <a
          href="https://www.instagram.com/rarezero_?igsh=MTBuamxjOWY4bXE3aA=="
          className="md:rotate-90 w-fit nav-hover-social focus:outline-none focus:ring-2 focus:ring-primary_2 hero-social-link text-base"
          tabIndex={0}
        >
          Instagram
        </a>
        <a
          href="#"
          className="md:rotate-90 w-fit nav-hover-social focus:outline-none focus:ring-2 focus:ring-primary_2 hero-social-link text-base"
          tabIndex={0}
        >
          Twitter
        </a>
        <a
          href="#"
          className="md:rotate-90 w-fit nav-hover-social focus:outline-none focus:ring-2 focus:ring-primary_2 hero-social-link text-base"
          tabIndex={0}
        >
          Facebook
        </a>
      </div>

      {/* Hero Content Section */}
      <div className="absolute left-[4%] top-[10vh] md:top-[15vh] z-20 text-primary_2 w-[90%] md:w-[45%] px-4 md:px-0">
        <h1 className="uppercase text-5xl md:text-6xl lg:text-8xl tracking-tight font-Roman-SD special-font hero-heading">
          Threads define freedom
        </h1>
        <p className="mt-4 text-base md:text-xl font-light hero-subheading">
          Discover bold designs that speak your style.
        </p>
        <Link to="/featured">
          <button className="mt-6 md:mt-8 flex items-center gap-2 rounded-full bg-primary_2 text-secondary_light px-4 py-2 md:px-6 md:py-3 hover:bg-banner_2 hover:text-primary_2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary_2 hero-button">
            Shop Now <CallMadeIcon />
          </button>
        </Link>
      </div>

      {/* For larger devices: Show images with scroll button */}
      <div className="hidden md:flex relative left-0 md:left-[40%] top-[40%] md:top-[30%] flex-col md:flex-row items-end gap-5 w-full md:w-[40%] px-4 md:px-0">
        <div className="relative right-0 md:right-10 text-primary_2 self-center md:self-auto mb-8 md:mb-0">
          <button
            onClick={handleScrollToRecent}
            className="border border-primary_2 hover:scale-[1.05] hover:bg-primary_2 hover:text-secondary_2 rounded-full p-3 md:p-5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary_2"
          >
            <SouthIcon className="text-2xl md:text-3xl" />
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-5 w-full">
          <img
            src="/images/hero/one_piece_anime_oversized_tshirt.webp"
            alt="Oversized T-Shirt featuring a bold graphic print"
            className="w-full md:w-[50%] h-auto max-h-[400px] md:max-h-none object-cover rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-xl hero-product-img"
            loading="lazy"
          />
          <img
            src="/images/hero/obito_anime_oversized_tshirt.webp"
            alt="Limited Edition Oversized T-Shirt with dynamic design"
            className="w-full md:w-[50%] h-[200px] md:h-[30rem] object-cover rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-xl hero-product-img"
            loading="lazy"
          />
        </div>
      </div>

      {/* For small devices: Use one image as a background with a dark overlay */}
      <div
        className="md:hidden absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/hero/one_piece_anime_oversized_tshirt.webp')",
        }}
      >
        {/* Dark Overlay for background image */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        {/* Scroll Button Overlay */}
        <div className="absolute bottom-4 left-4 z-40">
          <button
            onClick={handleScrollToRecent}
            className="border border-primary_2 hover:scale-[1.05] hover:bg-primary_2 hover:text-secondary_2 rounded-full p-3 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary_2"
          >
            <SouthIcon className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
