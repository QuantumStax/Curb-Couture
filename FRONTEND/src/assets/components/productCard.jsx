/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { memo } from "react";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

const ProductCard = memo(({ offer, badge, imgSrc, brand, title, price, discount, rating }) => {
  return (
    <article className="relative mx-2 px-2 py-3 w-[21rem] hover:shadow-md hover:scale-[1.02] rounded-md cursor-pointer transition-all duration-500" role="contentinfo" aria-label={`Product card for ${title}`}>
      <div>
        {/* Product Image */}
        <img
          src={imgSrc}
          alt={`${title} by ${brand}`}
          className="w-[20rem] h-[20rem] rounded-md object-center shadow-md cursor-pointer"
          loading="lazy"
        />
        {/* Offer Badge */}
        {offer && (
          <div
            className="absolute top-4 left-3 w-[5rem] font-semibold flex items-center justify-center rounded-md bg-red-500 text-primary py-0.5"
            aria-label={`${offer} offer`}
          >
            <p>{offer}</p>
          </div>
        )}
        {/* Category Badge */}
        {badge && (
          <div
            className="absolute top-12 left-3 bg-blue-600 w-[5rem] py-0.5 flex items-center justify-center uppercase font-bold text-primary rounded-md"
            aria-label={`Badge: ${badge}`}
          >
            <p>{badge}</p>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="mt-2">

        {/* Title */}
        <h2 className="text-xl font-medium" aria-label={`Product title: ${title}`}>
          {title}
        </h2>

        {/* Price and Discount */}
        <div className="flex gap-3 items-center">
          <p className="text-lg font-semibold text-green-600" aria-label={`Price: ${price}`}>
            {price}
          </p>
          {discount && (
            <span
              className="line-through opacity-60 text-sm"
              aria-label={`Original price: ${discount}`}
            >
              {discount}
            </span>
          )}
        </div>

        {/* Star Rating */}
        <div className="flex items-center mt-1" role="img" aria-label={`Rating: ${rating} out of 5 stars`}>
          <p className="text-base font-medium">{rating}</p>
          <StarOutlinedIcon
            className="ml-1 text-yellow-400"
            style={{ fontSize: "1.3rem", transform: "translateY(-0.1rem)" }}
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
});

export default ProductCard;
