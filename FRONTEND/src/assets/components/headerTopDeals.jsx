// import { Link } from "react-router-dom";

const HeaderTopDeals = () => {
  return (
    <div
      role="banner"
      aria-label="Top Deals"
      className="bg-primary py-2 flex items-center justify-center"
    >
      <p className="text-center font-medium">
        Free shipping on all international orders over{" "}
        <span className="font-bold">$35</span>
      </p>
      <a
        href="/shopnow"
        className="ml-2 underline text-blue-600 hover:text-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        aria-label="Shop Now for Free Shipping Deals"
      >
        Shop Now
      </a>
      <span role="img" aria-label="Package" className="ml-2">
        📦
      </span>
    </div>
  );
};

export default HeaderTopDeals;
