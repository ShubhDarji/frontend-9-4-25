import React, { useState, useEffect } from "react";
import { Table, Tag, Select, message } from "antd";
import axios from "axios";
import Sidebar from "./sidebar";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!adminToken) {
      message.error("Unauthorized. Please log in as admin.");
      return;
    }
    fetchOrders();
  }, []);

  // ✅ Fetch Orders for Admin
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/orders/admin", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      message.error(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  // ✅ Update Order Status
  const updateStatus = async (id, status, paymentStatus) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      message.success("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      message.error(error.response?.data?.message || "Failed to update order status");
    }
  };
  
  

  return (<>
    <Sidebar/>
    <Table
      dataSource={orders}
      rowKey="_id"
      columns={[
        { title: "Order ID", dataIndex: "_id" },
        { title: "Customer", dataIndex: "user", render: (user) => user?.name || "Unknown" },
        { title: "Total Amount", dataIndex: "totalAmount", render: (total) => `$${total}` },
        {
          title: "Status",
          dataIndex: "overallStatus",
          render: (overallStatus, record) => (
            <Select
              defaultValue={overallStatus}
              onChange={(value) => updateStatus(record._id, value)}
            >
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Shipped">Shipped</Select.Option>
              <Select.Option value="Delivered">Delivered</Select.Option>
              <Select.Option value="Cancelled">Cancelled</Select.Option>
            </Select>
          ),
        },
        {
          title: "Payment Status",
          dataIndex: "paymentStatus",
          render: (paymentStatus) =>
            paymentStatus === "Paid" ? <Tag color="green">Paid</Tag> : <Tag color="red">Pending</Tag>,
        },
      ]}
    /></>
  );
};

export default Orders;
