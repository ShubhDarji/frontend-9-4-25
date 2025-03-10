import React, { useEffect, useState } from "react";
import { Layout, Card, Statistic, Table, Typography, Space } from "antd";
import { DollarCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import SellerSidebar from "../../../components/seller/SellerSidebar";
import SellerNavbar from "../../../components/seller/SellerNavbar";
import ChatBox from "../../../components/seller/ChatBox";
const { Content, Header } = Layout;
const { Title } = Typography;

const SellerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalSales: 0, totalOrders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("sellerToken");
    
        if (!token) {
          console.error("No token found! Redirecting to login...");
          return;
        }
    
        const { data } = await axios.get("http://localhost:5000/api/seller/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        setStats({ totalSales: data.totalSales, totalOrders: data.totalOrders });
        setOrders(data.recentOrders);
      } catch (error) {
        console.error("Error fetching dashboard data:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchDashboardData();
  }, []);

  const columns = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Total Price", dataIndex: "total", key: "total", render: (text) => `$${text}` },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <SellerSidebar />

      <Layout style={{ marginLeft: 0 }}> {/* Adjust for Sidebar width */}
        {/* Navbar */}
        <Header
          style={{
            background: "#fff",
            padding: "0 20px",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SellerNavbar />
        </Header>

        {/* Content */}
        <Content style={{ padding: "24px", background: "#f5f5f5" }}>
          <Title level={2} style={{ marginBottom: "20px" }}>Seller Dashboard</Title>

          {/* Stats Cards */}
          <Space size="large">
            <Card style={{ width: 300, textAlign: "center" }}>
              <Statistic title="Total Sales" value={stats.totalSales} prefix={<DollarCircleOutlined />} />
            </Card>
            <Card style={{ width: 300, textAlign: "center" }}>
              <Statistic title="Total Orders" value={stats.totalOrders} prefix={<ShoppingCartOutlined />} />
            </Card>
          </Space>

          {/* Recent Orders Table */}
          <Card style={{ marginTop: "20px" }}>
            <Title level={4} style={{ marginBottom: "10px" }}>Recent Orders</Title>
            <Table
              columns={columns}
              dataSource={orders}
              rowKey="orderId"
              loading={loading}
              pagination={{ pageSize: 5 }}
              scroll={{ x: true }}
            />
          </Card>
          
        </Content>
      </Layout>
    </Layout>
  );
};

export default SellerDashboard;
