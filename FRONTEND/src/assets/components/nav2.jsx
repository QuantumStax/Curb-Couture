/* eslint-disable no-unused-vars */
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
const Nav = () => {
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
      className="flex items-center justify-between bg-banner px-20 py-2"
    >
      <div className="text-slate-950 p-2 cursor-pointer hover:opacity-60">
        <MenuIcon
          style={{
            fontSize: "2rem",
          }}
        />
      </div>
      <div>
        <a href="/" aria-label="Home">
          <p className="text-4xl font-fraunces font-bold translate-x-[3rem]">Curb Coture</p>
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
    </nav>
  );
};

export default Nav;
