import React, { useState } from "react";
import { Table, Tag, Button, message } from "antd";
import { dummyOrders } from "../../data/dummyData";

const OrderTable = () => {
  const [orders, setOrders] = useState(dummyOrders);

  const updateOrderStatus = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: "Shipped" } : order
      )
    );
    message.success(`Order ${id} marked as shipped!`);
  };

  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Total", dataIndex: "total", key: "total", render: (text) => `$${text}` },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Pending" ? "orange" : "green"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Button type="primary" onClick={() => updateOrderStatus(record.id)}>
          Mark as Shipped
        </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={orders} rowKey="id" />;
};

export default OrderTable;
//71