import Categories from "./assets/components/categories";
import Cupon from "./assets/components/cupon";
import HeaderTopDeals from "./assets/components/headerTopDeals";
import Hero from "./assets/components/hero";
import Navbar from "./assets/components/navbar";
import ProductCard from "./assets/components/productCard";
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
      </section>
      <Cupon />
      <ProductCard
        offer="-14%"
        badge="hot"
        imgSrc="/images/categories/shirts_folded.jpg"
        brand="Peter England"
        title="Peter England Premium Shirt"
        price="₹1299"
        discount="₹1500"
        rating="4.5"
      />
    </main>
  );
}

export default App;
