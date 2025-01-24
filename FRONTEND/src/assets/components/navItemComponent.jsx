import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import React from "react";
import { Link } from "react-router-dom";
const NavItemComponent = () => {
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
  return (
    <section className="text-primary relative top-[30%] left-[50%] w-[10rem] translate-x-[-5rem]">
      <div className="w-full">
        {navItems.map((item, i) => (
          <div key={i} className="w-full">
            <Link to={item.link}>
              <li className="list-none text-3xl leading-loose cursor-pointer hover:underline">
                {item.name}
              </li>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NavItemComponent;
