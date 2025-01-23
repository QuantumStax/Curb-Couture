/* eslint-disable no-unused-vars */
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import NavItemComponent from "./navItemComponent";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Disable scrolling when the navbar is open
      document.body.style.overflow = "hidden";

      // Make the navbar visible before starting the animation
      navRef.current.style.display = "block";

      // Slide in animation
      gsap.fromTo(
        navRef.current,
        { x: "-100%" }, // Start position
        { x: "0%", duration: 0.5, ease: "power2.out" } // End position
      );
    } else {
      // Slide out animation
      gsap.to(navRef.current, {
        x: "-100%",
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          // Hide the navbar after the animation completes
          navRef.current.style.display = "none";

          // Enable scrolling
          document.body.style.overflow = "auto";
        },
      });
    }
  }, [isOpen]);

  const actionIcons = [
    {
      icon: React.createElement(SearchIcon, {
        style: {
          fontSize: "1.7rem",
        },
      }),
    },
    {
      icon: React.createElement(PersonOutlineOutlinedIcon, {
        style: {
          fontSize: "1.7rem",
        },
      }),
    },
    {
      icon: React.createElement(FavoriteBorderIcon, {
        style: {
          fontSize: "1.7rem",
        },
      }),
      icon2: React.createElement(FavoriteIcon, {
        style: {
          fontSize: "1.7rem",
        },
      }),
    },
    {
      icon: React.createElement(ShoppingCartOutlinedIcon, {
        style: {
          fontSize: "1.7rem",
        },
      }),
    },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Primary Navigation"
      className="flex items-center justify-between bg-banner px-20 py-2 relative"
    >
      <div
        className="text-slate-950 p-2 cursor-pointer hover:opacity-60"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MenuIcon
          style={{
            fontSize: "2rem",
          }}
        />
      </div>
      <div>
        <a href="/" aria-label="Home">
          <p className="text-4xl font-fraunces font-bold translate-x-[3rem]">
            Curb Coture
          </p>
        </a>
      </div>
      <div className="flex items-center gap-5">
        {actionIcons.map((icon, i) => (
          <div
            key={i}
            aria-label={icon.icon}
            className="cursor-pointer opacity-75 hover:opacity-100"
          >
            {icon.icon}
          </div>
        ))}
      </div>

      {/* Sliding NavItemComponent */}
      <div
        ref={navRef}
        className="fixed inset-0 w-screen h-screen bg-black z-50"
        style={{ display: "none" }}
      >
        <div
          className="text-primary relative top-[3.3rem] left-[5.5rem] cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <MenuOpenIcon
            style={{
              fontSize: "2.5rem",
            }}
          />
        </div>
        <NavItemComponent />
      </div>
    </nav>
  );
};

export default Nav;
