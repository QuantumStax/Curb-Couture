import { useEffect, useState } from "react";
import Shop from "../components/shop";

const TopDeals = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/get-products");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  return (
    <section className="top-deals-section" aria-labelledby="top-deals-heading">
      <h2 id="top-deals-heading" className="sr-only">
        Top Deals
      </h2>

      {products.length > 0 ? (
        <Shop
          itemArray={products}
          heading="Top Deals"
          image="\images\just_launched\mythical-dragon-oversized-t-shirt-521913-removebg-preview.webp"
        />
      ) : (
        <p className="text-gray-500 text-center py-4">
          No top deals available at the moment.
        </p>
      )}
    </section>
  );
};

export default TopDeals;
