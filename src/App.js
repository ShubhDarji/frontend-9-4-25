import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loaader"; // Keeping typo as per request
import Login from "./pages/Login"; 

// Lazy Load Components (Ensure all are default exports)
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const Brand = lazy(() => import("./pages/Brand"));
const Profile = lazy(() => import("./pages/Profile"));
const Signup = lazy(() => import("./pages/Signup"));
const Register = lazy(() => import("./pages/Register"));

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminPasskey = lazy(() => import("./pages/admin/AdminPasskey"));
const AdminSignup = lazy(() => import("./pages/admin/AdminSignup"));

// Seller Pages (Fixing incorrect path issue)
const SellerRegistration = lazy(() => import("./pages/seller/regisration/SellerRegistration"));
const SellerLogin = lazy(() => import("./pages/seller/login/SellerLogin"));
const SellerDashboard = lazy(() => import("./pages/seller/dashboard/SellerDashboard"));
const SellerProfile = lazy(() => import("./pages/seller/SellerProfile"));
const ManageProducts = lazy(() => import("./pages/seller/ManageProducts"));
const ManageOrders = lazy(() => import("./pages/seller/ManageOrder"));
const Earnings = lazy(() => import("./pages/seller/Earnings"));
const Reviews = lazy(() => import("./pages/seller/Reviews"));
const CustomerMessages = lazy(() => import("./pages/seller/CustomerMessages"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer position="top-right" autoClose={1000} hideProgressBar />
        <NavBar />

        <Routes>
          {/* Consumer Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/brand/:brandName" element={<Brand />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />

          {/* Seller Routes */}
          <Route path="/sell-with-us" element={<SellerRegistration />} />
          <Route path="/seller-login" element={<SellerLogin />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/seller/register" element={<SellerRegistration />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/profile" element={<SellerProfile />} />
          <Route path="/seller/products" element={<ManageProducts />} />
          <Route path="/seller/orders" element={<ManageOrders />} />
          <Route path="/seller/earnings" element={<Earnings />} />
          <Route path="/seller/reviews" element={<Reviews />} />
          <Route path="/seller/messages" element={<CustomerMessages />} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-access" element={<AdminPasskey />} />
          <Route path="/admin-signup" element={<AdminSignup />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
