// /* eslint-disable react/prop-types */
// const ShopHero = ({ image, heading }) => {
//   return (
//     <div className="relative h-[30rem] bg-tertiary" id="hero">
//       <img src={image} alt="hero-img" className="lg:ml-20 pt-10" />
//       <div className="absolute top-[50%] left-[50%] lg:translate-x-[0] md:translate-x-0 translate-x-[-50%] translate-y-[-50%] lg:w-[40rem] w-fit p-5 text-primary font-extrabold font-itim">
//         <h1 className="w-fit lg:text-9xl text-7xl uppercase">{heading}</h1>
//       </div>
//     </div>
//   );
// };

// export default ShopHero;

/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ShopHero = ({ image, heading }) => {
  return (
    <div className="relative h-[32rem] w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt="Hero Background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center lg:items-start lg:ml-20 text-center lg:text-left">
        <h1 className="text-5xl lg:text-7xl font-bold uppercase">{heading}</h1>
        <p className="mt-4 text-lg lg:text-xl font-light max-w-lg">
          Discover our latest deals and exclusive collections. Don’t miss out!
        </p>
        
        {/* Call-to-Action Button */}
        <Link to="/shop">
          <button className="mt-6 px-6 py-3 text-lg font-medium bg-tertiary hover:bg-banner transition-all duration-300 rounded-lg shadow-lg">
            Shop Now
          </button>
        </Link>
      </div>

      {/* Product Image on Large Screens */}
      <div className="hidden lg:block absolute top-16 right-10 bottom-0 max-w-xs lg:max-w-md z-20">
        <img src={image} alt="Featured Product" className="z-20 relative w-full drop-shadow-lg" />
      </div>
    </div>
  );
};

export default ShopHero;
