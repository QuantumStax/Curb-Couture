import { Helmet } from "react-helmet";
import Navbar from "../components/navbar";
import ShopCatalog from "./catalog";
import ShopActionsMenu from "./shopActionsMenu";
import ShopHero from "./shopHero";
import items from "../utils/catalog";

const Shop = () => {
  return (
    <>
      {/* SEO Optimization */}
      <Helmet>
        <title>Shop - Your Favorite Products at Best Prices</title>
        <meta
          name="description"
          content="Discover the best products in our shop catalog. Find amazing deals, top brands, and exclusive offers tailored just for you."
        />
        <meta
          name="keywords"
          content="shop, products, deals, offers, catalog, online shopping, top brands"
        />
        <meta name="author" content="Your Company Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Shop - Your Favorite Products" />
        <meta
          property="og:description"
          content="Browse through our catalog and find the best deals on your favorite items."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/shop" />
        <meta
          property="og:image"
          content="https://yourwebsite.com/hero-image.jpg"
        />
      </Helmet>

      <section className="bg-primary">
        {/* Navbar */}
        <Navbar />

        {/* Hero */}
        <ShopHero />

        {/* Actions Menu */}
        <ShopActionsMenu />

        {/* Catalog */}
        <ShopCatalog items={items} />
      </section>
    </>
  );
};

export default Shop;
