import React, { useState } from "react";
import { Form, Input, Button, message, Card, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      // ✅ API Call for Admin Login
      const { data } = await axios.post("http://localhost:5000/api/admin/login", values);

      // ✅ Token Storage
      localStorage.setItem("adminToken", data.token);

      // ✅ Success Message
      message.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/admin-dashboard"), 1500);
    } catch (error) {
      // ✅ Error Handling with Fallback
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <Title level={3}>Admin Login</Title>
      <Form layout="vertical" onFinish={handleLogin}>
        {/* ✅ Email Input */}
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter your admin email" />
        </Form.Item>

        {/* ✅ Password Input */}
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        {/* ✅ Submit Button */}
        <Button type="primary" htmlType="submit" loading={loading} block>
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default Login;
