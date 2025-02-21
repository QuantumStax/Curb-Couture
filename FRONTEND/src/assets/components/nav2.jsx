/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SideMenu from "./navbar";

const Nav2 = ({ setIsModalOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navContainerRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        navContainerRef.current &&
        !navContainerRef.current.contains(e.target) &&
        !e.target.matches(".hamburger-btn")
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <nav
        ref={navContainerRef}
        role="navigation"
        aria-label="Primary Navigation"
        className="flex items-center justify-between bg-banner_2 text-primary_2 px-5 md:px-10 lg:px-20 py-2 sticky top-5 left-[2.5rem] z-30 w-[95%] rounded-lg"
      >
        <div
          className="hamburger-btn text-primary_2 p-2 cursor-pointer hover:opacity-60"
          onClick={handleToggleMenu}
        >
          <MenuIcon className="text-2xl sm:text-xl md:text-2xl" />
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

      <SideMenu isOpen={isOpen} />
    </>
  );
};

export default Nav2;
