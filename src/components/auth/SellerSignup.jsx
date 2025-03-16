import React from "react";
import { Form, Input, Button, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellerSignup = () => {
  const navigate = useNavigate();

  const handleSignup = async (values) => {
    try {
      await axios.post("http://localhost:5000/api/seller/register", values);
      message.success("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/seller/login"), 2000);
    } catch (error) {
      message.error(error.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <Card style={{ maxWidth: 500, margin: "auto", textAlign: "center" }}>
      <h2>Seller Signup</h2>
      <Form layout="vertical" onFinish={handleSignup}>
        <Form.Item name="businessName" label="Business Name" rules={[{ required: true }]}>
          <Input placeholder="Enter Business Name" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Enter Email" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password placeholder="Enter Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Signup
        </Button>
      </Form>
    </Card>
  );
};

export default SellerSignup;
