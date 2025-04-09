import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import "./navbar.css";

const Navbar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(JSON.parse(localStorage.getItem("cart") || "[]").length);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <>
      <header className="navbar">
        <div className="navbar__left">
          <Link to="/" className="navbar__logo">
            <span className="logo-main">E-TEK</span>
            <span className="logo-sub">Online Store</span>
          </Link>
        </div>

        <nav className="navbar__center">
          <ul className="navbar__nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="navbar__right">
          <Link to="/account" aria-label="Profile"><User /></Link>
          <Link to="/cart" className="cart-icon" aria-label="Cart">
            <ShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button
            className="mobile-toggle"
            onClick={() => setIsSidebarVisible(true)}
            aria-label="Open Menu"
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`mobile-overlay ${isSidebarVisible ? "show" : ""}`}>
        <div className="mobile-menu">
          <button
            className="close-btn"
            onClick={() => setIsSidebarVisible(false)}
            aria-label="Close Menu"
          >
            <X />
          </button>
          <ul>
            <li><Link to="/" onClick={() => setIsSidebarVisible(false)}>Home</Link></li>
            <li><Link to="/shop" onClick={() => setIsSidebarVisible(false)}>Shop</Link></li>
        
            <li><Link to="/my-account" onClick={() => setIsSidebarVisible(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setIsSidebarVisible(false)}>Contact</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;