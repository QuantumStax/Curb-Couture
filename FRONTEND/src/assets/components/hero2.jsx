import { useEffect, useRef } from "react";
import gsap from "gsap";
import CallMadeIcon from "@mui/icons-material/CallMade";
import SouthIcon from "@mui/icons-material/South";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const containerRef = useRef(null);

  // Scroll handler to scroll to the RecentAdditions component
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
      className="relative top-[-4rem] w-full h-[100vh] overflow-hidden bg-secondary_2"
    >
      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Social Links */}
      <div
        aria-label="social"
        className="flex flex-col items-center justify-end gap-20 absolute right-10 top-24 h-[80vh] w-[5%] py-12 text-primary_2"
      >
        <a
          href="https://www.instagram.com/rarezero_?igsh=MTBuamxjOWY4bXE3aA=="
          className="rotate-90 w-fit nav-hover-social focus:outline-none focus:ring-2 focus:ring-primary_2 hero-social-link"
          tabIndex={0}
        >
          Instagram
        </a>
        <a
          href="#"
          className="rotate-90 w-fit nav-hover-social focus:outline-none focus:ring-2 focus:ring-primary_2 hero-social-link"
          tabIndex={0}
        >
          Twitter
        </a>
        <a
          href="#"
          className="rotate-90 w-fit nav-hover-social focus:outline-none focus:ring-2 focus:ring-primary_2 hero-social-link"
          tabIndex={0}
        >
          Facebook
        </a>
      </div>

      {/* Hero Title & Primary CTA */}
      <div className="absolute left-[4%] top-[15vh] z-20 text-primary_2 w-[45%]">
        <h1 className="uppercase text-8xl tracking-tight font-Roman-SD special-font hero-heading">
          Threads define freedom
        </h1>
        <p className="mt-4 text-xl font-light hero-subheading">
          Discover bold designs that speak your style.
        </p>
        <Link to="/featured">
          <button className="mt-8 flex items-center gap-2 rounded-full bg-primary_2 text-secondary_light px-6 py-3 hover:bg-banner_2 hover:text-primary_2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary_2 hero-button">
            Shop Now <CallMadeIcon />
          </button>
        </Link>
      </div>

      {/* Product Images & Scroll Button */}
      <div className="relative left-[40%] top-[30%] flex items-end gap-5 w-[40%]">
        <div className="relative right-10 text-primary_2">
          <button
            onClick={handleScrollToRecent}
            className="border border-primary_2 hover:scale-[1.05] hover:bg-primary_2 hover:text-secondary_2 rounded-full p-5 transition-all duration-150"
          >
            <SouthIcon />
          </button>
        </div>
        <img
          src="/images/hero/one_piece_anime_oversized_tshirt.webp"
          alt="Oversized T-Shirt featuring a bold graphic print"
          className="w-[50%] object-cover rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-xl hero-product-img"
          loading="lazy"
        />
        <img
          src="/images/hero/obito_anime_oversized_tshirt.webp"
          alt="Limited Edition Oversized T-Shirt with dynamic design"
          className="w-[50%] h-[30rem] object-cover rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-xl hero-product-img"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default HeroSlider;
