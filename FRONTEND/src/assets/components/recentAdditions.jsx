import { recentCollection } from "../utils/recentCollection";
import Carousel from "./carousel";

const RecentAdditions = () => {
  return (
    <div className="pb-10 px-4 sm:px-8 md:px-12 lg:px-20">
      <Carousel
        mainHead="Recent Additions"
        subPara="Chase the Trend with our newest collection"
        itemList={recentCollection}
      />
    </div>
  );
};

export default RecentAdditions;