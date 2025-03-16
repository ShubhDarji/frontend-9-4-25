import React, { useState } from "react";
import { Form, Input, Button, Upload, message, Typography, Row, Col, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const SellerRegister = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [proofFile, setProofFile] = useState(null);
  const navigate = useNavigate();

  // Handle file upload
  const handleFileChange = ({ file }) => {
    setProofFile(file);
  };
  const API_URL = process.env.REACT_APP_API_URL;
  // Handle form submission
  const handleSubmit = async (values) => {
    setLoading(true);
  
    if (!proofFile) {
      message.error("Please upload a proof document.");
      setLoading(false);
      return;
    }
  
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      formData.append("proof", proofFile);
  
      const { data } = await api.post("/seller/register", formData);
  
      message.success("Registration successful! Redirecting to login...");
  
      setTimeout(() => {
        navigate("/seller/login");
      }, 2000);
    } catch (error) {
      message.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" style={{ minHeight: "100vh", alignItems: "center", backgroundColor: "#f5f5f5" }}>
      <Col xs={24} sm={18} md={14} lg={10}>
        <Card style={{ padding: "20px", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>Seller Registration</Title>

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Name is required" }]}>
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Valid email required" }]}>
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: "Phone number is required" }]}>
              <Input placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item name="businessName" label="Business Name" rules={[{ required: true, message: "Business name is required" }]}>
              <Input placeholder="Enter your business name" />
            </Form.Item>

            <Form.Item name="gstNumber" label="GST Number" rules={[{ required: true, message: "GST number is required" }]}>
              <Input placeholder="Enter your GST number" />
            </Form.Item>

            <Form.Item name="address" label="Business Address" rules={[{ required: true, message: "Address is required" }]}>
              <Input.TextArea rows={2} placeholder="Enter your business address" />
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{ required: true, message: "Password is required" }]}>
              <Input.Password placeholder="Enter a secure password" />
            </Form.Item>

            <Form.Item label="Upload Proof Document">
              <Upload beforeUpload={() => false} onChange={handleFileChange} maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Register & Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SellerRegister;
