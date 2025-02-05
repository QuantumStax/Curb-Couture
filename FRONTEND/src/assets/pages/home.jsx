/* eslint-disable react/prop-types */
import { lazy, Suspense } from "react";
import Cupon from "../components/cupon";
import Footer from "../components/footer";
import OurBrand from "../components/ourBrand";
// import Categories from "../components/categories";
import Nav from "../components/nav2";
import HeroSlider2 from "../components/hero3";

// Lazy-loaded components
const RecentAdditions = lazy(() => import("../components/recentAdditions"));
const OurCollection = lazy(() => import("../components/ourCollection"));
const JustLaunced = lazy(() => import("../components/justLaunched"));
const BestSellers = lazy(() => import("../components/bestSellers"));

function Home({ setIsModalOpen }) {
  return (
    <section>
      <header aria-label="Site Header">
        <Nav setIsModalOpen={setIsModalOpen} />
        <HeroSlider2 />
      </header>
      {/* <section aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="sr-only">
          Categories
        </h2>
        <Categories />
      </section> */}
      <Cupon />
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <section className="bg-primary">
            <RecentAdditions />
          </section>
          <section className="bg-primary">
            <OurCollection />
          </section>
          <section className="bg-primary">
            <JustLaunced />
          </section>
          <section className="bg-primary">
            <BestSellers />
          </section>
        </section>
      </Suspense>
      <section className="bg-brand">
        <OurBrand />
      </section>
      <section className="bg-banner">
        <Footer />
      </section>
    </section>
  );
}

export default Home;
