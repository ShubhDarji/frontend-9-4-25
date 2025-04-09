import React from "react";
import { Form, Input, Button, message, Card, Typography } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;

const SellerLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", values);
      const { token, seller } = data;

      // Validate response structure
      if (!token || !seller || !seller._id) {
        throw new Error("Invalid login response");
      }

      // Check email verification
      if (!seller.isVerified) {
        message.warning("Email not verified. Redirecting to verification page...");
        return navigate("/seller/verify", { state: { email: seller.email } });
      }

      // Save token and user ID
      localStorage.setItem("sellerToken", token);
      localStorage.setItem("sellerId", seller._id);

      message.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/seller/dashboard"), 1500);
    } catch (error) {
      console.error("Login Error:", error);
      message.error(error?.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <Card style={{ maxWidth: 500, margin: "auto", textAlign: "center", marginTop: "100px" }}>
      <Title level={2}>Seller Login</Title>

      <Form layout="vertical" onFinish={handleLogin} scrollToFirstError>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Password is required!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form>

      <Text>
        Don’t have an account? <Link to="/seller/signup">Sign up here</Link>
      </Text>
    </Card>
  );
};

export default SellerLogin;