/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { recentCollection } from "../utils/recentCollection";
import Carousel from "./carousel";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

const RecentAdditions = () => {
  const [products, setProducts] = useState([]);
  
  const [isLoading, setISLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/get-products");
        const data = await res.json();
        console.log(data);
        
        setProducts(data.products);
        setISLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);
  return (
    <div id="recent-additions" className="px-4 sm:px-8 md:px-12 lg:px-20">
      <Carousel
        mainHead="New Arrivals"
        Icon={NewReleasesIcon}
        subPara="Chase the Trend with our newest collection"
        itemList={products}
      />
    </div>
  );
};

export default RecentAdditions;
