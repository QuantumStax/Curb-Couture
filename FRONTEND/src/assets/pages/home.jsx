import { lazy, Suspense } from "react";
import Cupon from "../components/cupon";
import Footer from "../components/footer";
import OurBrand from "../components/ourBrand";
// import Categories from "../components/categories";
import HeroSlider2 from "../components/hero3";
import Loader from "../components/loader"

// Lazy-loaded components
const RecentAdditions = lazy(() => import("../components/recentAdditions"));
const OurCollection = lazy(() => import("../components/ourCollection"));
const JustLaunced = lazy(() => import("../components/justLaunched"));
const BestSellers = lazy(() => import("../components/bestSellers"));

function Home() {
  return (
    <section>
      <header aria-label="Site Header">
        <HeroSlider2 />
      </header>
      {/* <section aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="sr-only">
          Categories
        </h2>
        <Categories />
      </section> */}
      <Cupon />
      <Suspense fallback={<div><Loader/></div>}>
        <section>
          <section className="bg-primary">
            <RecentAdditions />
          </section>
          <section className="bg-primary">
            <OurCollection />
          </section>
          <section className="bg-primary py-16">
            <JustLaunced />
          </section>
          <section className="bg-primary">
            <BestSellers />
          </section>
        </section>
      </Suspense>
      <section className="bg-banner_2">
        <OurBrand />
      </section>
      <section className="bg-banner">
        <Footer />
      </section>
    </section>
  );
}

export default Home;
