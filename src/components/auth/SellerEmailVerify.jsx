import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SellerEmailVerify = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const onFinish = async ({ code }) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/verify-code", { email, code });

      message.success("Email verified successfully! You can now log in.");
      navigate("/seller/login");
    } catch (error) {
      message.error(error.response?.data?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return <p style={{ textAlign: "center" }}>No email provided for verification.</p>;
  }

  return (
    <Card style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Email Verification</h2>
      <p>We’ve sent a 6-digit code to <strong>{email}</strong></p>

      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="code"
          label="Verification Code"
          rules={[{ required: true, message: "Enter the 6-digit code" }]}
        >
          <Input placeholder="e.g. 123456" maxLength={6} />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Verify Email
        </Button>
      </Form>
    </Card>
  );
};

export default SellerEmailVerify;