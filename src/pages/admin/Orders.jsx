import React, { useState, useEffect } from "react";
import { Table, Tag, Select, message } from "antd";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get("http://localhost:5000/api/admin/orders");
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/order/${id}`, { status });
      setOrders(orders.map(order => (order._id === id ? { ...order, status } : order)));
      message.success("Order status updated");
    } catch (error) {
      message.error("Failed to update order");
    }
  };

  return (
    <Table
      dataSource={orders}
      columns={[
        { title: "Order ID", dataIndex: "_id" },
        { title: "Customer", dataIndex: "customer" },
        { title: "Total", dataIndex: "total", render: text => `$${text}` },
        {
          title: "Status",
          dataIndex: "status",
          render: (status, record) => (
            <Select defaultValue={status} onChange={value => updateStatus(record._id, value)}>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Shipped">Shipped</Select.Option>
              <Select.Option value="Delivered">Delivered</Select.Option>
            </Select>
          ),
        },
      ]}
    />
  );
};

export default Orders;
