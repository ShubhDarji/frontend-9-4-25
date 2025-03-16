import React from "react";
import { Form, Input, Button, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellerLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/seller/login", values);
      localStorage.setItem("sellerToken", data.token);
      message.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/seller/dashboard"), 1500);
    } catch (error) {
      message.error(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <Card style={{ maxWidth: 500, margin: "auto", textAlign: "center" }}>
      <h2>Seller Login</h2>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Enter Email" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password placeholder="Enter Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default SellerLogin;
