/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HamburgerIcon from "./hamburgerIcon";
import SideMenu from "./navItemComponent";

const Nav2 = ({ setIsModalOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navContainerRef = useRef(null);
  const sideMenuRef = useRef(null);
  const location = useLocation();

  const actionIcons = [
    {
      icon: <PersonOutlineOutlinedIcon style={{ fontSize: "1.4rem" }} />,
      path: "/account",
    },
    {
      icon: <FavoriteBorderIcon style={{ fontSize: "1.4rem" }} />,
      path: "/wishlist",
    },
    {
      icon: <ShoppingCartOutlinedIcon style={{ fontSize: "1.4rem" }} />,
      path: "/my-cart",
    },
  ];

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close menu on outside click by checking both the nav and the side menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        navContainerRef.current &&
        sideMenuRef.current &&
        !navContainerRef.current.contains(e.target) &&
        !sideMenuRef.current.contains(e.target) &&
        !e.target.closest(".hamburger-btn")
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close menu on Escape press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Auto-close side menu after routing
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav
        ref={navContainerRef}
        role="navigation"
        aria-label="Primary Navigation"
        className="flex items-center justify-between bg-banner_2 text-primary_2 px-5 md:px-10 lg:px-10 py-2 sticky top-5 left-[2.5rem] z-50 w-[95%] rounded-lg"
      >
        <div className="hamburger-btn">
          <HamburgerIcon isOpen={isOpen} onClick={handleToggleMenu} />
        </div>

        {/* Logo */}
        <div>
          <a href="/" aria-label="Home">
            <p className="sm:text-2xl md:text-3xl font-bold text-center md:text-left lg:translate-x-[3.5rem] special-font font-911porschav3laser text-xl">
              RARE ZERO
            </p>
          </a>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
          <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
            <SearchIcon style={{ fontSize: "1.5rem" }} />
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
      </nav>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      <SideMenu isOpen={isOpen} menuRef={sideMenuRef} />
    </>
  );
};

export default Nav2;
