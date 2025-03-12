/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState, useEffect, useRef } from "react";
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
  product_size,
  product_color,
}) => {
  // Always call hooks at the top.
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const sliderRef = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  console.log(product_size);

  // Coupon state for submission handling.
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);

  // Determine if a valid address is provided.
  const hasAddress = Boolean(selectedAddress);

  const products = [
    {
      id: 1,
      image: product_image,
      name: product_name,
      price: Number(product_price),
      color: product_color,
      size: product_size,
      shippingAmount: 75,
    },
  ];

  const subtotal = products.reduce((sum, product) => sum + product.price, 0);
  const totalShipping =
    subtotal > 1200
      ? 0
      : products.reduce((sum, product) => sum + product.shippingAmount, 0);
  const finalPrice = subtotal - discountValue + totalShipping;

  useEffect(() => {
    try {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }
    } catch (error) {
      console.error("Container animation error:", error);
    }

    try {
      if (hasAddress && leftRef.current) {
        if (products.length > 1) {
          gsap.fromTo(
            leftRef.current.children,
            { opacity: 0, x: -40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            }
          );
        } else {
          gsap.fromTo(
            leftRef.current,
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
          );
        }
      }
    } catch (error) {
      console.error("Left section animation error:", error);
    }

    try {
      if (hasAddress && sliderRef.current) {
        if (products.length > 1) {
          gsap.fromTo(
            sliderRef.current.children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            }
          );
        } else if (rightRef.current && products.length === 1) {
          gsap.fromTo(
            rightRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
          );
        }
      }
    } catch (error) {
      console.error("Right section animation error:", error);
    }
  }, [hasAddress, products.length]);

  // Scroll functions.
  const scrollLeft = () => {
    try {
      const slider = sliderRef.current;
      gsap.to(slider, {
        duration: 0.5,
        scrollTo: { x: slider.scrollLeft - 300 },
        ease: "power3.out",
      });
    } catch (error) {
      console.error("Scroll left error:", error);
    }
  };

  const scrollRight = () => {
    try {
      const slider = sliderRef.current;
      gsap.to(slider, {
        duration: 0.5,
        scrollTo: { x: slider.scrollLeft + 300 },
        ease: "power3.out",
      });
    } catch (error) {
      console.error("Scroll right error:", error);
    }
  };

  // Coupon submission handler with error handling.
  const handleCouponSubmit = (e) => {
    e.preventDefault();
    try {
      if (!couponCode.trim()) {
        throw new Error("Please enter a coupon code.");
      }
      if (couponCode.trim().toUpperCase() !== "SAVE50") {
        throw new Error("Invalid coupon code.");
      }
      setDiscountValue(50);
      setAppliedCoupon(true);
      setCouponError("");
    } catch (error) {
      setDiscountValue(0);
      setAppliedCoupon(false);
      setCouponError(error.message);
    }
  };

  return (
    <>
      {!hasAddress ? (
        <div className="py-10 text-center text-red-500">
          No shipping address selected. Please select an address before
          reviewing your order.
        </div>
      ) : (
        <div>
          <div className="md:px-8 lg:px-10 max-w-7xl mx-auto font-robert-regular mt-[-2rem]">
            <h2 className="flex items-center justify-center gap-2 text-3xl font-bold mb-8 tracking-wider text-primary_2 uppercase">
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
                  products.length > 1
                    ? "overflow-y-scroll pr-4 hide-scrollbar"
                    : ""
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
                <div className="rounded-xl">
                  {products.length > 1 ? (
                    <div className="relative">
                      <button
                        ref={leftArrowRef}
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary_2 hover:bg-gray-300 rounded-full p-3 shadow-md z-10"
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
                            className="min-w-[280px] flex-shrink-0 border rounded-xl p-6 transition-transform duration-300 hover:scale-105"
                          >
                            <h4 className="text-xl font-semibold uppercase tracking-wider text-primary_2">
                              {product.name}
                            </h4>
                            <div className="flex gap-3 text-md text-gray-600 my-3">
                              <p className="uppercase">
                                Size:{" "}
                                <span className="font-medium">
                                  {product.size}
                                </span>
                              </p>
                              <p>
                                Color:{" "}
                                <span className="font-medium !uppercase">
                                  {product.color}
                                </span>
                              </p>
                            </div>
                            <div className="text-gray-700">
                              {/* <span className="font-medium">Price</span> */}
                              <span className="font-semibold text-xl">
                                ₹ {product.price}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        ref={rightArrowRef}
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-3 shadow-md z-10"
                      >
                        <ArrowForwardIosIcon fontSize="small" />
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-xl">
                      <h4 className="text-xl font-semibold uppercase tracking-wider text-primary_2">
                        {products[0].name}
                      </h4>
                      <div className="flex gap-3 text-md text-gray-300 my-3">
                        <p className="uppercase">
                          Size:{" "}
                          <span className="font-medium">
                            {products[0].size}
                          </span>
                        </p>
                        <p className="uppercase">
                          Color:{" "}
                          <span className="font-medium">
                            {products[0].color}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span className="font-medium">Price</span>
                        <span className="font-medium">
                          ₹ {products[0].price}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className=" pt-6 mt-6 space-y-4 text-primary_2">
                    <hr className="mb-6 h-[1.5px] bg-secondary_2 border-none" />
                    <div className="flex justify-between">
                      <span className="font-medium">Subtotal</span>
                      <span className="font-medium">₹ {subtotal}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-300 text-md">
                        <DiscountIcon className="mr-2" />
                        <span className="font-medium">Coupon</span>
                      </div>
                      <p className="text-gray-300 font-medium">
                        - ₹ {discountValue}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Shipping</span>
                      <span>₹ {totalShipping}</span>
                    </div>

                    <hr className="mt-4 mb-6 h-[1.5px] bg-secondary_2 border-none" />

                    <div className="flex justify-between text-primary_2 font-semibold">
                      <p className="text-lg">Final Price</p>
                      <p className="text-lg">₹ {finalPrice}</p>
                    </div>
                  </div>
                  <form
                    className="flex flex-col items-start mt-6"
                    onSubmit={handleCouponSubmit}
                  >
                    <div className="flex items-center w-full">
                      <input
                        type="text"
                        placeholder="Enter Coupon Code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-[85%] py-2 px-4 rounded-l-xl focus:outline-none text-secondary_light_os"
                      />
                      <button
                        type="submit"
                        className="py-2 px-6 rounded-r-xl uppercase bg-banner_2 font-semibold tracking-wider transition-colors text-primary_2"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="mt-2 text-red-500 text-sm">{couponError}</p>
                    )}
                  </form>
                </div>
                <div className="rounded-xl pb-16">
                  <h3 className="text-2xl font-bold font font-robert-regular mb-6 text-primary_2 tracking-wide">
                    Delivering to :
                  </h3>
                  <p className="text-md font-semibold text-primary_2 mb-2">
                    {selectedAddress.firstname} {selectedAddress.lastname}
                  </p>
                  <p className="text-md text-primary_2 leading-6">
                    {selectedAddress.house}, {selectedAddress.locality}
                    <br />
                    {selectedAddress.landmark && (
                      <>
                        {selectedAddress.landmark}
                        <br />
                      </>
                    )}
                    {selectedAddress.city}, {selectedAddress.state}
                    <br />
                    {selectedAddress.pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-secondary_2 mb-5 px-6 md:px-8 lg:px-10 z-50">
            <div className="max-w-7xl mx-auto">
              <button
                className="w-full bg-banner_2 text-primary_2 py-3 rounded-xl shadow-2xl transition-transform duration-300 uppercase font-semibold tracking-wider hover:shadow-xl"
                onClick={() => {
                  try {
                    setStep("billing");
                  } catch (error) {
                    console.error("Confirm order error:", error);
                  }
                }}
              >
                Confirm Order
              </button>
            </div>
          </div>

          <style jsx="true" global="true">{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default OrderSummary;
