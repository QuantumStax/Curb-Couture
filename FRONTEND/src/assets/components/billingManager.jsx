/* eslint-disable react/prop-types */
import { useState } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const BillingSection = ({ onPaymentMethodChange, onNext }) => {
  // Manually defined product and pricing details
  const product = {
    id: 1,
    image: "/images/categories/new_york_green_font_tshirt.webp",
    name: "Sample Product",
    price: 1000,
    color: "Red",
    size: "M",
  };

  // Hardcoded coupon and discount details
  const coupon = "SAVE50";
  const discount = 50; // ₹50 discount
  const finalPrice = product.price - discount;
  const savedAmount = discount;

  // Payment options and selected payment method state
  const paymentOptions = ["Card", "UPI - Googlepay", "UPI - PhonePe"];
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0]);

  const handlePaymentMethodChange = (e) => {
    setSelectedPayment(e.target.value);
    if (onPaymentMethodChange) {
      onPaymentMethodChange(e.target.value);
    }
  };

  return (
    <div className="py-5">
      <h2 className="flex items-center gap-2 justify-center text-2xl font-bold mb-10 uppercase">
        <p>Billing</p>
        <div>
          <LocalShippingIcon />
        </div>
      </h2>
      <div className="border p-6 rounded">
        {/* Product details */}
        <div className="flex items-center space-x-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-24 h-24 object-cover"
          />
          <div>
            <p className="font-semibold text-lg">{product.name}</p>
            <p>
              Color: {product.color} | Size: {product.size}
            </p>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="mt-6">
          <p>
            Actual Price:{" "}
            <span className="font-semibold">₹{product.price}</span>
          </p>
          <p>
            Coupon Applied: <span className="font-semibold">{coupon}</span>
          </p>
          <p>
            Discount: <span className="font-semibold">₹{discount}</span>
          </p>
          <p className="text-xl font-bold">Checkout Price: ₹{finalPrice}</p>
          <p className="text-green-500">You saved ₹{savedAmount}</p>
        </div>

        {/* Payment options */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Choose Payment Method</h3>
          <div className="space-y-2">
            {paymentOptions.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={option}
                  name="paymentMethod"
                  value={option}
                  checked={selectedPayment === option}
                  onChange={handlePaymentMethodChange}
                  className="mr-2"
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
          {/* Note: Payment button has been removed.
              The actual payment action (Pay with Razorpay) will be provided in the summary section. */}
          <p className="mt-6 text-sm text-gray-600">
            Payment method selected: {selectedPayment}. You can proceed to the
            order summary to complete your payment.
          </p>
        </div>
      </div>
      {/* Next Button to move to OrderSummary */}
      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          className="bg-secondary_2 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BillingSection;
