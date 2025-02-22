/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import gsap from "gsap";

const MENU_ITEMS = [
  "Top-Deals",
  "Classics",
  "Hoodies",
  "Featured",
  "Contact",
  "Blog",
];

const SideMenu = ({ isOpen }) => {
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);

  useEffect(() => {
    gsap.killTweensOf(menuRef.current);
    gsap.killTweensOf(menuItemsRef.current);

    if (isOpen) {
      gsap.set(menuRef.current, { clearProps: "transition" });
      gsap.set(menuRef.current, { x: "-100%" });
      gsap.to(menuRef.current, {
        x: "0%",
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.from(menuItemsRef.current, {
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.1,
      });
    } else {
      gsap.to(menuRef.current, {
        x: "-100%",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={`
        fixed top-0 left-0 h-full z-40
        bg-banner_2 text-white overflow-hidden py-16
        ${isOpen ? "lg:w-[30%] sm:w-[20rem]" : "w-0"}
      `}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none rotate-90">
        <span className="text-white opacity-10 text-[20rem] font-robert-regular leading-none select-none">
          Rare Zero
        </span>
      </div>

      <nav className="relative mt-20 px-20">
        <ul className="flex flex-col gap-6">
          {MENU_ITEMS.map((item, i) => (
            <li
              key={item}
              ref={(el) => (menuItemsRef.current[i] = el)}
              className={`
                !text-5xl font-robert-regular relative cursor-pointer
                sm:text-base md:text-xl group
              `}
            >
              <span
                className="
                  block pb-1
                  after:content-[''] after:block after:h-[2px] after:bg-white
                  after:scale-x-0 after:origin-left after:transition-transform after:duration-300
                  group-hover:after:scale-x-100
                "
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
