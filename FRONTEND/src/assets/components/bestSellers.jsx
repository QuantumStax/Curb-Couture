import { recentCollection } from "../utils/recentCollection";
import Carousel from "./carousel";

const BestSellers = () => {
  return (
    <div className="pb-10">
      <Carousel
        mainHead="Best Sellers"
        subPara="Choose from the Top products of all time"
        itemList={recentCollection}
      />
    </div>
  );
};

export default BestSellers;
