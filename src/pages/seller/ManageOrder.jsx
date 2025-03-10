import React, { useState, useEffect } from "react";
import { Layout, Table, Button, message, Tag } from "antd";
import SellerSidebar from "../../components/seller/SellerSidebar";
import axios from "axios";

const { Content } = Layout;

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("sellerToken");
      const { data } = await axios.get("http://localhost:5000/api/seller/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      const token = localStorage.getItem("sellerToken");
      await axios.put(
        `http://localhost:5000/api/seller/orders/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success("Order status updated");
      fetchOrders();
    } catch (error) {
      message.error("Failed to update order status");
    }
  };

  const columns = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Total Price", dataIndex: "total", key: "total", render: (text) => `$${text}` },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status", 
      render: (status) => {
        let color = status === "Delivered" ? "green" : status === "Pending" ? "orange" : "blue";
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <>
          {record.status !== "Delivered" && (
            <Button type="primary" onClick={() => handleStatusUpdate(record.orderId, "Delivered")}>
              Mark as Delivered
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <Layout>
      <SellerSidebar />
      <Content style={{ padding: "20px" }}>
        <h2>Manage Orders</h2>
        <Table columns={columns} dataSource={orders} rowKey="orderId" />
      </Content>
    </Layout>
  );
};

export default ManageOrders;