import HeaderTopDeals from "./assets/components/headerTopDeals";
import Hero from "./assets/components/hero";
import Navbar from "./assets/components/navbar";
import "./assets/styles/index.css";
function App() {
  return (
    <main>
      <header aria-label="Site Header" role="header">
        <HeaderTopDeals />
        <Navbar/>
        <Hero/>
      </header>
    </main>
  );
}

export default App;
