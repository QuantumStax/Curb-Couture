import { Link } from "react-router-dom";
const NavItemComponent = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Top Deals",
      link: "/top-deals",
    },
    {
      name: "Men",
      link: "/mens-collection",
    },
    {
      name: "Women",
      link: "/womens-collection",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "About",
      link: "/about-us",
    },
    {
      name: "Featured",
      link: "/featured",
    },
    {
      name: "Blogs",
      link: "/blogs",
    },
  ];
  return (
    <section className="text-banner relative top-[15%] left-[50%] w-[10rem] translate-x-[-5rem]">
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
