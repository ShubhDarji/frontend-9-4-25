import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

const SellerNavbar = () => {
  return (
    <Header style={{ background: "#fff", padding: "0 20px", fontSize: "18px", fontWeight: "bold" }}>
      Seller Dashboard
    </Header>
  );
};

export default SellerNavbar;
