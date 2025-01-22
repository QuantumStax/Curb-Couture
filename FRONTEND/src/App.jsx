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
import Shop from "./assets/components/shop";
function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/forgot-password" element={<ForgotPass/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/t-n-c" element={<TermsandConditions/>} />
          <Route path="/top-deals" element={<TopDeals/>} />
          <Route path="/featured-products" element={<FeaturedProducts/>} />
          <Route path="/shop" element={<Shop/>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
