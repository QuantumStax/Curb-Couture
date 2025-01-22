/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useState, memo } from "react";

const CategoryItem = memo(({ item, isHovered, onMouseEnter, onMouseLeave }) => (
  <article
    className="flex flex-col items-center pb-5 group cursor-pointer"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <img
      src={item.img}
      alt={`Category: ${item.name}`}
      className={`shadow-lg h-[15rem] w-[12rem] transition-transform duration-500 rounded-lg ${
        isHovered ? "scale-105" : ""
      }`}
    />
    <div className="mt-4">
      <p
        className={`text-base font-semibold transition-all duration-500 ${
          isHovered ? "nav-hover-btn" : ""
        }`}
      >
        {item.name}
      </p>
    </div>
  </article>
));

const Categories = () => {
  const categories = [
    {
      img: "/images/collection/oversized/mythical-dragon-oversized-t-shirt-462640.webp",
      name: "T-shirts",
    },
    {
      img: "/images/collection/retro/retro-shirt-225762.webp",
      name: "Shirts",
    },
    {
      img: "/images/categories/jeans_1.jpg",
      name: "Jeans",
    },
    {
      img: "/images/categories/pants_cargo.jpg",
      name: "Pants",
    },
    {
      img: "/images/categories/baggy.jpg",
      name: "Baggy",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-10 px-20 bg-primary">
      <h2 className="text-3xl" role="heading">
        Product Categories
      </h2>
      <div className="flex items-center justify-between gap-5 mt-10">
        {categories.map((item, i) => (
          <CategoryItem
            key={i}
            item={item}
            isHovered={hoveredIndex === i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </section>
  );
};

export default Categories;
