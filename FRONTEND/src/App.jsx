import Home from "./assets/pages/home";
import Blogs from "./assets/pages/blogs";
import Contact from "./assets/pages/contact";
import ForgotPass from "./assets/pages/forgotPass";
import Login from "./assets/pages/login";
import PrivacyPolicy from "./assets/pages/privacyPolicy";
import Register from "./assets/pages/register";
import TermsandConditions from "./assets/pages/tnc";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/styles/index.css";
import AboutUs from "./assets/pages/aboutus";
import TopDeals from "./assets/pages/topdeals";
import FeaturedProducts from "./assets/pages/featuredProducts";
// import Shop from "./assets/components/shop";
// import items from "./assets/utils/catalog";
import CustomScrollbarWrapper from "./assets/components/CustomScrollbarWrapper";
import MensCollection from "./assets/pages/mensCollection";
import WomensCollection from "./assets/pages/womensCollection";
// import Filter from "./assets/pages/filter";
function App() {
  return (
    <Router>
      <CustomScrollbarWrapper>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/my-account" element={<Login />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/register" element={<Register />} />
            <Route path="/t-n-c" element={<TermsandConditions />} />
            <Route path="/top-deals" element={<TopDeals />} />
            <Route path="/featured" element={<FeaturedProducts />} />
            <Route path="/mens-collection" element={<MensCollection />} />
            <Route path="/womens-collection" element={<WomensCollection />} />
            {/* <Route
              path="/shop"
              element={
                <Shop
                  itemArray={items}
                  image="/images/just_launched/mythical-dragon-oversized-t-shirt-521913-removebg-preview.webp"
                  heading="Shop"
                />
              }
            /> */}
          </Routes>
          {/* <Filter /> */}
        </main>
      </CustomScrollbarWrapper>
    </Router>
  );
}

export default App;
