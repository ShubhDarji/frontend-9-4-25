import React, { useState, useEffect } from "react";
import { Layout, Card, Statistic, Table, Button, message } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";
import SellerSidebar from "../../components/seller/SellerSidebar";
import axios from "axios";

const { Content } = Layout;

const Earnings = () => {
  const [earnings, setEarnings] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const token = localStorage.getItem("sellerToken");
      const { data } = await axios.get("http://localhost:5000/api/seller/earnings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEarnings(data.totalEarnings);
      setTransactions(data.transactions);
    } catch (error) {
      console.error("Error fetching earnings", error);
    }
  };

  const handleWithdraw = async () => {
    try {
      const token = localStorage.getItem("sellerToken");
      await axios.post(
        "http://localhost:5000/api/seller/withdraw",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success("Withdrawal request sent!");
      fetchEarnings();
    } catch (error) {
      message.error("Withdrawal failed");
    }
  };

  const columns = [
    { title: "Transaction ID", dataIndex: "transactionId", key: "transactionId" },
    { title: "Amount", dataIndex: "amount", key: "amount", render: (text) => `$${text}` },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return (
    <Layout>
      <SellerSidebar />
      <Content style={{ padding: "20px" }}>
        <h2>Earnings</h2>
        <Card style={{ marginBottom: "20px" }}>
          <Statistic title="Total Earnings" value={earnings} prefix={<DollarCircleOutlined />} />
          <Button type="primary" onClick={handleWithdraw} style={{ marginTop: "10px" }}>
            Withdraw Earnings
          </Button>
        </Card>

        <Table columns={columns} dataSource={transactions} rowKey="transactionId" />
      </Content>
    </Layout>
  );
};

export default Earnings;
