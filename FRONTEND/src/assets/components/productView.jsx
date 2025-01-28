import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Footer from "./footer";
import Nav from "./nav2";
import StraightenIcon from "@mui/icons-material/Straighten";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ProductView = () => {
  const [showOffers, setShowOffers] = useState(false);
  const offersRef = useRef(null);
  const scales = ["s", "m", "l", "xl", "xxl", "xxxl"];
  const offers = [
    {
      coupon: "free15first",
      desc: "15% off on your first order!",
    },
    {
      coupon: "SAVE20",
      desc: "Get ₹200 off on orders above ₹1000!",
    },
    {
      coupon: "FREESHIP",
      desc: "Free shipping on your first order!",
    },
  ];

  useEffect(() => {
    if (showOffers) {
      gsap.to(offersRef.current, {
        height: "auto",
        duration: 0.3,
        ease: "power2.out",
        opacity: 1,
      });
    } else {
      gsap.to(offersRef.current, {
        height: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [showOffers]);

  return (
    <section>
      <section>
        <Nav />
      </section>
      <section className="px-20 py-16 bg-primary">
        <div className="flex items-center gap-2 opacity-70">
          <p className="hover:underline cursor-pointer">Home</p>
          <p className="cursor-default">/</p>
          <p className="hover:underline cursor-pointer">Recently viewed</p>
        </div>
        <div className="flex items-start gap-10">
          <div className="mt-10">
            <img
              src="/images/collection/oversized/medusa-oversized-t-shirt-753500.webp"
              alt="product-image"
              className="h-[40rem]"
            />
          </div>
          <div className="relative top-9 w-[40rem]">
            <h1 className="text-3xl font-bold opacity-75">
              Medusa Oversized T-shirt
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div>⭐⭐⭐⭐⭐</div>
              <p>15 Reviews</p>
              <p className="font-semibold text-green-600 ml-2">Best Seller🔥</p>
            </div>
            <p className="mt-2 opacity-70">
              The Medusa Oversized T-shirt is a blend of comfort and culture.
              Featuring a lightweight cotton design and detailed craftsmanship,
              it’s ideal for expressing your unique ethnic flair.
            </p>
            <div className="my-2">
              <p className="text-red-700">Hurry! Only 5 Left</p>
            </div>
            <div className="flex items-center gap-3 mt-2 font-semibold">
              <h1 className="text-3xl text-green-600">₹999</h1>
              <p className="line-through text-2xl opacity-50">₹1290</p>
            </div>
            <div className="flex gap-4 mt-4">
              {scales.map((scale, i) => (
                <div
                  key={i}
                  className="border py-2 px-4 border-slate-950 cursor-pointer"
                >
                  <p className="uppercase">{scale}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <StraightenIcon />
              <p>
                Please select according to the{" "}
                <a href="%" className="font-semibold hover:underline">
                  Size Chart
                </a>
              </p>
            </div>
            <div className="flex items-center gap-5 mt-4">
              <button className="flex flex-col items-center justify-center pb-2 rounded-full h-10 w-10 text-3xl border border-slate-950">
                -
              </button>
              <div className="flex flex-col items-center justify-center h-10 w-16 border border-slate-800 rounded-md text-lg">
                <p>1</p>
              </div>
              <button className="flex flex-col items-center justify-center pb-2 rounded-full h-10 w-10 text-3xl border border-slate-950">
                +
              </button>
              <div className="flex flex-col items-center justify-center pb-1 ml-5 h-12 w-[9rem] text-xl rounded-md bg-black text-primary hover:scale-[1.02] hover:shadow-lg cursor-pointer">
                <button>Buy Now</button>
              </div>
            </div>
            <button className="flex flex-col items-center justify-center pb-1 mt-4 h-12 w-[23rem] text-xl rounded-md border border-slate-950 hover:scale-[1.02] hover:shadow-lg cursor-pointer">
              Add to Cart
            </button>
            <div className="mt-5">
              <div
                onClick={() => setShowOffers(!showOffers)}
                className="flex items-center gap-[10rem] border-t border-b border-slate-950 py-2 w-fit cursor-pointer"
              >
                <h1 className="text-lg font-semibold uppercase">
                  Offers just for you
                </h1>
                <KeyboardArrowDownIcon />
              </div>
              <div
                ref={offersRef}
                className={`${
                  showOffers ? "border-b w-[23.1rem] border-slate-950" : ""
                } overflow-hidden h-0 opacity-0 py-3`}
              >
                {offers.map((offer, i) => (
                  <div key={i} className="my-3">
                    <h1 className="uppercase text-2xl font-bold">
                      {offer.coupon}
                    </h1>
                    <p className="text-lg opacity-70 font-semibold">
                      {offer.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </section>
  );
};

export default ProductView;
