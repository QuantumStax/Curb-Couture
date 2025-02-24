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
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [sortOption, setSortOption] = useState("Newest");
  const [helpfulCounts, setHelpfulCounts] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [currentSection, setCurrentSection] = useState("product-info");
  console.log(currentSection);

  // Main product image
  const [mainImage, setMainImage] = useState("");

  // GSAP refs
  const containerRef = useRef(null); // entire hero container
  const circleRef = useRef(null); // background circle
  const imageRef = useRef(null); // product image
  const textRef = useRef(null); // text block
  const sectionContentRef = useRef(null); // new ref for section content

  const prefersReducedMotion = usePrefersReducedMotion();

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
      // Scale/fade in the background circle
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

  // Animate section content when switching tabs using GSAP
  useEffect(() => {
    if (sectionContentRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        sectionContentRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5 }
      );
    }
  }, [currentSection, prefersReducedMotion]);

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
    // TODO - add to cart logic
  };

  return (
    <section className="bg-secondary_2 text-white -mt-16 py-20 relative">
      <div
        ref={circleRef}
        className="absolute w-[80rem] h-[70rem] bg-black rounded-full left-[-25rem] top-[-20rem] opacity-20"
      />

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
            className="opacity-0 w-full h-[70vh] lg:h-[90vh] relative overflow-hidden flex items-center justify-center px-8"
          >
            {/* LEFT - PRODUCT IMAGE */}
            <div className="flex-1 flex max-w-[30%]">
              <img
                ref={imageRef}
                src={mainImage}
                alt={product?.name || "Product Image"}
                className="max-h-[30rem] object-cover shadow-lg transition-transform duration-300 hover:scale-[1.01] rounded-lg"
              />
            </div>

            {/* RIGHT - TEXT CONTENT */}
            <div
              ref={textRef}
              className="flex-1 max-w-[28rem] flex flex-col ml-[20%]"
            >
              <p className="text-sm uppercase text-primary_2 opacity-50 tracking-wide mb-1">
                {product?.type || ""}
              </p>

              <h1 className="text-[3rem] font-bold text-primary_2 leading-tight mb-4">
                {product?.name || "Gunmetal Black"}
              </h1>

              {/* Price + Rating */}
              <div className="flex items-center gap-5 mt-3 mb-4">
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
              <p className="text-gray-300 mt-4 mb-4 text-sm leading-relaxed">
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
                    <div className="flex gap-4">
                      {product.sizes.map((size, i) => (
                        <button
                          key={i}
                          className="border border-primary_2 px-3 py-1 text-sm text-primary_2 rounded hover:bg-primary_2 hover:text-black transition-colors uppercase"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Add to Cart + Buy Now */}
              <div className="flex items-center gap-4 mt-6">
                <Link
                  replace
                  to={`/checkout?product_id=${encodeURIComponent(
                    id
                  )}&product_image=${encodeURIComponent(
                    product?.images?.[0] || "/images/placeholder.jpg"
                  )}&product_name=${encodeURIComponent(
                    product?.name
                  )}&product_rating=${encodeURIComponent(
                    product?.rating
                  )}&product_price=${encodeURIComponent(product.price)}`}
                >
                  <button className="bg-banner_2 px-6 py-3 w-[13rem] text-lg text-primary_2 rounded hover:scale-[1.05] hover:shadow-xl transition-all duration-300">
                    Buy Now
                  </button>
                </Link>
                <button
                  onClick={handleAddToCart}
                  className="bg-transparent border px-6 py-3 w-[13rem] text-lg text-primary_2 rounded hover:shadow-xl hover:scale-[1.05] transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>

              <div className="mt-5 text-primary_2">
                <div className="flex items-center gap-2">
                  <AccessTimeIcon fontSize="small" />
                  <p>Estimate delivery time: 3 - 5 business days</p>
                </div>
                <p className="mt-2">
                  <span className="font-bold text-white">Note:</span> The orders
                  are delivered through DTDC; delivery time may vary!
                </p>
              </div>
            </div>
          </div>

          <section className="mt-16">
            <div className="relative left-[5%] flex justify-between w-[90%] px-20 py-10">
              <button
                className="border-b py-2 px-4 uppercase text-lg font-semibold hover:bg-secondary_light transition-colors duration-300 rounded-t-lg"
                onClick={() => setCurrentSection("product-info")}
              >
                product Info
              </button>
              <button
                className="border-b py-2 px-4 uppercase text-lg font-semibold hover:bg-secondary_light transition-colors duration-300 rounded-t-lg"
                onClick={() => setCurrentSection("product-reviews")}
              >
                product review
              </button>
              <button
                className="border-b py-2 px-4 uppercase text-lg font-semibold hover:bg-secondary_light transition-colors duration-300 rounded-t-lg"
                onClick={() => setCurrentSection("related-products")}
              >
                Related Products
              </button>
            </div>
            <div ref={sectionContentRef}>
              {currentSection === "product-info" ? (
                <section className="px-10 pb-8">
                  {/* Additional Product Info with improved typography, spacing, and visual hierarchy */}
                  <div className="bg-secondary_light rounded p-6 text-gray-300 space-y-4 leading-relaxed">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Product Info
                    </h2>
                    <p className="mb-2">{product?.desc_1}</p>
                    <ul className="mb-3 space-y-2 text-sm">
                      <li>
                        <span className="font-semibold text-white">Name:</span>{" "}
                        {product?.name}
                      </li>
                      <li>
                        <span className="font-semibold text-white">
                          Fabric:
                        </span>{" "}
                        {product?.material}
                      </li>
                      <li>
                        <span className="font-semibold text-white">
                          Occation:
                        </span>{" "}
                        {product?.occation}
                      </li>
                      <li>
                        <span className="font-semibold text-white">
                          Pattern:
                        </span>{" "}
                        {product?.type}
                      </li>
                      <li>
                        <span className="font-semibold text-white">
                          Sleeve:
                        </span>{" "}
                        {product?.sleeve_length}
                      </li>
                    </ul>
                    <p className="mb-2">{product?.description}</p>
                  </div>
                </section>
              ) : currentSection === "product-reviews" ? (
                <section className="px-10 pb-8">
                  {/* Reviews with improved typography, spacing, and readability */}
                  <div className="bg-[#3f3f3f] rounded p-6 text-gray-300 space-y-4 leading-relaxed">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white mb-2">
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
                      <label
                        htmlFor="sortReviews"
                        className="font-medium text-white"
                      >
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
                            <h3 className="font-semibold text-white">
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
              ) : currentSection === "related-products" ? (
                <section className="px-10 pb-8">
                  {/* Recommended Products */}
                  {relatedProducts.length > 0 && (
                    <div className="bg-[#3f3f3f] rounded p-6 text-gray-300 space-y-4">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        You May Also Like
                      </h2>
                      <hr className="my-3 border-[#5f5f5f]" />
                      <div className="flex gap-6 flex-wrap">
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
                  )}
                </section>
              ) : (
                <div></div>
              )}
            </div>
          </section>
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
