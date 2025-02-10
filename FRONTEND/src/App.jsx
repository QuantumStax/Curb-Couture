/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./assets/pages/home";
import Blogs from "./assets/pages/blogs";
import Contact from "./assets/pages/contact";
import ForgotPass from "./assets/pages/forgotPass";
import Login from "./assets/pages/login";
import PrivacyPolicy from "./assets/pages/privacyPolicy";
import Register from "./assets/pages/register";
import TermsandConditions from "./assets/pages/tnc";
import AboutUs from "./assets/pages/aboutus";
import TopDeals from "./assets/pages/topdeals";
import FeaturedProducts from "./assets/pages/featuredProducts";
import CustomScrollbarWrapper from "./assets/components/CustomScrollbarWrapper";
import MensCollection from "./assets/pages/mensCollection";
import WomensCollection from "./assets/pages/womensCollection";
import WishList from "./assets/pages/wishlist";
import Cart from "./assets/pages/cart";
import "./assets/styles/index.css";
import ProductView from "./assets/components/productView";
import SearchModal from "./assets/components/searchModal";
import Admin from "./assets/pages/admin";
import ScrollToTop from "./assets/components/ScrollToTop";
import Nav from "./assets/components/nav2";
import ReviewModal from "./assets/components/reviewModal";

function ProtectedRoute({ children }) {
  // Check if a token exists; in a real app, use more robust auth management
  const token = localStorage.getItem("token");
  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  return (
    <Router>
      <CustomScrollbarWrapper>
        <main>
          <ScrollToTop />
          <Nav setIsModalOpen={setIsModalOpen} />
          <Routes>
            {/* Protect the home routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home setIsModalOpen={setIsModalOpen} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home/:email"
              element={
                <ProtectedRoute>
                  <Home setIsModalOpen={setIsModalOpen} />
                </ProtectedRoute>
              }
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/login" element={<Login />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/register" element={<Register />} />
            <Route path="/t-n-c" element={<TermsandConditions />} />
            <Route path="/top-deals" element={<TopDeals />} />
            <Route path="/featured" element={<FeaturedProducts />} />
            <Route path="/mens-collection" element={<MensCollection />} />
            <Route path="/womens-collection" element={<WomensCollection />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/my-cart" element={<Cart />} />
            <Route path="/view" element={<ProductView />} />
            <Route
              path="/view/:id"
              element={<ProductView setIsReviewOpen={setIsReviewOpen} />}
            />
          </Routes>
          {isModalOpen && <SearchModal setIsModalOpen={setIsModalOpen} />}
          {isReviewOpen && <ReviewModal setIsReviewOpen={setIsReviewOpen} />}
        </main>
      </CustomScrollbarWrapper>
    </Router>
  );
}

export default App;
