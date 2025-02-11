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
import Account from "./assets/pages/account";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse token:", error);
    return null;
  }
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  const decoded = parseJwt(token);
  if (!decoded || decoded.role !== "admin") {
    // Redirect non-admin users to the home page
    return <Navigate to="/" replace />;
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
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/t-n-c" element={<TermsandConditions />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/top-deals" element={<TopDeals />} />
            <Route path="/featured" element={<FeaturedProducts />} />
            <Route path="/mens-collection" element={<MensCollection />} />
            <Route path="/womens-collection" element={<WomensCollection />} />
            <Route path="/account" element={<Account />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/view" element={<ProductView />} />
            <Route
              path="/view/:id"
              element={<ProductView setIsReviewOpen={setIsReviewOpen} />}
            />

            {/* Protected Routes for authenticated users */}
            <Route
              path="/"
              element={<Home setIsModalOpen={setIsModalOpen} />}
            />
            <Route
              path="/home/:email"
              element={
                <ProtectedRoute>
                  <Home setIsModalOpen={setIsModalOpen} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <WishList setIsModalOpen={setIsModalOpen} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-cart"
              element={
                <ProtectedRoute>
                  <Cart setIsModalOpen={setIsModalOpen} />
                </ProtectedRoute>
              }
            />

            {/* Admin Protected Route */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
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
