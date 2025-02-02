// import PageTransitionWrapper from "../components/pageTransitionWrapper";
import Shop from "../components/shop";
import items from "../utils/catalog";

const TopDeals = () => {
  return (
    // <PageTransitionWrapper>
      <section
        className="top-deals-section"
        aria-labelledby="top-deals-heading"
      >
        <h2 id="top-deals-heading" className="sr-only">
          Top Deals
        </h2>
        {items && items.length > 0 ? (
          <Shop
            itemArray={items}
            heading="Top Deals"
            image="/images/just_launched/mythical-dragon-oversized-t-shirt-521913-removebg-preview.webp"
          />
        ) : (
          <p className="text-gray-500 text-center py-4">
            No top deals available at the moment.
          </p>
        )}
      </section>
    // </PageTransitionWrapper>
  );
};

export default TopDeals;
