/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { memo } from "react";

const CarouselCard = memo(({ imgSrc, title }) => {
  return (
    <article className="relative w-[17rem] h-[20rem] lg:w-[17rem] md:w-[15rem] hover:shadow-md hover:scale-[1.02] rounded-md transition-all duration-500 text-primary_2" role="contentinfo" aria-label={`Product card for ${title}`}>
      <div className="w-full aspect-square flex items-center rounded-md justify-center">
        {/* Product Image */}
        <img
          src={imgSrc}
          alt={`${title}`}
          className="w-full h-full object-cover rounded-md shadow-md"
          loading="lazy"
        />
      </div>
    </article>
  );
});

export default CarouselCard;
