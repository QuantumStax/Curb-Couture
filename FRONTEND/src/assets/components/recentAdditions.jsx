import { recentCollection } from "../utils/recentCollection";
import Carousel from "./carousel";
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const RecentAdditions = () => {
  return (
    <div id="recent-additions" className="px-4 sm:px-8 md:px-12 lg:px-20">
      <Carousel
        mainHead="New Arrivals"
        Icon={NewReleasesIcon}
        subPara="Chase the Trend with our newest collection"
        itemList={recentCollection}
      />
    </div>
  );
};

export default RecentAdditions;
