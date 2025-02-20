/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StyleIcon from "@mui/icons-material/Style";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import StarIcon from "@mui/icons-material/Star";
import ArticleIcon from "@mui/icons-material/Article";
import gsap from "gsap";

const NavItemComponent = ({ isOpen, setIsOpen }) => {
  const containerRef = useRef(null);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: React.createElement(HomeIcon, { style: { fontSize: "2rem" } }),
    },
    {
      name: "Top Deals",
      link: "/top-deals",
      icon: React.createElement(LocalOfferIcon, { style: { fontSize: "2rem" } }),
    },
    {
      name: "Classics",
      link: "/classics",
      icon: React.createElement(StyleIcon, { style: { fontSize: "2rem" } }),
    },
    {
      name: "Oversized",
      link: "/oversized",
      icon: React.createElement(ZoomOutMapIcon, { style: { fontSize: "2rem" } }),
    },
    {
      name: "Hoodies",
      link: "/hoodies",
      icon: React.createElement(AcUnitIcon, { style: { fontSize: "2rem" } }),
    },
    {
      name: "Contact",
      link: "/contact",
      icon: React.createElement(ContactMailIcon, { style: { fontSize: "2rem" } }),
    },
    {
      name: "Featured",
      link: "/featured",
      icon: React.createElement(StarIcon, { style: { fontSize: "2rem" } }),
    },
    {
      name: "Blogs",
      link: "/blogs",
      icon: React.createElement(ArticleIcon, { style: { fontSize: "2rem" } }),
    },
    {
      name: "TEST",
      link: "/test",
      icon: React.createElement(ArticleIcon, { style: { fontSize: "2rem" } }),
    },
  ];

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const navItemsEls = containerRef.current.querySelectorAll("li");
      // Set initial state before animating
      gsap.set(navItemsEls, { opacity: 0, x: -50 });
      // Animate items when the navbar opens
      gsap.fromTo(
        navItemsEls,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", stagger: 0.1 }
      );
    }
  }, [isOpen]);

  return (
    <section
      ref={containerRef}
      className="text-primary_2 relative top-[15%] left-[50%] w-[15rem] translate-x-[-7rem]"
    >
      <div className="w-full">
        {navItems.map((item, i) => (
          <div key={i} className="w-full">
            <Link to={item.link} onClick={handleLinkClick}>
              <li
                className="flex items-center gap-4 list-none text-3xl leading-loose cursor-pointer hover:underline"
                onMouseEnter={(e) =>
                  gsap.fromTo(
                    e.currentTarget,
                    { scale: 1 },
                    { scale: 1.05, duration: 0.2 }
                  )
                }
                onMouseLeave={(e) =>
                  gsap.fromTo(
                    e.currentTarget,
                    { scale: 1.05 },
                    { scale: 1, duration: 0.2 }
                  )
                }
              >
                <div>{item.icon}</div>
                <p>{item.name}</p>
              </li>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NavItemComponent;
