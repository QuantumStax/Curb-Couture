/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet";
import ShopCatalog from "./catalog";
import ShopActionsMenu from "./shopActionsMenu";
import ShopHero from "./shopHero";
import Nav from "./nav2";
import HeaderTopDeals from "./headerTopDeals";

const Shop = ({ itemArray, image, heading }) => {
  return (
    <>
      {/* SEO Optimization */}
      <Helmet>
        <title>Shop - Your Favorite Products at Best Prices</title>b
        <meta
          name="description"
          content="Discover the best products in our shop catalog. Find amazing deals, top brands, and exclusive offers tailored just for you."
        />
        <meta
          name="keywords"
          content="shop, products, deals, offers, catalog, online shopping, top brands"
        />
        <meta name="author" content="Curb Coture" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Shop - T-shirts, Oversized, Baggy, Shirts, Pants, Jeans for both men and women"
        />
        <meta
          property="og:description"
          content="Browse through our catalog and find the best deals on your favorite items."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://curbcoture.com/shop" />
        <meta
          property="og:image"
          content="https://curbcoture.com/hero-image.jpg"
        />
      </Helmet>

      <section className="bg-primary">
        {/* Navbar */}
        <HeaderTopDeals />
        <Nav />

        {/* Hero */}
        <ShopHero image={image} heading={heading} />

        {/* Actions Menu */}
        <ShopActionsMenu />

        {/* Catalog */}
        <ShopCatalog items={itemArray} />
      </section>
    </>
  );
};

export default Shop;
