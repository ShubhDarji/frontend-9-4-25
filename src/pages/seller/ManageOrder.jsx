import React, { useState, useEffect } from "react";
import { Layout, Table, Button, message, Tag, Spin, Avatar, Dropdown, Menu, Empty } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import SellerSidebar from "../../components/seller/SellerSidebar";
const { Content } = Layout;
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const sellerId = localStorage.getItem("sellerId");

  // ✅ Fetch Orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("sellerToken");

      if (!token) {
        message.error("Unauthorized! No token found.");
        setLoading(false);
        return;
      }

      const { data } = await axios.get(`${API_BASE_URL}/api/ordersseller/seller/${sellerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(data);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
      message.error(error.response?.data?.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Update Product Status within an Order
  const updateProductStatus = async (orderId, productId, newStatus) => {
    try {
      const token = localStorage.getItem("sellerToken");

      if (!token) {
        message.error("Unauthorized! No token found.");
        return;
      }

      const { data } = await axios.put(
        `${API_BASE_URL}/api/ordersseller/${orderId}/product/${productId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      message.success("Product status updated!");
      fetchOrders(); // Refresh order list
    } catch (error) {
      console.error("❌ Error updating product status:", error);
      message.error(error.response?.data?.message || "Failed to update product.");
    }
  };

  // ✅ Order Status Colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "green";
      case "Shipped":
        return "blue";
      case "Processing":
        return "orange";
      case "Pending":
        return "red";
      default:
        return "gray";
    }
  };

  const columns = [
    { title: "Order ID", dataIndex: "_id", key: "_id" },
    {
      title: "Product Details",
      dataIndex: "items",
      key: "items",
      render: (items, record) => (
        <div>
          {items.map((item) => (
            <div key={item.productId} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Avatar src={item.image} shape="square" size={60} />
              <div>
                <strong>{item.productName}</strong>
                <p>Quantity: x{item.qty}</p>
                <Tag color={getStatusColor(item.status)}>{item.status}</Tag>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Price (₹)",
      dataIndex: "items",
      key: "price",
      render: (items) => items.map((item) => <p key={item.productId}>₹{item.price * item.qty}</p>),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          {record.items.map((item) => {
            const menu = (
              <Menu>
                {item.status === "Pending" && <Menu.Item onClick={() => updateProductStatus(record._id, item.productId, "Processing")}>Mark as Processing</Menu.Item>}
                {item.status === "Processing" && <Menu.Item onClick={() => updateProductStatus(record._id, item.productId, "Shipped")}>Mark as Shipped</Menu.Item>}
                {item.status === "Shipped" && <Menu.Item onClick={() => updateProductStatus(record._id, item.productId, "Delivered")}>Mark as Delivered</Menu.Item>}
              </Menu>
            );

            return (
              <div key={item.productId} style={{ marginBottom: "10px" }}>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Button type="primary">
                    Update {item.productName} Status <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            );
          })}
        </div>
      ),
    },
  ];

  return (
  <Layout>
      <SellerSidebar />
          
   
      <Content style={{ padding: "20px", backgroundColor: "#f4f6f8" }}>
        <h2>Manage Orders</h2>

        {loading ? <Spin size="large" /> : orders.length === 0 ? <Empty description="No orders found." /> : <Table columns={columns} dataSource={orders} rowKey="_id" />}
      </Content>
    </Layout>
  );
};

export default ManageOrders;