import { lazy, Suspense } from "react";
import Footer from "../components/footer";
import OurBrand from "../components/ourBrand";
// import HeroSlider2 from "../components/hero3";
import Loader from "../components/loader"
import HeroSlider from "../components/hero2";

// Lazy-loaded components
const RecentAdditions = lazy(() => import("../components/recentAdditions"));
const OurCollection = lazy(() => import("../components/ourCollection"));
const JustLaunced = lazy(() => import("../components/justLaunched"));
const BestSellers = lazy(() => import("../components/bestSellers"));

function Home() {
  return (
    <section>
      <header aria-label="Site Header" className="h-[90vh]">
        <HeroSlider />
      </header>
      <Suspense fallback={<div><Loader/></div>}>
        <section>
          <section className="bg-bg-main text-primary_2">
            <RecentAdditions />
          </section>
          <section className="bg-bg-main text-primary_2">
            <OurCollection />
          </section>
          <section className="bg-bg-main text-primary_2 py-16">
            <JustLaunced />
          </section>
          <section className="bg-bg-main text-primary_2">
            <BestSellers />
          </section>
        </section>
      </Suspense>
      <section className="bg-gray-800 text-primary_2">
        <OurBrand />
      </section>
      <section className="">
        <Footer />
      </section>
    </section>
  );
}

export default Home;
