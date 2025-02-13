/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext";
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
import Account from "./assets/pages/account";
import Hoodies from "./assets/pages/hoodies";
import { useState } from "react";
import Checkout from "./assets/pages/checkOut";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAuthenticated && isAdmin ? children : <Navigate to="/" replace />;
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AuthProvider>
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
              <Route path="/hoodies" element={<Hoodies />} />
              <Route path="/featured" element={<FeaturedProducts />} />
              <Route path="/mens-collection" element={<MensCollection />} />
              <Route path="/womens-collection" element={<WomensCollection />} />
              <Route path="/account" element={<Account />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/view" element={<ProductView />} />
              <Route path="/view/:id" element={<ProductView />} />

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
          </main>
        </CustomScrollbarWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
