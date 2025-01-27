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
      path: "/my-account",
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
      path: "/wishlist",
    },
    {
      icon: React.createElement(ShoppingCartOutlinedIcon, {
        style: {
          fontSize: "1.7rem",
        },
      }),
      path: "/cart",
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
          <Link key={i} to={icon.path}>
            <div
              aria-label={icon.icon}
              className="cursor-pointer opacity-75 hover:opacity-100"
            >
              {icon.icon}
            </div>
          </Link>
        ))}
      </div>

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
