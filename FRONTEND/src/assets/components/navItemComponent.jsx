import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StyleIcon from '@mui/icons-material/Style';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import StarIcon from '@mui/icons-material/Star';
import ArticleIcon from '@mui/icons-material/Article';
const NavItemComponent = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: React.createElement(HomeIcon, {
        style: {
          fontSize: "2rem",
        },
      }),
    },
    {
      name: "Top Deals",
      link: "/top-deals",
      icon: React.createElement(LocalOfferIcon, {
        style: {
          fontSize: "2rem",
        },
      }),
    },
    {
      name: "Classics",
      link: "/classics",
      icon: React.createElement(StyleIcon, {
        style: {
          fontSize: "2rem",
        },
      }),
    },
    {
      name: "Oversized",
      link: "/oversized",
      icon: React.createElement(ZoomOutMapIcon, {
        style: {
          fontSize: "2rem",
        },
      }),
    },
    {
      name: "Hoodies",
      link: "/hoodies",
      icon: React.createElement(AcUnitIcon, {
        style: {
          fontSize: "2rem",
        },
      }),
    },
    {
      name: "Contact",
      link: "/contact",
      icon: React.createElement(ContactMailIcon, {
        style: {
          fontSize: "2rem",
        },
      }),
    },
    {
      name: "Featured",
      link: "/featured",
      icon: React.createElement(StarIcon, {
        style: {
          fontSize: "2rem",
        },
      }),
    },
    {
      name: "Blogs",
      link: "/blogs",
      icon: React.createElement(ArticleIcon, {
        style: {
          fontSize: "2rem",
        },
      }),
    },
  ];
  return (
    <section className="text-banner relative top-[15%] left-[50%] w-[15rem] translate-x-[-7rem]">
      <div className="w-full">
        {navItems.map((item, i) => (
          <div key={i} className="w-full">
            <Link to={item.link}>
              <li className="flex items-center gap-4 list-none text-3xl leading-loose cursor-pointer hover:underline">
                <div>
                  {item.icon}
                </div>
                <p>
                  {item.name}
                </p>
              </li>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NavItemComponent;
