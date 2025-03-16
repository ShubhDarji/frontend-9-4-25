import React from "react";
import { Layout } from "antd";
import SellerSidebar from "../../../components/seller/SellerSidebar";
import SellerNavbar from "../../../components/seller/SellerNavbar"; 

const { Content } = Layout;

const SellerDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SellerSidebar />
      <Layout>
        <SellerNavbar />
        <Content style={{ padding: "20px", background: "#f5f5f5" }}>
          <h2>Welcome to Your Seller Dashboard</h2>
          <p>Manage your products, orders, and earnings from here.</p>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SellerDashboard;
