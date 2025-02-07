import { Link } from "react-router-dom";
const OurBrand = () => {
  return (
    <div className="text-center px-4 sm:px-10 md:px-20 py-10">
      <h1 className="uppercase opacity-50 text-xs sm:text-sm font-bold">
        our brand
      </h1>
      <p className="text-xl sm:text-2xl md:text-4xl font-bold mt-5 mx-auto max-w-2xl">
        At Curb Couture, we create products that feel as good as they look.
        Every piece is built with quality materials, smart design, and unmatched
        comfort—designed to enhance your everyday life. Experience the
        difference with every touch.
      </p>
      <div className="mt-10 flex justify-center">
        <Link to="/featured">
          <p className="uppercase font-bold text-xs sm:text-sm nav-hover-btn">
            shop our collection
          </p>
        </Link>
      </div>
    </div>
  );
};

export default OurBrand;
