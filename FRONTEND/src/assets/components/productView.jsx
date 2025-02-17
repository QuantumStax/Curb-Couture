/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import Footer from "./footer";
import StraightenIcon from "@mui/icons-material/Straighten";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UndoIcon from "@mui/icons-material/Undo";
import { Link, useParams } from "react-router-dom";
import Loader from "./loader";
import axios from "axios";
import ReviewModal from "./reviewModal";

const usePrefersReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  return reducedMotion;
};

const ProductView = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOffers, setShowOffers] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);

  const [sortOption, setSortOption] = useState("Newest");
  const [helpfulCounts, setHelpfulCounts] = useState({});

  const containerRef = useRef(null);
  const offersRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  const [mainImage, setMainImage] = useState("");

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
        setMainImage(
          data?.images?.length > 0 ? data.images[0] : "/images/placeholder.jpg"
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

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

  useEffect(() => {
    if (!loading && containerRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [loading, prefersReducedMotion]);

  useEffect(() => {
    if (!prefersReducedMotion) {
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
    }
  }, [showOffers, prefersReducedMotion]);

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

  const sortedReviews = useMemo(() => {
    let sorted = [...reviews];
    if (sortOption === "Newest") {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortOption === "Highest") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "Lowest") {
      sorted.sort((a, b) => a.rating - b.rating);
    }
    return sorted;
  }, [reviews, sortOption]);

  const handleHelpful = (reviewIndex) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [reviewIndex]: (prev[reviewIndex] || 0) + 1,
    }));
  };

  const [relatedProducts, setRelatedProducts] = useState([]);
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

  const [showToast, setShowToast] = useState(false);
  const handleAddToCart = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <section className="bg-primary min-h-screen">
      {!loading ? (
        <section className="px-20 py-16" ref={containerRef}>
          {showToast && (
            <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fadeIn">
              Added to Cart!
            </div>
          )}

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 opacity-70">
            <p className="hover:underline cursor-pointer">Home</p>
            <p className="cursor-default">/</p>
            <p className="hover:underline cursor-pointer">Recently viewed</p>
          </div>

          {/* Main Container */}
          <div className="flex items-start gap-10 mt-10 bg-white shadow-lg rounded-lg p-8">
            <div className="flex flex-col items-center">
              <img
                src={mainImage}
                alt={product?.name || "Product Image"}
                loading="lazy"
                className="h-[40rem] w-auto rounded-md shadow-md hover:scale-[1.01] transition-transform duration-300 object-cover"
              />
              <div className="flex gap-2 mt-3">
                {product?.images?.map((imgSrc, i) => (
                  <img
                    key={i}
                    src={imgSrc}
                    alt={`Thumbnail ${i}`}
                    loading="lazy"
                    onClick={() => setMainImage(imgSrc)}
                    className="h-16 w-16 object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-secondary_2 transition-colors"
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="relative top-2 w-[40rem]">
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

              <div className="flex items-center gap-3 mt-4 font-semibold">
                <h1 className="text-3xl text-green-600">₹{product?.price}</h1>
              </div>

              {/* Sizes */}
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
                <StraightenIcon
                  aria-label="Size Chart Icon"
                  titleAccess="Size Chart Icon"
                />
                <p>
                  Please select according to the{" "}
                  <a
                    href="#"
                    className="font-semibold hover:underline"
                    title="View the size chart"
                  >
                    Size Chart
                  </a>
                </p>
              </div>

              {/* Quantity and Buy Now */}
              <div className="flex items-center gap-5 mt-4">
                <button
                  className="flex flex-col items-center justify-center pb-2 rounded-full h-10 w-10 text-3xl border border-slate-950"
                  onClick={decreaseQuantity}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <div
                  className="flex flex-col items-center justify-center h-10 w-16 border border-slate-800 rounded-md text-lg"
                  aria-label="Selected quantity"
                >
                  <p>{quantity}</p>
                </div>
                <button
                  className="flex flex-col items-center justify-center pb-2 rounded-full h-10 w-10 text-3xl border border-slate-950"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <div className="flex flex-col items-center justify-center pb-1 ml-5 h-12 w-[9rem] text-xl rounded-md bg-secondary_2 text-primary_2 hover:scale-[1.02] hover:shadow-lg cursor-pointer">
                  {!loading && product && (
                    <Link
                      to={`/checkout?product_image=${encodeURIComponent(
                        product?.images?.[0] || "/images/placeholder.jpg"
                      )}&product_name=${encodeURIComponent(
                        product?.name
                      )}&product_rating=${encodeURIComponent(
                        product?.rating
                      )}&product_price=${encodeURIComponent(product.price)}`}
                      aria-label="Proceed to checkout"
                    >
                      <button>Buy Now</button>
                    </Link>
                  )}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex flex-col items-center justify-center pb-1 mt-4 h-12 w-[23rem] text-xl rounded-md border-[2px] border-secondary_2 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                aria-label="Add to Cart"
              >
                Add to Cart
              </button>

              {/* Offers */}
              <div className="mt-5">
                <div
                  onClick={() => setShowOffers(!showOffers)}
                  className="flex items-center gap-[10rem] border-t border-b border-slate-950 py-2 w-fit cursor-pointer"
                  aria-label="Toggle offers"
                >
                  <h1 className="text-lg font-semibold uppercase">
                    Offers just for you
                  </h1>
                  <KeyboardArrowDownIcon aria-label="Expand or collapse offers" />
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

                {/* Delivery / Return Info */}
                <div className="text-lg mt-4">
                  <div className="flex items-center gap-2">
                    <AccessTimeIcon
                      aria-label="Delivery time icon"
                      titleAccess="Delivery time icon"
                    />
                    <p>Estimate delivery time: 3 - 5 business day</p>
                  </div>
                  <p>
                    <span className="font-bold">Note : </span>The orders are
                    delivered through DTDC and the delivery time may vary!
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <UndoIcon
                      aria-label="Return policy icon"
                      titleAccess="Return policy icon"
                    />
                    <p>
                      Return within 10 days of purchase. Duties &amp; taxes are
                      non-refundable!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <details
            className="bg-white shadow-lg rounded-lg p-8 mt-10 w-[75rem]"
            open
          >
            <summary className="text-2xl uppercase font-semibold cursor-pointer list-none">
              Product Info
            </summary>
            <hr className="w-[11rem] mt-1 h-[0.1rem] bg-black opacity-70" />
            <div className="text-lg mt-4">
              <p>{product?.desc_1}</p>
              <div className="mt-2">
                <li className="flex gap-2">
                  <span className="font-semibold">Name : </span>
                  <p>{product?.name}</p>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">Fabric : </span>
                  <p>{product?.material}</p>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">Occation : </span>
                  <p>{product?.occation}</p>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">Pattern : </span>
                  <p>{product?.type}</p>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">Sleeve Length : </span>
                  <p>{product?.sleeve_length}</p>
                </li>
              </div>
              <p className="mt-2">{product?.description}</p>
            </div>
          </details>

          {/* Product Review and Rating */}
          <div className="bg-white shadow-lg rounded-lg p-8 mt-10 w-[75rem]">
            <div className="flex items-center gap-10">
              <h1 className="text-2xl uppercase font-semibold">
                Product Reviews
              </h1>
              <button
                className="border border-secondary_2 py-2 px-4 hover:shadow-lg uppercase"
                onClick={() => setIsReviewOpen(true)}
              >
                Write a Review
              </button>
            </div>

            {isReviewOpen && (
              <ReviewModal setIsReviewOpen={setIsReviewOpen} id={id} />
            )}

            <hr className="w-[13rem] mt-1 h-[0.1rem] bg-black opacity-70" />

            {/* Sorting dropdown */}
            <div className="flex items-center gap-4 mt-5">
              <label htmlFor="sortReviews" className="font-semibold">
                Sort By:
              </label>
              <select
                id="sortReviews"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-md p-1"
              >
                <option value="Newest">Newest</option>
                <option value="Highest">Highest Rating</option>
                <option value="Lowest">Lowest Rating</option>
              </select>
            </div>

            <div className="mt-5">
              {sortedReviews.map((review, i) => (
                <div key={i} className="mb-10">
                  <p className="text-xl font-bold">
                    {review.rating}⭐
                    {review.rating >= 5 && (
                      <span className="text-green-600 ml-2">
                        {/* highlight key reviews */}
                        Top Rated
                      </span>
                    )}
                  </p>
                  <div className="flex gap-2 justify-between">
                    <h1 className="font-bold my-2 text-xl">{review.title}</h1>
                    <p className="text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="mb-2">{review.review}</p>

                  {/* Review Reactions: Helpful */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleHelpful(i)}
                      className="text-blue-600 hover:underline"
                    >
                      Helpful ({helpfulCounts[i] || 0})
                    </button>
                  </div>
                  <hr className="h-[0.1rem] bg-black opacity-30 mt-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Personalized Recommendations */}
          <div className="bg-white shadow-lg rounded-lg p-8 mt-10 w-[75rem]">
            <h2 className="text-2xl uppercase font-semibold">
              You May Also Like
            </h2>
            <hr className="w-[13rem] mt-1 h-[0.1rem] bg-black opacity-70" />
            <div className="flex gap-6 mt-5">
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
                  <h3 className="text-lg font-semibold mt-2">{relProd.name}</h3>
                  <p className="text-green-600 font-semibold">
                    ₹{relProd.price}
                  </p>
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
