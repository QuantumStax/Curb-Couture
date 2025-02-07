import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import Filter from "../pages/filter";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Sort from "../components/sort";

const ShopActionsMenu = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filterRef = useRef(null);
  const sortRef = useRef(null);

  const toggleFilter = () => {
    if (!isFilterOpen) {
      gsap.fromTo(
        filterRef.current,
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.to(filterRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(filterRef.current, { display: "none" });
        },
      });
    }
    setIsFilterOpen((prev) => !prev);
  };

  const toggleSort = () => {
    if (!isSortOpen) {
      const contentHeight = sortRef.current.scrollHeight;
      gsap.fromTo(
        sortRef.current,
        { height: 0, opacity: 0 },
        { height: contentHeight, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.to(sortRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(sortRef.current, { display: "none" });
        },
      });
    }
    setIsSortOpen((prev) => !prev);
  };

  useEffect(() => {
    if (filterRef.current) {
      gsap.set(filterRef.current, { x: "-100%", opacity: 0, display: "none" });
    }
    if (sortRef.current) {
      gsap.set(sortRef.current, { height: 0, opacity: 0, display: "none" });
    }
  }, []);

  useEffect(() => {
    if (isFilterOpen && filterRef.current) {
      gsap.set(filterRef.current, { display: "block" });
    }
    if (isSortOpen && sortRef.current) {
      gsap.set(sortRef.current, { display: "block" });
    }
  }, [isFilterOpen, isSortOpen]);

  return (
    <div className="flex items-end lg:gap-5 gap-2 lg:px-20 px-5 lg:py-22 py-16 h-[15rem]">
      {/* filter */}
      <div
        className="relative rounded-lg bg-secondary_2 text-primary_2 py-2 px-6 lg:w-[10rem] w-[10rem] h-[3rem] cursor-pointer hover:shadow-xl"
        onClick={toggleFilter}
      >
        <div className="relative -left-3 top-0.5 text-primary_2">
          <FilterListIcon />
        </div>
        <h1 className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xl font-semibold">
          Filter
        </h1>
      </div>
      {/* Filter Component */}
      <div
        ref={filterRef}
        className="fixed top-0 left-0 h-full lg:w-[25rem] w-[22rem] md:w-[25rem] z-50 shadow-lg"
      >
        <Filter toggleFilter={toggleFilter} />
      </div>
      {/* sort */}
      <div
        className="relative rounded-lg bg-transparent text-secondary_2 border border-secondary_2 transition-all duration-200 py-2 px-6 w-[10rem] h-[3rem] hover:shadow-xl cursor-pointer"
        onClick={toggleSort}
      >
        <div className="relative -left-3 top-0.5 opacity-75">
          <SortIcon />
        </div>
        <h1 className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xl font-semibold">
          Sort
        </h1>
        <div
          ref={sortRef}
          className="absolute top-[3.5rem] lg:left-[-1rem] left-[-0.5rem] lg:w-[12rem] md:w-[12rem] w-[10rem] rounded-md z-40"
        >
          <Sort />
        </div>
      </div>
    </div>
  );
};

export default ShopActionsMenu;
