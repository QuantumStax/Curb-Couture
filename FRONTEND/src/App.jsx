import HeaderTopDeals from "./assets/components/headerTopDeals";
import Navbar from "./assets/components/navbar";
import "./assets/styles/index.css";
function App() {
  return (
    <main>
      <header aria-label="Site Header" role="header">
        <HeaderTopDeals />
        <Navbar/>
      </header>
    </main>
  );
}

export default App;
