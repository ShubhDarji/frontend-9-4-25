// src/pages/Account/Orders.jsx

import React, { useState, useEffect } from "react";
import {
  Card,
  Tag,
  Button,
  message,
  Spin,
  Row,
  Col,
  Typography,
  Divider,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);
  const userToken = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      message.error("Please login to view your orders.");
      setLoading(false);
      return;
    }
    fetchOrders();
  }, [userToken]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/orders/user`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      message.error(
        error.response?.data?.message || "Failed to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    setCancelling(orderId);
    try {
      await axios.put(
        `${API_BASE_URL}/api/orders/${orderId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
      message.success("Order cancelled successfully.");
    } catch (err) {
      console.error(err);
      message.error("Failed to cancel order.");
    } finally {
      setCancelling(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "gold";
      case "Shipped":
        return "blue";
      case "Delivered":
        return "green";
      case "Cancelled":
        return "red";
      default:
        return "default";
    }
  };

  const getPaymentColor = (status) =>
    status === "Completed" ? "green" : "red";

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px 0" }}>
        <Title level={4}>No Orders Found</Title>
        <Text>Start shopping now!</Text>
        <Button type="primary" onClick={() => navigate("/")} style={{ marginTop: "12px" }}>
          Shop Now
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: "10px 0" }}>
      <Title level={4} style={{ marginBottom: "20px" }}>My Orders</Title>
      <Row gutter={[16, 16]}>
        {orders.map((order) => (
          <Col xs={24} sm={12} lg={8} key={order._id}>
            <Card
              hoverable
              style={{
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text strong>Order #{order._id.slice(-5)}</Text>
                <Tag color={getStatusColor(order.overallStatus)}>
                  {order.overallStatus}
                </Tag>
              </div>

              <Divider />

              {order.items.map((item, index) => (
                <div
                  key={`${order._id}-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                    gap: "10px",
                  }}
                >
                  <img
                    src={
                      item.image
                        ? `${API_BASE_URL}/uploads/${item.image}`
                        : "/placeholder.png"
                    }
                    alt={item.productName}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      border: "1px solid #eee",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <Text>{item.productName}</Text>
                  </div>
                  <Text>₹{item.price}</Text>
                </div>
              ))}

              <Divider />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Total</Text>
                <Text strong>₹{order.totalAmount}</Text>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Payment</Text>
                <Tag color={getPaymentColor(order.paymentStatus)}>
                  {order.paymentStatus === "Completed" ? "Paid" : "Unpaid"}
                </Tag>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Date</Text>
                <Text>{new Date(order.createdAt).toLocaleDateString()}</Text>
              </div>

              {order.status === "Pending" && (
                <Button
                  type="primary"
                  danger
                  block
                  loading={cancelling === order._id}
                  style={{ marginTop: "10px" }}
                  onClick={() => cancelOrder(order._id)}
                >
                  Cancel Order
                </Button>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OrderPage;