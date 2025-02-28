import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import AddressManager from "../components/addressManager";
import BillingSection from "../components/billingManager";
import OrderSummary from "../components/orderSummary";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSearchParams } from "react-router-dom";

const Checkout = () => {
  const [step, setStep] = useState("address");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [error, setError] = useState("");
  const progressBarRef = useRef(null);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const id = searchParams.get("product_id");
  const product_image = searchParams.get("product_image");
  const product_name = searchParams.get("product_name");
  const product_rating = searchParams.get("product_rating");
  const product_price = searchParams.get("product_price");
  const product_size = searchParams.get("product_size");
  

  useEffect(() => {
    let width = "33%";
    if (step === "address") {
      width = "33%";
    } else if (step === "orderSummary") {
      width = "66%";
    } else if (step === "billing") {
      width = "100%";
    }
    try {
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, { width, duration: 0.5 });
      }
    } catch (error) {
      console.error("GSAP animation error:", error);
    }
  }, [step]);

  return (
    <section className="px-32 py-[8rem] -mt-16 bg-secondary_2 text-primary_2">
      {/* Horizontal Progress Bar */}
      <div className="py-4">
        <div className="w-full bg-primary_2 h-2 rounded">
          <div
            ref={progressBarRef}
            className="bg-banner_2 h-2 rounded"
            style={{ width: "33%" }}
          ></div>
        </div>
      </div>

      {step === "address" && (
        <section>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => {
                try {
                  navigate(`/view/${encodeURIComponent(id)}`, {
                    replace: true,
                  });
                } catch (error) {
                  console.error("Navigation error:", error);
                }
              }}
              className="text-primary_2 px-8 py-2 rounded"
            >
              <ArrowBackIcon style={{ fontSize: "1.5rem" }} />
            </button>
          </div>
          <AddressManager
            selectedAddress={selectedAddress}
            onSelectAddress={(addr) => {
              setSelectedAddress(addr);
              setError("");
            }}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                if (!selectedAddress) {
                  setError("Please select an address before proceeding.");
                } else {
                  setError("");
                  setStep("orderSummary");
                }
              }}
              className="bg-primary_2 text-secondary_2 px-4 py-2 rounded font-semibold text-lg"
            >
              Next
            </button>
          </div>
        </section>
      )}

      {step === "orderSummary" && (
        <section>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setStep("address")}
              className="text-primary_2 px-8 py-2 rounded"
            >
              <ArrowBackIcon style={{ fontSize: "1.5rem" }} />
            </button>
          </div>
          <OrderSummary
            onNext={() => {
              try {
                alert("Final Payment Initiated");
              } catch (error) {
                console.error("Payment initiation error:", error);
              }
            }}
            selectedAddress={selectedAddress}
            setStep={setStep}
            product_image={product_image}
            product_name={product_name}
            product_price={product_price}
            product_rating={product_rating}
            product_size={product_size}
          />
        </section>
      )}

      {step === "billing" && (
        <section>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setStep("orderSummary")}
              className="text-primary_2 px-8 py-2 rounded"
            >
              <ArrowBackIcon style={{ fontSize: "1.5rem" }} />
            </button>
          </div>
          <BillingSection
            onNext={() => setStep("orderSummary")}
            product_image={product_image}
            product_name={product_name}
            product_price={product_price}
            product_rating={product_rating}
          />
        </section>
      )}
    </section>
  );
};

export default Checkout;
