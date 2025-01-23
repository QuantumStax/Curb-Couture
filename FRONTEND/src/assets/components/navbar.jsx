import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const navItems = [
    {
      id: 1,
      name: "Top Deals",
      icon: React.createElement(LocalOfferIcon),
      link: "/top-deals",
    },
    {
      id: 2,
      name: "Contact",
      link: "/contact",
    },
    {
      id: 3,
      name: "About",
      link: "/about",
    },
    {
      id: 4,
      name: "Featured",
      link: "/featured",
    },
    {
      id: 5,
      name: "Blogs",
      link: "/blogs",
    },
  ];

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
      className="flex items-center gap-[20rem] bg-primary px-20 py-2"
    >
      <a href="/" aria-label="Home">
        <img
          src="/images/logos/logo-no-background.png"
          alt="logo"
          className="h-1w-24 w-24 rounded-full cursor-pointer"
        />
      </a>
      <div className="flex items-center gap-5 text-base font-semibold translate-x-12">
        {navItems.map((item, i) => (
          <Link key={i} to={item.link} className="">
            <li
              className="list-none flex items-center gap-1 nav-hover-btn"
              aria-label={item.name}
            >
              {item.name}
              <div>{item.icon}</div>
            </li>
          </Link>
        ))}
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
    </nav>
  );
};

export default Navbar;
