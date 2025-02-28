/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const BillingSection = ({ product_name, product_price }) => {
  const product = [
    {
      id: 1,
      name: product_name,
      price: product_price,
      color: "Red",
      size: "M",
    },
  ];

  // Hardcoded coupon and discount details
  const coupon = "SAVE50";
  const discount = 50;
  const finalPrice = product.price - discount;
  const savedAmount = discount;

  // Updated payment options with icons (update the image paths as needed)
  const paymentOptions = [
    { name: "Card", icon: "/images/payment_icons/icons8-card-50_white.png" },
    { name: "Googlepay", icon: "/images/payment_icons/icons8-google-pay.png" },
    { name: "PhonePe", icon: "/images/payment_icons/icons8-phone-pe-48.png" },
  ];
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0].name);
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
    <div className="min-h-screen">
      {/* Invoice & Billing Section */}
      <h2 className="relative top-[-2.5rem] left-[45%] text-2xl md:text-3xl font-bold text-primary_2 uppercase w-fit">
        Billing
      </h2>
      <div ref={containerRef} className="rounded-lg">
        {/* Invoice Header */}
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-primary_2 font-semibold">Order ID: {orderId}</p>
          <p className="text-primary_2 font-semibold">
            Payment ID: {paymentId}
          </p>
        </div>

        {/* Invoice Body */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Product Invoice Details */}
          <div className="w-[60%] !h-fit border p-4 rounded-lg">
            <h3 className="text-xl uppercase font-semibold text-primary_2 mb-2">
              Invoice Details
            </h3>
            <div>
              <table className="min-w-full shadow-xl rounded-lg overflow-hidden">
                <thead className="border-b">
                  <tr className="bg-gray-800 text-white">
                    <th className="py-3 px-4 text-left">S/N</th>
                    <th className="py-3 px-4 text-left">Item ID</th>
                    <th className="py-3 px-4 text-left w-[90%]">Item Name</th>
                    <th className="py-3 px-4 text-left">Quantity</th>
                    <th className="py-3 px-4 text-left">Item Price</th>
                    <th className="py-3 px-4 text-left">Discount</th>
                    <th className="py-3 px-4 text-left">Final Price</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-100 hover:text-secondary_2 transition duration-150"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{item.id}</td>
                      <td className="py-3 px-4">{item.name}</td>
                      <td className="py-3 px-4">1</td>
                      <td className="py-3 px-4">$788</td>
                      <td className="py-3 px-4">$20</td>
                      <td className="py-3 px-4">$768</td>
                    </tr>
                  ))}
                  {/* Totals row */}
                  <tr className="font-semibold">
                    <td colSpan="5" className="py-3 px-4 text-right">
                      Total Discount
                    </td>
                    <td className="py-3 px-4" colSpan="2">
                      ${savedAmount.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="font-semibold">
                    <td colSpan="5" className="py-3 px-4 text-right">
                      Total Price
                    </td>
                    <td className="py-3 px-4" colSpan="2">
                      ${finalPrice.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Payment Method Section */}
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold text-primary_2 mb-2">
              Choose Payment Method
            </h3>
            {step === "selection" && (
              <div ref={paymentOptionsRef} className="space-y-3">
                {paymentOptions.map((option) => (
                  <label
                    key={option.name}
                    className="flex items-center border rounded-md px-4 py-3 cursor-pointer hover:shadow-lg transition-shadow"
                    onMouseEnter={handleHoverEnter}
                    onMouseLeave={handleHoverLeave}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.name}
                      checked={selectedPayment === option.name}
                      onChange={handlePaymentMethodChange}
                      className="mr-3"
                    />
                    <img
                      src={option.icon}
                      alt={option.name}
                      className="w-6 h-6 mr-2"
                    />
                    <span className="font-medium text-primary_2">
                      {option.name}
                    </span>
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
              {selectedPayment === "Googlepay" && (
                <input
                  type="text"
                  placeholder="GooglePay UPI ID"
                  className="w-full border rounded-md p-2"
                />
              )}
              {selectedPayment === "PhonePe" && (
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
                className="mt-4 px-6 py-3 text-white rounded-md font-semibold uppercase tracking-wider shadow-md transition-transform bg-secondary_light_os"
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
                  className="px-6 py-3 text-white rounded-md font-semibold uppercase tracking-wider shadow-md transition-transform bg-secondary_light_os"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmAndPay}
                  onMouseEnter={handleHoverEnter}
                  onMouseLeave={handleHoverLeave}
                  className="px-6 py-3 text-white rounded-md font-semibold uppercase tracking-wider shadow-md transition-transform bg-secondary_light_os"
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
