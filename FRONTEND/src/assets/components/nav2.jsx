/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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

const Nav = ({ setIsModalOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      navRef.current.style.display = "block";
      document.addEventListener("mousedown", handleOutsideClick);
      gsap.fromTo(
        navRef.current,
        { x: "-100%" },
        { x: "0%", duration: 0.5, ease: "power2.out" }
      );
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
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
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const actionIcons = [
    {
      icon: <PersonOutlineOutlinedIcon style={{ fontSize: "1.4rem" }} />,
      path: "/account",
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
      className="flex items-center justify-between bg-banner_2 text-primary_2 px-5 md:px-10 lg:px-20 py-2 sticky top-5 left-[2.5rem] z-30 w-[95%] rounded-lg"
    >
      {/* Menu Icon for Mobile */}
      <div
        className="text-primary_2 p-2 cursor-pointer hover:opacity-60"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MenuIcon className="text-2xl sm:text-xl md:text-2xl" />
      </div>

      {/* Logo */}
      <div>
        <a href="/" aria-label="Home">
          <p className="sm:text-2xl md:text-3xl font-bold text-center md:text-left lg:translate-x-[3.5rem] special-font font-zentry text-xl">
            RARE ZERO
          </p>
        </a>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
        <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
          <SearchIcon
            style={{
              fontSize: "1.5rem",
            }}
          />
        </div>
        {actionIcons.map((icon, i) => (
          <div key={i}>
            <Link
              to={icon.path}
              className="cursor-pointer opacity-75 hover:opacity-100"
            >
              {icon.icon}
            </Link>
          </div>
        ))}
      </div>

      {/* Mobile Menu */}
      <div
        ref={navRef}
        className="fixed inset-0 lg:w-[30%] h-screen bg-secondary_2 z-50"
        style={{ display: "none" }}
      >
        <div
          className="text-primary_2 relative top-6 left-20 cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <MenuOpenIcon className="text-3xl sm:text-2xl md:text-3xl" />
        </div>
        <NavItemComponent setIsOpen={setIsOpen} />
      </div>
    </nav>
  );
};

export default Nav;
