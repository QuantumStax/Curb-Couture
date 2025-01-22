import Categories from "./assets/components/categories";
import Cupon from "./assets/components/cupon";
// import Features from "./assets/components/features";
import HeaderTopDeals from "./assets/components/headerTopDeals";
import Hero from "./assets/components/hero";
import JustLaunced from "./assets/components/justLaunched";
import Navbar from "./assets/components/navbar";
import OurCollection from "./assets/components/ourCollection";
import RecentAdditions from "./assets/components/recentAdditions";
import "./assets/styles/index.css";
function App() {
  return (
    <main>
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
      {/* <section className="bg-primary">
        <Features />
      </section> */}
      <section className="bg-primary">
        <OurCollection />
      </section>
      <section className="bg-primary">
        <JustLaunced/>
      </section>
    </main>
  );
}

export default App;
