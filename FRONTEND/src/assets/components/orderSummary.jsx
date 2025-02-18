/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DiscountIcon from "@mui/icons-material/Discount";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

gsap.registerPlugin(ScrollToPlugin);

const OrderSummary = ({
  selectedAddress,
  setStep,
  product_image,
  product_name,
  product_price,
  product_rating,
}) => {
  const shippingAddress = {
    label: selectedAddress.label,
    firstname: selectedAddress.firstname,
    lastname: selectedAddress.lastname,
    house: selectedAddress.house,
    locality: selectedAddress.locality,
    landmark: selectedAddress.landmark,
    city: selectedAddress.city,
    state: selectedAddress.state,
    pincode: selectedAddress.pincode,
  };

  const products = [
    {
      id: 1,
      image: product_image,
      name: product_name,
      price: product_price,
      color: "Red",
      size: "M",
      shippingAmount: 75,
    },
  ];

  const coupon = "SAVE50";
  const discount = 50;

  const subtotal = products.reduce((sum, product) => sum + product.price, 0);
  const totalShipping =
    subtotal > 1200
      ? 0
      : products.reduce((sum, product) => sum + product.shippingAmount, 0);
  const finalPrice = subtotal - discount + totalShipping;
  const savedAmount = discount;

  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const sliderRef = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    if (products.length > 1) {
      gsap.fromTo(
        leftRef.current.children,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    } else if (leftRef.current) {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );
    }

    if (products.length > 1 && sliderRef.current) {
      gsap.fromTo(
        sliderRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    } else if (rightRef.current && products.length === 1) {
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [products.length]);

  const scrollLeft = () => {
    const slider = sliderRef.current;
    gsap.to(slider, {
      duration: 0.5,
      scrollTo: { x: slider.scrollLeft - 300 },
      ease: "power3.out",
    });
  };

  const scrollRight = () => {
    const slider = sliderRef.current;
    gsap.to(slider, {
      duration: 0.5,
      scrollTo: { x: slider.scrollLeft + 300 },
      ease: "power3.out",
    });
  };

  const handleHoverEnter = (e) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 });
  };
  const handleHoverLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
  };

  return (
    <>
      <div className="py-10 px-6 md:px-8 lg:px-10 max-w-7xl mx-auto font-sans">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold mb-12 tracking-wider text-primary_2 uppercase">
          Order Summary
          <LocalShippingIcon fontSize="large" />
        </h2>
        <div
          ref={containerRef}
          className="flex flex-col md:flex-row gap-8 lg:gap-12 h-[70vh]"
        >
          <div
            ref={leftRef}
            className={`md:w-1/2 ${
              products.length > 1 ? "overflow-y-scroll pr-4 hide-scrollbar" : ""
            }`}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="relative rounded-xl overflow-hidden shadow-lg mb-6 h-64"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent" />
              </div>
            ))}
          </div>
          <div className="md:w-1/2 flex flex-col gap-6 overflow-y-auto hide-scrollbar">
            <div className="border border-gray-300 rounded-xl p-8 shadow-2xl bg-white">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 tracking-wide">
                Order Info
              </h3>
              {products.length > 1 ? (
                <div className="relative">
                  <button
                    ref={leftArrowRef}
                    onClick={scrollLeft}
                    onMouseEnter={handleHoverEnter}
                    onMouseLeave={handleHoverLeave}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-3 shadow-md z-10"
                  >
                    <ArrowBackIosIcon fontSize="small" />
                  </button>
                  <div
                    ref={sliderRef}
                    className="flex overflow-x-scroll hide-scrollbar space-x-6 px-12"
                  >
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="min-w-[280px] flex-shrink-0 border rounded-xl p-6 bg-gray-50 shadow-md transition-transform duration-300 hover:scale-105"
                      >
                        <h4 className="text-xl font-semibold uppercase tracking-wider text-gray-800">
                          {product.name}
                        </h4>
                        <div className="flex gap-3 text-md text-gray-600 my-3">
                          <p>
                            Size:{" "}
                            <span className="font-medium">{product.size}</span>
                          </p>
                          <p>
                            Color:{" "}
                            <span className="font-medium">{product.color}</span>
                          </p>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span className="font-medium">Price</span>
                          <span className="font-medium">₹ {product.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    ref={rightArrowRef}
                    onClick={scrollRight}
                    onMouseEnter={handleHoverEnter}
                    onMouseLeave={handleHoverLeave}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-3 shadow-md z-10"
                  >
                    <ArrowForwardIosIcon fontSize="small" />
                  </button>
                </div>
              ) : (
                <div className="border rounded-xl p-6 bg-gray-50 shadow-md transition-transform duration-300 hover:scale-105">
                  <h4 className="text-xl font-semibold uppercase tracking-wider text-gray-800">
                    {products[0].name}
                  </h4>
                  <div className="flex gap-3 text-md text-gray-600 my-3">
                    <p>
                      Size:{" "}
                      <span className="font-medium">{products[0].size}</span>
                    </p>
                    <p>
                      Color:{" "}
                      <span className="font-medium">{products[0].color}</span>
                    </p>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Price</span>
                    <span className="font-medium">₹ {products[0].price}</span>
                  </div>
                </div>
              )}
              <div className="border-t border-gray-300 pt-6 mt-6 space-y-4 text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium">₹ {subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 text-md">
                    <DiscountIcon className="mr-2" />
                    <span className="font-medium">{coupon}</span>
                  </div>
                  <p className="text-gray-700 font-medium">- ₹{savedAmount}</p>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Shipping</span>
                  <span>₹ {totalShipping}</span>
                </div>
                <hr className="mt-4 mb-6 h-[1.5px] bg-gray-300" />
                <div className="flex justify-between text-gray-900 font-semibold">
                  <p className="text-lg">Final Price</p>
                  <p className="text-lg">₹ {finalPrice}</p>
                </div>
              </div>
              <form className="flex items-center mt-6">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  className="w-[70%] py-2 px-4 border border-gray-300 rounded-l-xl focus:outline-none"
                />
                <button
                  type="submit"
                  className="py-2 px-6 border border-gray-300 rounded-r-xl uppercase bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold tracking-wider transition-colors"
                >
                  Apply
                </button>
              </form>
            </div>
            <div className="border border-gray-300 rounded-xl p-8 shadow-2xl bg-white">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 tracking-wide">
                Shipping Address
              </h3>
              <p className="text-md font-semibold text-gray-800 mb-2">
                {shippingAddress.firstname} {shippingAddress.lastname}
              </p>
              <p className="text-md text-gray-700 leading-6">
                {shippingAddress.house}, {shippingAddress.locality}
                <br />
                {shippingAddress.landmark && (
                  <>
                    {shippingAddress.landmark}
                    <br />
                  </>
                )}
                {shippingAddress.city}, {shippingAddress.state}
                <br />
                {shippingAddress.pincode}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 px-6 md:px-8 lg:px-10 max-w-7xl mx-auto">
        <button
          onMouseEnter={handleHoverEnter}
          onMouseLeave={handleHoverLeave}
          className="w-full bg-banner_2 text-secondary_2 py-3 rounded-xl shadow-2xl transition-transform duration-300 uppercase font-semibold tracking-wider hover:shadow-xl"
          onClick={() => setStep("billing")}
        >
          Confirm Order
        </button>
      </div>
      {/* Error resolved: Changed style tag attributes from boolean to string */}
      <style jsx="true" global="true">{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default OrderSummary;
