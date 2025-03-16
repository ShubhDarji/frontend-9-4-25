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
      const { data } = await axios.post("http://localhost:5000/api/admin/login", values);
      localStorage.setItem("adminToken", data.token);
      message.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/admin-dashboard"), 1500);
    } catch (error) {
      message.error(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <Title level={3}>Admin Login</Title>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default Login;
