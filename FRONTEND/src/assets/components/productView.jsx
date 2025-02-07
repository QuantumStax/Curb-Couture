import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Footer from "./footer";
import StraightenIcon from "@mui/icons-material/Straighten";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UndoIcon from "@mui/icons-material/Undo";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useParams } from "react-router-dom";
import Loader from "./loader";

const ProductView = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  console.log(product);

  const [loading, setLoading] = useState(true);
  const [showOffers, setShowOffers] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/get-product/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const offersRef = useRef(null);
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
  const reviews = [
    {
      rating: "⭐⭐⭐⭐⭐",
      name: "Gopikrishnan S",
      varified: true,
      district: "Alappuzha",
      country: "IN",
      head: "Great Product",
      desc: "superb quality at this price point!",
      date: "01/03/2024",
      img: "/images/collection/oversized/medusa-oversized-t-shirt-753500.webp",
    },
    {
      rating: "⭐⭐⭐⭐⭐",
      name: "Gopikrishnan S",
      varified: true,
      district: "Alappuzha",
      country: "IN",
      head: "Great Product",
      desc: "superb quality at this price point!",
      date: "01/03/2024",
      img: "/images/collection/oversized/medusa-oversized-t-shirt-753500.webp",
    },
    {
      rating: "⭐⭐⭐⭐⭐",
      name: "Gopikrishnan S",
      varified: true,
      district: "Alappuzha",
      country: "IN",
      head: "Great Product",
      desc: "superb quality at this price point!",
      date: "01/03/2024",
      img: "/images/collection/oversized/medusa-oversized-t-shirt-753500.webp",
    },
    {
      rating: "⭐⭐⭐⭐⭐",
      name: "Gopikrishnan S",
      varified: true,
      district: "Alappuzha",
      country: "IN",
      head: "Great Product",
      desc: "superb quality at this price point!",
      date: "01/03/2024",
      img: "/images/collection/oversized/medusa-oversized-t-shirt-753500.webp",
    },
    {
      rating: "⭐⭐⭐⭐⭐",
      name: "Gopikrishnan S",
      varified: true,
      district: "Alappuzha",
      country: "IN",
      head: "Great Product",
      desc: "superb quality at this price point!",
      date: "01/03/2024",
      img: "/images/collection/oversized/medusa-oversized-t-shirt-753500.webp",
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
      {!loading ? (
        <section className="px-20 py-16 bg-primary">
          <div className="flex items-center gap-2 opacity-70">
            <p className="hover:underline cursor-pointer">Home</p>
            <p className="cursor-default">/</p>
            <p className="hover:underline cursor-pointer">Recently viewed</p>
          </div>
          <div className="flex items-start gap-10">
            <div className="mt-10">
              <img
                src={
                  product?.images?.length > 0
                    ? product.images[0]
                    : "/images/placeholder.jpg"
                }
                alt={product?.name || "Product Image"}
                className="h-[40rem]"
              />
            </div>
            <div className="relative top-9 w-[40rem]">
              <h1 className="text-3xl font-bold opacity-75">{product?.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div>
                  <p className="text-xl font-bold text-green-600">
                    {product?.rating}⭐
                  </p>
                </div>
                <p> from 15 Reviews</p>
              </div>
              <p className="mt-2 opacity-70">{product?.description}</p>
              <div className="my-2">
                <p className="text-red-700">Hurry! Only 5 Left</p>
              </div>
              <div className="flex items-center gap-3 mt-2 font-semibold">
                <h1 className="text-3xl text-green-600">₹{product?.price}</h1>
                {/* <p className="line-through text-2xl opacity-50">₹1290</p> */}
              </div>
              <div className="flex gap-4 mt-4">
                {product?.sizes.map((size, i) => (
                  <div
                    key={i}
                    className="border py-2 px-4 border-slate-950 cursor-pointer hover:bg-secondary_2 hover:text-primary_2 transition-all duration-300"
                  >
                    <p className="uppercase font-semibold">{size}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <StraightenIcon />
                <p>
                  Please select according to the <span></span>
                  <a href="%" className="font-semibold hover:underline">
                    Size Chart
                  </a>
                </p>
              </div>
              <div className="flex items-center gap-5 mt-4">
                <button
                  className="flex flex-col items-center justify-center pb-2 rounded-full h-10 w-10 text-3xl border border-slate-950"
                  onClick={() => decreaseQuantity()}
                >
                  -
                </button>
                <div className="flex flex-col items-center justify-center h-10 w-16 border border-slate-800 rounded-md text-lg">
                  <p>{quantity}</p>
                </div>
                <button
                  className="flex flex-col items-center justify-center pb-2 rounded-full h-10 w-10 text-3xl border border-slate-950"
                  onClick={() => increaseQuantity()}
                >
                  +
                </button>
                <div className="flex flex-col items-center justify-center pb-1 ml-5 h-12 w-[9rem] text-xl rounded-md bg-secondary_2 text-primary_2 hover:scale-[1.02] hover:shadow-lg cursor-pointer">
                  <button>Buy Now</button>
                </div>
              </div>
              <button className="flex flex-col items-center justify-center pb-1 mt-4 h-12 w-[23rem] text-xl rounded-md border-[2px] border-secondary_2 hover:scale-[1.02] hover:shadow-lg cursor-pointer">
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
                {/* general info */}
                <div className="text-lg">
                  <div className="flex items-center gap-2">
                    <AccessTimeIcon />
                    <p>Estimate delivery time: 3 - 5 business day</p>
                  </div>
                  <p>
                    <span className="font-bold">Note : </span>The orders are
                    delivered through DTDC and the delivery time may vary!
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <UndoIcon />
                    <p>
                      Return within 10 days of purchase. Duties & taxes are
                      non-refundable!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Product Description */}
          <div className="pt-[7rem] w-[75rem]">
            <h1 className="text-2xl uppercase font-semibold">Product Info</h1>
            <hr className="w-[11rem] mt-1 h-[0.1rem] bg-black opacity-70" />
            <div className="text-lg mt-4">
              <p>
                The garments labelled as committed are products that have been
                produced using sustainable fibres or processes, reducing their
                environmental impact. Umino’s goal is to support the
                implementation of practices more committed to the environment.
              </p>
              <div className="mt-2">
                <li>Name: Medusa Oversized T-Shirt</li>
                <li>Fabric: Pure Cotton</li>
                <li>Occation: Casual</li>
                <li>Pattern: Screen Printed</li>
                <li>Sleeve Length: Short Sleeve</li>
              </div>
              <p className="mt-2">
                Made of cotton, you will love the high-quality fit and feel of
                this Medusa Oversized tee. A fashionable weekend outfit starts
                with this white top matched with chinos and your favourite pair
                of sunglasses to cast an effortlessly cool image.
              </p>
            </div>
          </div>
          {/* Product Review and Rating */}
          <div className="mt-10">
            <h1 className="text-2xl uppercase font-semibold">Product Review</h1>
            <hr className="w-[13rem] mt-1 h-[0.1rem] bg-black opacity-70" />
            <div className="flex items-center gap-2 mt-4">
              <h1 className="text-4xl text-green-600">4.4</h1>
              <p className="text-xl">⭐</p>
              <p>from 15 Reviews</p>
            </div>
            <div className="mt-5">
              {reviews.map((review, i) => (
                <div key={i} className="mb-10">
                  <p>{review.rating}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <h1>{review.name}</h1>
                    {review.varified ? (
                      <VerifiedIcon style={{ color: "blue" }} />
                    ) : (
                      ""
                    )}
                    <div className="relative left-[65rem] opacity-50">
                      <p>{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-50">
                    <p>{review.district},</p>
                    <p>{review.country}</p>
                  </div>
                  <h1 className="font-bold my-2 text-xl">{review.head}</h1>
                  <p className="mb-2">{review.desc}</p>
                  <div>
                    <img
                      src={review.img}
                      alt="img"
                      className="h-[10rem] rounded-lg"
                    />
                  </div>
                  <hr className="h-[0.1rem] bg-black opacity-30 mt-2" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="absolute left-[50%] top-[25%]">
          <Loader />
        </div>
      )}
      <section className={`${loading ? "relative top-[13.3rem]" : ""}`}>
        <Footer />
      </section>
    </section>
  );
};

export default ProductView;
