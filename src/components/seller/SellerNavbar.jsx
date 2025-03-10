import React from "react";
import { Layout, Button } from "antd";

const { Header } = Layout;

const SellerNavbar = ({ logout }) => (
  <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <h2 style={{ color: "white" }}>Seller Dashboard</h2>
    <Button danger onClick={logout}>Logout</Button>
  </Header>
);

export default SellerNavbar;
