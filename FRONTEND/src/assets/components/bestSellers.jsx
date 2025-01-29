import { recentCollection } from "../utils/recentCollection";
import Carousel from "./carousel";

const BestSellers = () => {
  return (
    <section className="pb-10" aria-labelledby="bestsellers-heading">
      <div className="container mx-auto px-2 sm:">
        <h2
          id="bestsellers-heading"
          className="text-4xl px-5 sm:px-4 md:px-10 lg:px-20 xl:px-20 font-bold text-gray-800"
        >
          Best Sellers
        </h2>
        <p className="text-gray-600 px-5 sm:px-4 md:px-10 lg:px-20 xl:px-20 mt-2">
          Choose from the Top products of all time
        </p>
        <Carousel itemList={recentCollection} />
      </div>
    </section>
  );
};

export default BestSellers;
