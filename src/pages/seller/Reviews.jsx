import React, { useState, useEffect } from "react";
import { Layout, Table, Button, message, Rate } from "antd";
import SellerSidebar from "../../components/seller/SellerSidebar";
import axios from "axios";

const { Content } = Layout;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("sellerToken");
      const { data } = await axios.get("http://localhost:5000/api/seller/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  const handleApprove = async (reviewId) => {
    try {
      const token = localStorage.getItem("sellerToken");
      await axios.put(
        `http://localhost:5000/api/seller/reviews/${reviewId}`,
        { status: "Approved" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success("Review approved");
      fetchReviews();
    } catch (error) {
      message.error("Failed to approve review");
    }
  };

  const columns = [
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Product", dataIndex: "product", key: "product" },
    { title: "Rating", dataIndex: "rating", key: "rating", render: (rating) => <Rate value={rating} disabled /> },
    { title: "Review", dataIndex: "review", key: "review" },
    { 
      title: "Actions", 
      key: "actions", 
      render: (record) => (
        <Button type="primary" onClick={() => handleApprove(record.id)}>Approve</Button>
      ),
    },
  ];

  return (
    <Layout>
      <SellerSidebar />
      <Content style={{ padding: "20px" }}>
        <h2>Customer Reviews</h2>
        <Table columns={columns} dataSource={reviews} rowKey="id" />
      </Content>
    </Layout>
  );
};

export default Reviews;
