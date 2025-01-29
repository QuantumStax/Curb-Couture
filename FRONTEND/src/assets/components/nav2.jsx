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
import { Link } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      navRef.current.style.display = "block";
      gsap.fromTo(
        navRef.current,
        { x: "-100%" },
        { x: "0%", duration: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.to(navRef.current, {
        x: "-100%",
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          navRef.current.style.display = "none";
          document.body.style.overflow = "auto";
        },
      });
    }
  }, [isOpen]);

  const actionIcons = [
    { icon: <SearchIcon style={{ fontSize: "1.4rem" }} /> },
    {
      icon: <PersonOutlineOutlinedIcon style={{ fontSize: "1.4rem" }} />,
      path: "/my-account",
    },
    {
      icon: <FavoriteBorderIcon style={{ fontSize: "1.4rem" }} />,
      icon2: <FavoriteIcon style={{ fontSize: "1.4rem" }} />,
      path: "/wishlist",
    },
    {
      icon: <ShoppingCartOutlinedIcon style={{ fontSize: "1.4rem" }} />,
      path: "/my-cart",
    },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Primary Navigation"
      className="flex items-center justify-between bg-banner px-5 md:px-10 lg:px-20 py-2 relative"
    >
      {/* Menu Icon for Mobile */}
      <div
        className="text-slate-950 p-2 cursor-pointer hover:opacity-60"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MenuIcon className="text-2xl sm:text-xl md:text-2xl" />
      </div>

      {/* Logo */}
      <div>
        <a href="/" aria-label="Home">
          <p className="text-xl sm:text-2xl md:text-3xl font-fraunces font-bold text-center md:text-left lg:translate-x-[3.5rem]">
            Curb Coture
          </p>
        </a>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
        {actionIcons.map((icon, i) => (
          <Link
            key={i}
            to={icon.path}
            className="cursor-pointer opacity-75 hover:opacity-100"
          >
            {icon.icon}
          </Link>
        ))}
      </div>

      {/* Mobile Menu */}
      <div
        ref={navRef}
        className="fixed inset-0 w-screen h-screen bg-black z-50"
        style={{ display: "none" }}
      >
        <div
          className="text-primary relative top-10 left-10 cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <MenuOpenIcon className="text-3xl sm:text-2xl md:text-3xl" />
        </div>
        <NavItemComponent />
      </div>
    </nav>
  );
};

export default Nav;
