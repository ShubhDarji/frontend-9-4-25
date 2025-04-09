import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellerSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({});

  const steps = [
    {
      title: "Personal Details",
      content: (
        <>
          <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Name is required!" }]}>
            <Input placeholder="Enter Full Name" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Valid email required!" }]}>
            <Input placeholder="Enter Email" />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: "Phone number is required!" }]}>
            <Input placeholder="Enter Phone Number" />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Business Details",
      content: (
        <>
          <Form.Item name="businessName" label="Business Name" rules={[{ required: true, message: "Business Name is required!" }]}>
            <Input placeholder="Enter Business Name" />
          </Form.Item>
          <Form.Item name="gstNumber" label="GST Number" rules={[{ required: true, message: "GST Number is required!" }]}>
            <Input placeholder="Enter GST Number" />
          </Form.Item>
          <Form.Item name="address" label="Business Address" rules={[{ required: true, message: "Address is required!" }]}>
            <Input placeholder="Enter Business Address" />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Security",
      content: (
        <>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Password is required!" }]}>
            <Input.Password placeholder="Enter Password" />
          </Form.Item>
        </>
      ),
    },
  ];

  const handleNext = async (values) => {
    setFormValues((prev) => ({ ...prev, ...values }));
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (values) => {
    const finalData = { ...formValues, ...values };
  
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/signup", finalData, {
        withCredentials: true,
      });
  
      message.success("Signup successful! Verification code sent to email.");
      setTimeout(() => navigate("/seller/verify", { state: { email: finalData.email } }), 1000);
  
    } catch (error) {
      message.error(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Card style={{ maxWidth: 500, margin: "auto", textAlign: "center" }}>
      <h2>Seller Signup - {steps[currentStep].title}</h2>
      
      <Form
  layout="vertical"
  initialValues={formValues}
  onFinish={currentStep === steps.length - 1 ? handleSubmit : handleNext}
  scrollToFirstError
>
        {steps[currentStep].content}

        <div style={{ marginTop: 20 }}>
          {currentStep > 0 && (
            <Button style={{ marginRight: 8 }} onClick={handlePrevious}>
              Previous
            </Button>
          )}
          <Button type="primary" htmlType="submit" loading={loading}>
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default SellerSignup;
