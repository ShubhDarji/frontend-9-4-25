import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Select, Upload, message, Modal } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;
const { confirm } = Modal;

const AddEditProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { productId } = useParams(); // Used for editing existing products
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [stock, setStock] = useState(0);
  const [status, setStatus] = useState("Active");

  // Fetch product details if editing
  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
      form.setFieldsValue({ ...data, stock: data.stock || 0 });
      setImageUrls(data.additionalImages || []);
      setStock(data.stock || 0);
      setStatus(data.status || "Active");
    } catch (error) {
      message.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const productData = { ...values, additionalImages: imageUrls, stock, status };

      if (productId) {
        await axios.put(`/api/products/${productId}`, productData);
        message.success("Product updated successfully!");
      } else {
        await axios.post("/api/products", productData);
        message.success("Product added successfully!");
      }
      navigate("/seller/manage-products");
    } catch (error) {
      message.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  // Handle image uploads (Mock Implementation)
  const handleImageUpload = ({ fileList }) => {
    const uploadedUrls = fileList.map((file) => file.url || URL.createObjectURL(file.originFileObj));
    setImageUrls(uploadedUrls);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>{productId ? "Edit Product" : "Add New Product"}</h2>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ status: "Active" }}>
        
        {/* Basic Details */}
        <Form.Item name="productName" label="Product Name" rules={[{ required: true, message: "Please enter product name" }]}>
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item name="category" label="Category" rules={[{ required: true, message: "Please select a category" }]}>
          <Select placeholder="Select category">
            <Option value="Fridge">Fridge</Option>
            <Option value="Mobile">Mobile</Option>
            <Option value="Laptop">Laptop</Option>
          </Select>
        </Form.Item>

        <Form.Item name="companyName" label="Company Name" rules={[{ required: true, message: "Enter company name" }]}>
          <Input placeholder="Company name" />
        </Form.Item>

        {/* Pricing */}
        <Form.Item name="price" label="Price ($)" rules={[{ required: true, message: "Enter product price" }]}>
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="originalPrice" label="Original Price ($)">
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        {/* Description */}
        <Form.Item name="shortDesc" label="Short Description">
          <Input.TextArea rows={2} placeholder="Enter short product description" />
        </Form.Item>

        <Form.Item name="description" label="Full Description">
          <Input.TextArea rows={4} placeholder="Enter full product details" />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item label="Product Images">
          <Upload listType="picture-card" multiple onChange={handleImageUpload} beforeUpload={() => false}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        {/* Specifications */}
        <Form.Item name="specifications" label="Product Specifications">
          <Input.TextArea rows={3} placeholder="Enter key product specifications" />
        </Form.Item>

        {/* Return Policy */}
        <Form.Item name="returnPolicy" label="Return Policy">
          <Input.TextArea rows={2} placeholder="Return policy details" />
        </Form.Item>

        {/* Stock Management */}
        <Form.Item label="Stock Available">
          <InputNumber min={0} value={stock} onChange={setStock} style={{ width: "100%" }} />
        </Form.Item>

        {/* Status */}
        <Form.Item label="Product Status">
          <Select value={status} onChange={setStatus} style={{ width: "100%" }}>
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {productId ? "Update Product" : "Add Product"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEditProduct;
