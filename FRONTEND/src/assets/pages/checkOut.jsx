import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import AddressManager from "../components/addressManager";
import BillingSection from "../components/billingManager";
import OrderSummary from "../components/orderSummary";

const Checkout = () => {
  // State to track the current step: "address", "billing", or "orderSummary"
  const [step, setStep] = useState("address");
  // State to manage the selected address
  const [selectedAddress, setSelectedAddress] = useState(null);
  const progressBarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let width = "33%";
    if (step === "address") {
      width = "33%";
    } else if (step === "billing") {
      width = "66%";
    } else if (step === "orderSummary") {
      width = "100%";
    }
    gsap.to(progressBarRef.current, { width, duration: 0.5 });
  }, [step]);

  return (
    <section className="px-32 py-16">
      {/* Horizontal Progress Bar */}
      <div className="py-4">
        <div className="w-full bg-gray-200 h-2 rounded">
          <div
            ref={progressBarRef}
            className="bg-secondary_2 h-2 rounded"
            style={{ width: "33%" }}
          ></div>
        </div>
      </div>

      {step === "address" && (
        <section>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => navigate("/top-deals", { replace: true })}
              className="bg-secondary_2 text-white px-4 py-2 rounded"
            >
              Back
            </button>
          </div>
          <AddressManager
            selectedAddress={selectedAddress}
            onSelectAddress={setSelectedAddress}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setStep("billing")}
              className="bg-secondary_2 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </section>
      )}

      {step === "billing" && (
        <section>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setStep("address")}
              className="bg-secondary_2 text-white px-4 py-2 rounded"
            >
              Back
            </button>
          </div>
          <BillingSection onNext={() => setStep("orderSummary")} />
        </section>
      )}

      {step === "orderSummary" && (
        <section>
          <OrderSummary onNext={() => alert("Final Payment Initiated")} />
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setStep("billing")}
              className="bg-secondary_2 text-white px-4 py-2 rounded"
            >
              Back
            </button>
          </div>
        </section>
      )}
    </section>
  );
};

export default Checkout;
