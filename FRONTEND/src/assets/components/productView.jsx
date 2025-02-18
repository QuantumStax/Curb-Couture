/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Footer from "./footer";
import Loader from "./loader";
import ReviewModal from "./reviewModal";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UndoIcon from "@mui/icons-material/Undo";

const usePrefersReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reducedMotion;
};

const ProductView = () => {
  const { id } = useParams();

  // State
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showOffers, setShowOffers] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [sortOption, setSortOption] = useState("Newest");
  const [helpfulCounts, setHelpfulCounts] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);

  // Main product image
  const [mainImage, setMainImage] = useState("");

  // GSAP refs
  const containerRef = useRef(null); // entire hero container
  const circleRef = useRef(null); // circle behind product
  const imageRef = useRef(null); // product image
  const textRef = useRef(null); // text block
  const offersRef = useRef(null); // offers expand/collapse

  const prefersReducedMotion = usePrefersReducedMotion();

  // Increase / Decrease quantity
  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/get-product/${id}`);
        const data = await res.json();
        setProduct(data);
        setMainImage(
          data?.images?.length > 0 ? data.images[0] : "/images/placeholder.jpg"
        );
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/review/${id}`);
        const reviewsData = result.data.reviews;
        setReviews(reviewsData);
      } catch (error) {
        setReviews([]);
      }
    };
    fetchReview();
  }, [id]);

  // Recommended products (placeholder)
  useEffect(() => {
    setRelatedProducts([
      {
        id: "rel1",
        name: "Recommended Product 1",
        image: "/images/categories/oversized_hoodie_type_greatly_sweater.webp",
        price: 499,
      },
      {
        id: "rel2",
        name: "Recommended Product 2",
        image: "/images/categories/oversized_batik_anime_tshirt.webp",
        price: 1299,
      },
    ]);
  }, [id]);

  // Animate the hero layout
  useEffect(() => {
    if (!loading && containerRef.current && !prefersReducedMotion) {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Fade in the entire container
      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 }
      );
      // Scale/fade in the circle
      tl.fromTo(
        circleRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.15, duration: 0.6 },
        "-=0.3"
      );
      // Slide product image from the left
      tl.fromTo(
        imageRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        "-=0.3"
      );
      // Slide text from the right
      tl.fromTo(
        textRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        "-=0.5"
      );
    }
  }, [loading, prefersReducedMotion]);

  // Animate offers expand/collapse
  useEffect(() => {
    if (!prefersReducedMotion) {
      if (showOffers) {
        gsap.to(offersRef.current, {
          height: "auto",
          duration: 0.3,
          opacity: 1,
        });
      } else {
        gsap.to(offersRef.current, {
          height: 0,
          duration: 0.3,
          opacity: 0,
        });
      }
    }
  }, [showOffers, prefersReducedMotion]);

  // Sort reviews
  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];
    if (sortOption === "Newest") {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortOption === "Highest") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "Lowest") {
      sorted.sort((a, b) => a.rating - b.rating);
    }
    return sorted;
  }, [reviews, sortOption]);

  // Mark review as helpful
  const handleHelpful = (idx) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [idx]: (prev[idx] || 0) + 1,
    }));
  };

  // Toast for "Add to Cart"
  const handleAddToCart = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    // Real logic: add product to cart
  };

  // Offers data
  const offers = [
    { coupon: "free15first", desc: "15% off on your first order!" },
    { coupon: "SAVE20", desc: "Get ₹200 off on orders above ₹1000!" },
    { coupon: "FREESHIP", desc: "Free shipping on your first order!" },
  ];

  return (
    <section className="min-h-screen bg-[#2f2f2f] text-white relative">
      {loading && (
        <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2">
          <Loader />
        </div>
      )}

      {showToast && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fadeIn">
          Added to Cart!
        </div>
      )}

      {!loading && product && (
        <>
          {/* HERO SECTION */}
          <div
            ref={containerRef}
            className="opacity-0 w-full h-[70vh] lg:h-[100vh] relative overflow-hidden flex items-center justify-center px-8"
          >
            {/* BACKGROUND CIRCLE */}
            <div
              ref={circleRef}
              className="absolute w-[80rem] h-[70rem] bg-black rounded-full left-[-25rem] top-[-20rem] opacity-20"
            />

            {/* LEFT - PRODUCT IMAGE */}
            <div className="flex-1 flex max-w-[30%]">
              <img
                ref={imageRef}
                src={mainImage}
                alt={product?.name || "Product Image"}
                className=" max-h-[30rem] object-cover shadow-lg transition-transform duration-300 hover:scale-[1.01] rounded-lg"
              />
            </div>

            {/* RIGHT - TEXT CONTENT */}
            <div
              ref={textRef}
              className="flex-1 max-w-[28rem] flex flex-col items-start justify-center ml-[20%]"
            >
              <p className="text-sm uppercase text-primary_2 opacity-50 tracking-wide mb-1">
                {product?.type || ""}
              </p>

              <h1 className="text-[3rem] font-bold text-primary_2 leading-tight">
                {product?.name || "Gunmetal Black"}
              </h1>

              {/* Price + Rating */}
              <div className="flex items-center gap-5 mt-3">
                <h2 className="text-2xl text-green-600 font-semibold">
                  ₹{product?.price || ""}
                </h2>
                {/* Star Rating (or numeric) */}
                <div className="flex items-center gap-1">
                  <p className="text-[#cfcfcf] font-bold">
                    {product?.rating || 5}⭐
                  </p>
                  <p className="text-[#7f7f7f]">(from 15 Reviews)</p>
                </div>
              </div>

              {/* Short description */}
              <p className="text-[#b5b5b5] mt-4 text-sm leading-relaxed">
                {product?.description ||
                  "Lorem ipsum is simply dummy text of the printing and typesetting industry."}
              </p>

              {/* Sizes */}
              <div className="flex items-center gap-6 mt-6">
                {product?.sizes?.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm uppercase text-primary_2 opacity-50 tracking-wide mb-1">
                      Size:
                    </p>
                    <div className="flex  gap-4">
                      {product.sizes.map((size, i) => (
                        <button
                          key={i}
                          className="border border-primary_2 px-3 py-1 text-sm text-primary_2 rounded hover:bg-[#e8e8e8] hover:text-black transition-colors uppercase"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="flex flex-col gap-2 ml-[4rem]">
                  <p className="text-sm uppercase text-primary_2 opacity-50 tracking-wide mb-1">
                    Quantity:
                  </p>
                  <div className="flex items-center gap-5">
                    <button
                      onClick={decreaseQuantity}
                      className="w-8 h-8 pb-1 flex items-center justify-center border rounded-full text-xl text-primary_2 hover:bg-primary_2 hover:text-black transition-colors"
                    >
                      -
                    </button>
                    <div className="w-10 h-8 flex items-center justify-center border border-primary_2 rounded text-primary_2">
                      {quantity}
                    </div>
                    <button
                      onClick={increaseQuantity}
                      className="w-8 h-8 pb-1 flex items-center justify-center border rounded-full text-xl text-primary_2 hover:bg-primary_2 hover:text-black transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart + Buy Now */}
              <div className="flex items-center gap-4 mt-6">
                <Link
                  to={`/checkout?product_image=${encodeURIComponent(
                    product?.images?.[0] || "/images/placeholder.jpg"
                  )}&product_name=${encodeURIComponent(
                    product?.name
                  )}&product_rating=${encodeURIComponent(
                    product?.rating
                  )}&product_price=${encodeURIComponent(product.price)}`}
                >
                  <button className="bg-banner_2 px-6 py-3 w-[13rem] text-lg text-secondary_2 rounded hover:bg-[#616161] hover:text-primary_2 transition-colors">
                    Buy Now
                  </button>
                </Link>
                <button
                  onClick={handleAddToCart}
                  className="bg-transparent border  px-6 py-3 w-[13rem] text-lg text-primary_2 rounded hover:bg-[#616161] hover:text-primary_2 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* OFFERS / Delivery / Return Info */}
          <section className="px-10 py-8 text-sm">
            {/* Toggle Offers */}
            <div
              onClick={() => setShowOffers(!showOffers)}
              className="flex items-center gap-4 w-fit cursor-pointer border-t border-b border-[#5f5f5f] py-2"
            >
              <h1 className="text-lg font-semibold uppercase text-[#cfcfcf]">
                Offers just for you
              </h1>
              <KeyboardArrowDownIcon />
            </div>
            <div
              ref={offersRef}
              className="overflow-hidden h-0 opacity-0 py-3 text-[#b5b5b5]"
            >
              {offers.map((offer, i) => (
                <div key={i} className="my-2">
                  <h1 className="uppercase text-md font-bold text-[#ffffff]">
                    {offer.coupon}
                  </h1>
                  <p className="text-sm">{offer.desc}</p>
                </div>
              ))}
            </div>

            {/* Delivery / Return */}
            <div className="mt-5 text-[#b5b5b5]">
              <div className="flex items-center gap-2">
                <AccessTimeIcon fontSize="small" />
                <p>Estimate delivery time: 3 - 5 business days</p>
              </div>
              <p className="mt-2">
                <span className="font-bold text-white">Note:</span> The orders
                are delivered through DTDC; delivery time may vary!
              </p>
              <div className="flex items-center gap-2 mt-3">
                <UndoIcon fontSize="small" />
                <p>
                  Return within 10 days of purchase. Duties &amp; taxes are
                  non-refundable!
                </p>
              </div>
            </div>
          </section>

          {/* Additional Product Info */}
          <section className="px-10 pb-8">
            <div className="bg-[#3f3f3f] rounded p-6 text-[#e0e0e0]">
              <h2 className="text-xl font-semibold mb-3 text-white">
                Product Info
              </h2>
              <p className="mb-2">{product?.desc_1}</p>
              <ul className="mb-3 space-y-1 text-sm">
                <li>
                  <span className="font-semibold text-white">Name:</span>{" "}
                  {product?.name}
                </li>
                <li>
                  <span className="font-semibold text-white">Fabric:</span>{" "}
                  {product?.material}
                </li>
                <li>
                  <span className="font-semibold text-white">Occation:</span>{" "}
                  {product?.occation}
                </li>
                <li>
                  <span className="font-semibold text-white">Pattern:</span>{" "}
                  {product?.type}
                </li>
                <li>
                  <span className="font-semibold text-white">Sleeve:</span>{" "}
                  {product?.sleeve_length}
                </li>
              </ul>
              <p>{product?.description}</p>
            </div>
          </section>

          {/* Reviews */}
          <section className="px-10 pb-8">
            <div className="bg-[#3f3f3f] rounded p-6 text-[#e0e0e0]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  Product Reviews
                </h2>
                <button
                  onClick={() => setIsReviewOpen(true)}
                  className="border border-[#afafaf] text-[#afafaf] px-4 py-2 rounded hover:bg-[#afafaf] hover:text-black transition-colors"
                >
                  Write a Review
                </button>
              </div>
              {isReviewOpen && (
                <ReviewModal setIsReviewOpen={setIsReviewOpen} id={id} />
              )}

              <hr className="my-3 border-[#5f5f5f]" />

              {/* Sorting */}
              <div className="flex items-center gap-4 mt-3">
                <label htmlFor="sortReviews" className="font-medium text-white">
                  Sort By:
                </label>
                <select
                  id="sortReviews"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-[#afafaf] bg-[#2f2f2f] text-white rounded-md p-1"
                >
                  <option value="Newest">Newest</option>
                  <option value="Highest">Highest Rating</option>
                  <option value="Lowest">Lowest Rating</option>
                </select>
              </div>

              <div className="mt-5 space-y-6">
                {sortedReviews.map((review, i) => (
                  <div key={i}>
                    <p className="text-lg font-bold text-[#b0ffb0]">
                      {review.rating}⭐
                      {review.rating >= 5 && (
                        <span className="ml-2 text-sm text-white">
                          Top Rated
                        </span>
                      )}
                    </p>
                    <div className="flex gap-2 justify-between mt-1">
                      <h3 className="font-semibold text-md text-white">
                        {review.title}
                      </h3>
                      <p className="text-[#cfcfcf] text-sm">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm mt-1">{review.review}</p>
                    <div className="mt-2">
                      <button
                        onClick={() => handleHelpful(i)}
                        className="text-blue-400 hover:underline text-sm"
                      >
                        Helpful ({helpfulCounts[i] || 0})
                      </button>
                    </div>
                    <hr className="mt-3 border-[#5f5f5f]" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recommended Products */}
          {relatedProducts.length > 0 && (
            <section className="px-10 pb-8">
              <div className="bg-[#3f3f3f] rounded p-6 text-[#e0e0e0]">
                <h2 className="text-xl font-semibold text-white mb-3">
                  You May Also Like
                </h2>
                <hr className="my-3 border-[#5f5f5f]" />
                <div className="flex gap-6">
                  {relatedProducts.map((relProd) => (
                    <div
                      key={relProd.id}
                      className="w-[12rem] cursor-pointer hover:scale-[1.02] transition-transform"
                    >
                      <img
                        src={relProd.image}
                        alt={relProd.name}
                        loading="lazy"
                        className="w-[12rem] h-[12rem] object-cover rounded-md"
                      />
                      <h3 className="text-lg font-semibold mt-2 text-white">
                        {relProd.name}
                      </h3>
                      <p className="text-green-400 font-semibold">
                        ₹{relProd.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Footer */}
      <section>
        <Footer />
      </section>
    </section>
  );
};

export default ProductView;
