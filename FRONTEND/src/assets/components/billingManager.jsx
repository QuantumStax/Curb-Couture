/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const BillingSection = ({
  product_image,
  product_name,
  product_price,
  product_rating,
}) => {
  const product = {
    id: 1,
    image: product_image,
    name: product_name,
    price: product_price,
    color: "Red",
    size: "M",
  };

  // Hardcoded coupon and discount details
  const coupon = "SAVE50";
  const discount = 50;
  const finalPrice = product.price - discount;
  const savedAmount = discount;

  // Payment options and selected payment method state
  const paymentOptions = ["Card", "UPI - Googlepay", "UPI - PhonePe"];
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0]);
  const [step, setStep] = useState("selection"); // "selection" or "confirmation"

  // Invoice details
  const orderId = "ORD-12345AB";
  const paymentId = "PAY-98765XYZ";

  // Refs for animations
  const containerRef = useRef(null);
  const paymentOptionsRef = useRef(null);
  const confirmationRef = useRef(null);
  const paymentDetailRef = useRef(null);

  // GSAP entry animations for container and payment options
  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    if (paymentOptionsRef.current) {
      gsap.fromTo(
        paymentOptionsRef.current.children,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, []);

  // Animate confirmation section when step changes
  useEffect(() => {
    if (step === "confirmation" && confirmationRef.current) {
      gsap.fromTo(
        confirmationRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [step]);

  // Animate payment details form when selectedPayment changes
  useEffect(() => {
    if (paymentDetailRef.current) {
      gsap.fromTo(
        paymentDetailRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [selectedPayment]);

  // Handlers
  const handlePaymentMethodChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handleProceedToPayment = () => {
    setStep("confirmation");
  };

  const handleConfirmAndPay = () => {
    alert(`Initiating Razorpay payment with ${selectedPayment} method.`);
    // Integrate Razorpay checkout here
  };

  const handleBack = () => {
    setStep("selection");
  };

  const handleHoverEnter = (e) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 });
  };

  const handleHoverLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-10">
      {/* Invoice & Billing Section */}
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-6 md:p-10"
      >
        {/* Invoice Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Billing
            </h2>
            <p className="text-sm text-gray-500">
              Complete your payment details below.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-gray-700 font-semibold">Order ID: {orderId}</p>
            <p className="text-gray-700 font-semibold">
              Payment ID: {paymentId}
            </p>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Product Invoice Details */}
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Invoice Details
            </h3>
            <div className="border rounded-md p-4 shadow-sm flex items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              <div className="w-full">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 text-left w-1/2">
                    Product Name:
                  </span>
                  <span className="text-sm font-medium text-right w-1/2">
                    {product.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 text-left w-1/2">
                    Color:
                  </span>
                  <span className="text-sm font-medium text-right w-1/2">
                    {product.color}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 text-left w-1/2">
                    Size:
                  </span>
                  <span className="text-sm font-medium text-right w-1/2">
                    {product.size}
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 text-left w-1/2">
                      Actual Price:
                    </span>
                    <span className="text-sm font-medium text-right w-1/2">
                      ₹{product.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 text-left w-1/2">
                      Coupon Applied:
                    </span>
                    <span className="text-sm font-medium text-right w-1/2">
                      {coupon}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 text-left w-1/2">
                      Discount:
                    </span>
                    <span className="text-sm font-medium text-right w-1/2">
                      ₹{discount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-green-700 text-left w-1/2">
                      Checkout Price:
                    </span>
                    <span className="text-base font-semibold text-green-700 text-right w-1/2">
                      ₹{finalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-500 text-sm text-left w-1/2">
                      You Saved:
                    </span>
                    <span className="text-green-500 text-sm font-medium text-right w-1/2">
                      ₹{savedAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Payment Method Section */}
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Choose Payment Method
            </h3>
            {step === "selection" && (
              <div ref={paymentOptionsRef} className="space-y-3">
                {paymentOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center border rounded-md px-4 py-3 cursor-pointer hover:shadow-lg transition-shadow"
                    onMouseEnter={handleHoverEnter}
                    onMouseLeave={handleHoverLeave}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option}
                      checked={selectedPayment === option}
                      onChange={handlePaymentMethodChange}
                      className="mr-3"
                    />
                    <span className="font-medium text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Animated Payment Details Form */}
            <div
              key={selectedPayment}
              ref={paymentDetailRef}
              className="mt-4 space-y-3"
            >
              {selectedPayment === "Card" && (
                <>
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full border rounded-md p-2"
                  />
                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    className="w-full border rounded-md p-2"
                  />
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder="Expiry Date (MM/YY)"
                      className="w-1/2 border rounded-md p-2"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-1/2 border rounded-md p-2"
                    />
                  </div>
                </>
              )}
              {selectedPayment === "UPI - Googlepay" && (
                <input
                  type="text"
                  placeholder="GooglePay UPI ID"
                  className="w-full border rounded-md p-2"
                />
              )}
              {selectedPayment === "UPI - PhonePe" && (
                <input
                  type="text"
                  placeholder="PhonePe UPI ID"
                  className="w-full border rounded-md p-2"
                />
              )}
            </div>

            {step === "selection" && (
              <button
                onClick={handleProceedToPayment}
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
                style={{ backgroundColor: "#343434" }}
                className="mt-4 px-6 py-3 text-white rounded-md font-semibold uppercase tracking-wider shadow-md transition-transform"
              >
                Proceed to Payment
              </button>
            )}
            {step === "confirmation" && (
              <div className="flex gap-4 mt-4" ref={confirmationRef}>
                <button
                  onClick={handleBack}
                  onMouseEnter={handleHoverEnter}
                  onMouseLeave={handleHoverLeave}
                  style={{ backgroundColor: "#343434" }}
                  className="px-6 py-3 text-white rounded-md font-semibold uppercase tracking-wider shadow-md transition-transform"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmAndPay}
                  onMouseEnter={handleHoverEnter}
                  onMouseLeave={handleHoverLeave}
                  style={{ backgroundColor: "#343434" }}
                  className="px-6 py-3 text-white rounded-md font-semibold uppercase tracking-wider shadow-md transition-transform"
                >
                  Confirm & Pay
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSection;
