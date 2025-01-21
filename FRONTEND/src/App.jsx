import Categories from "./assets/components/categories";
import Cupon from "./assets/components/cupon";
import HeaderTopDeals from "./assets/components/headerTopDeals";
import Hero from "./assets/components/hero";
import Navbar from "./assets/components/navbar";
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
    </main>
  );
}

export default App;
