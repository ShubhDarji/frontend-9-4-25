// src/pages/Account/AccountLayout.jsx

import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Account.css";

const AccountLayout = () => {
  const navigate = useNavigate();


  
    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("lastVisitedPage"); // optional
  
      navigate("/login");
    };


  return (
    <Container className="account-page">
      <Row>
        <Col md={3} className="account-sidebar">
          <h4>My Account</h4>
          <Nav className="flex-column account-nav">
            <NavLink to="profile" className="nav-link">Profile</NavLink>
            <NavLink to="my-order" className="nav-link">My Orders</NavLink>
            <NavLink to="returns" className="nav-link">Return Orders</NavLink>
            <NavLink to="wishlist" className="nav-link">Wishlist</NavLink>
            <Nav.Link onClick={handleLogout} className="nav-link">Logout</Nav.Link>
          </Nav>
        </Col>
        <Col md={9} className="account-content">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AccountLayout;