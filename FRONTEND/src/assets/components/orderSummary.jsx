/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DiscountIcon from "@mui/icons-material/Discount";

const OrderSummary = ({ selectedAddress, setStep }) => {
  // Construct shipping address details from props
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

  // Manually defined product and billing details
  const product = {
    id: 1,
    image: "/images/categories/new_york_green_font_tshirt.webp",
    name: "Sample Product",
    price: 1000,
    color: "Red",
    size: "M",
    shippingAmount: 75,
  };

  const coupon = "SAVE50";
  const discount = 50; // ₹50 discount
  const finalPrice = product.price - discount;
  const savedAmount = discount;

  // Refs for GSAP animations
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Animate the entire container: fade in and slide up
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
    // Animate left section: slide in from left
    gsap.fromTo(
      leftRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
    );
    // Animate right section: slide in from right
    gsap.fromTo(
      rightRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
    );
  }, []);

  // GSAP button hover effects
  const handleButtonEnter = (e) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 });
  };
  const handleButtonLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
  };
  const handleButtonDown = (e) => {
    gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1 });
  };
  const handleButtonUp = (e) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.1 });
  };

  return (
    <div className="py-8 px-4">
      <h2 className="flex items-center justify-center gap-2 text-3xl font-bold uppercase mb-10">
        Order Summary
        <LocalShippingIcon fontSize="large" />
      </h2>
      <div
        ref={containerRef}
        className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto"
      >
        {/* Left: Product Image Card */}
        <div
          ref={leftRef}
          className="md:w-1/2 relative h-96 rounded-xl overflow-hidden shadow-xl"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold uppercase">{product.name}</h2>
            <p className="text-xl font-bold mt-2">₹ {product.price}</p>
          </div>
        </div>

        {/* Right: Order Info & Shipping Address */}
        <div ref={rightRef} className="md:w-1/2 flex flex-col gap-6">
          {/* Order Info Card */}
          <div className="border border-gray-300 rounded-xl p-6 shadow-md">
            <h3 className="text-2xl font-bold mb-4">Order Info</h3>
            <div>
              <h4 className="text-xl font-bold uppercase">{product.name}</h4>
              <div className="flex gap-4 text-lg my-2">
                <p>
                  Size: <span className="font-semibold">{product.size}</span>
                </p>
                <p>
                  Color: <span className="font-semibold">{product.color}</span>
                </p>
              </div>
              <p className="text-xl flex justify-between w-[95%]">
                <span>Subtotal</span>
                <span className="text-green-500 font-semibold">
                  ₹ {product.price}
                </span>
              </p>
              <div className="flex justify-between w-[95%]">
                <p className="text-lg text-gray-600 mt-2">
                  <span>
                    <DiscountIcon />
                  </span>
                  <span className="font-medium">{coupon}</span>
                </p>
                <p>- ₹{savedAmount}</p>
              </div>
              <div>
                <form>
                  <input
                    type="text"
                    className="w-[80%] py-1 my-2 bg-transparent border border-secondary_2 px-4"
                    placeholder="Enter Coupon Code"
                  />
                  <button
                    type="submit"
                    className="py-1 ml-4 px-4 border border-secondary_2 uppercase hover:bg-secondary_2 hover:text-primary_2"
                  >
                    Apply
                  </button>
                </form>
              </div>
              <div className="flex justify-between w-[95%]">
                <p className="text-xl">Shipping</p>
                <p>₹ {product.shippingAmount}</p>
              </div>
              <hr className="mt-4 h-[1.5px] bg-secondary_2 w-[95%]" />
              <div className="flex justify-between w-[95%]">
               <p className="text-xl font-bold mt-4">Final Price</p> 
               <p className="text-xl font-bold mt-4">₹ {finalPrice}</p>
              </div>
            </div>
          </div>
          {/* Shipping Address Card */}
          <div className="border border-gray-300 rounded-xl p-6 shadow-md">
            <h3 className="text-2xl font-bold mb-4">Shipping Address</h3>
            <p className="text-lg font-semibold">
              {shippingAddress.firstname} {shippingAddress.lastname}
            </p>
            <p className="text-lg">
              {shippingAddress.house},<br /> {shippingAddress.locality}
              <br />
              {shippingAddress.landmark}
              <br />
              {shippingAddress.city}, {shippingAddress.state}
              <br />
              {shippingAddress.pincode}
            </p>
          </div>
          {/* Confirm Order Button */}
          <button
            ref={buttonRef}
            onMouseEnter={handleButtonEnter}
            onMouseLeave={handleButtonLeave}
            onMouseDown={handleButtonDown}
            onMouseUp={handleButtonUp}
            className="w-full bg-gradient-to-r from-[#E6F62B] to-[#E6F52E] text-secondary_2 py-3 rounded-lg shadow-lg transition duration-300 uppercase font-semibold"
            onClick={() => setStep("billing")}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
