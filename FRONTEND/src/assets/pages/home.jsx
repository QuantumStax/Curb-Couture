import BestSellers from "../components/bestSellers";
import Categories from "../components/categories";
import Cupon from "../components/cupon";
import Footer from "../components/footer";
// import Features from "../components/features";
import HeaderTopDeals from "../components/headerTopDeals";
import Hero from "../components/hero";
import JustLaunced from "../components/justLaunched";
import Navbar from "../components/navbar";
import OurBrand from "../components/ourBrand";
import OurCollection from "../components/ourCollection";
import RecentAdditions from "../components/recentAdditions";
function Home() {
  return (
    <section>
      <header aria-label="Site Header" role="header">
        <HeaderTopDeals />
        <Navbar />
        <Hero />
      </header>
      <section aria-label="categories">
        <Categories />
        {/* change style to box type */}
      </section>
      <Cupon />
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
