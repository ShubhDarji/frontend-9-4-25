import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./style.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container01">
        <div className="footer-top">
          <div className="footer-logo">
            <h2>ShopZone</h2>
            <p>Your one-stop shop for the best deals!</p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/seller/signup" className="sell-link">Sell With Us</Link></li> {/* Added Sell With Us */}
            </ul>
          </div>

          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        <hr />

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ShopZone. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
