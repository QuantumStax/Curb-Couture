/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const MENU_ITEMS = [
  { menuItem: "Home", path: "/" },
  { menuItem: "Top-Deals", path: "/top-deals" },
  { menuItem: "Classics", path: "/classics" },
  { menuItem: "Hoodies", path: "/hoodies" },
  { menuItem: "Featured", path: "/featured" },
  { menuItem: "Contact", path: "/contact" },
  { menuItem: "Blog", path: "/blogs" },
];

const SideMenu = ({ isOpen, menuRef }) => {
  const menuItemsRef = useRef([]);

  useEffect(() => {
    // Kill any ongoing tweens to prevent conflicts
    if (menuRef.current) {
      gsap.killTweensOf(menuRef.current);
      gsap.killTweensOf(menuItemsRef.current);
    }

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
  }, [isOpen, menuRef]);

  return (
    <div
      ref={menuRef}
      // Setting the initial transform off-screen to avoid flashing open on mount.
      style={{ transform: "translateX(-100%)" }}
      className="fixed top-0 left-0 h-full z-40 bg-banner_2 text-white overflow-hidden py-16 lg:w-[30%] sm:w-[20rem]"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none rotate-90">
        <span className="text-white opacity-10 text-[20rem] font-robert-regular leading-none select-none">
          Rare Zero
        </span>
      </div>

      <nav className="relative mt-20 px-20">
        <ul className="flex flex-col gap-6">
          {MENU_ITEMS.map((item, i) => (
            <Link key={i} to={item.path}>
              <li
                ref={(el) => (menuItemsRef.current[i] = el)}
                className="!text-5xl font-robert-regular relative cursor-pointer sm:text-base md:text-xl group"
              >
                <span className="block pb-1 after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                  {item.menuItem}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
