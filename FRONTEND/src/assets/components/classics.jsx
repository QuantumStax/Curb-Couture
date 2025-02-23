/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Shop from "../components/shop";
import Loader from "../components/loader"
import ShopHero from "../components/shopHero";

const Classics = ({ setIsModalOpen }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setISLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/get-products");
        const data = await res.json();
        setProducts(data.products);
        setISLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  return (
    <section className="top-deals-section" aria-labelledby="top-deals-heading">
      <h2 id="top-deals-heading" className="sr-only">
        Classics
      </h2>

      {products.length > 0 ? (
        <Shop
          itemArray={products}
          heading="Classics"
          image="/images/categories/classics.jpg"
          setIsModalOpen={setIsModalOpen}
        />
      ) : isLoading ? (
        <div className="absolute left-[50%] top-[50%]">
          <Loader/>
        </div>
      ) : (
        <div>
          <ShopHero/>
          <p className="text-gray-500 text-center py-4">
            No products Available at the moment
          </p>
        </div>
      )}
    </section>
  );
};

export default Classics;
