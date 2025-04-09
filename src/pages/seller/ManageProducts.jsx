import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Button,
  Select,
  Modal,
  message,
  Input,
  Form,
  InputNumber,
  Typography,
  Upload,
  Image,
  Space,
} from "antd";
import { Switch } from "antd";
import SellerSidebar from "../../components/seller/SellerSidebar";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const STATUS_OPTIONS = ["Active", "Inactive"];
const API_BASE_URL = "http://localhost:5000/api/products";

const ManageProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productData, setProductData] = useState({
    primaryImage: null,
    primaryImagePreview: "",
    secondaryImages: [],
    secondaryImagePreviews: [],
  });

  const [form] = Form.useForm();

  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("sellerToken");
      const { data } = await axios.get(`${API_BASE_URL}/seller`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(data);
    } catch (error) {
      console.error("Fetch Error:", error);
      message.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Cleanup for image URLs
  useEffect(() => {
    return () => {
      if (productData.primaryImagePreview) {
        URL.revokeObjectURL(productData.primaryImagePreview);
      }
      productData.secondaryImagePreviews.forEach((url) =>
        URL.revokeObjectURL(url)
      );
    };
  }, [productData]);
  const handleStatusToggle = async (productId, isActive) => {
    try {
      const token = localStorage.getItem("sellerToken");
      await axios.put(
        `${API_BASE_URL}/status/${productId}`,
        { status: isActive ? "Active" : "Inactive" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success("Product status updated successfully!");
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Status Toggle Error:", error);
      message.error(error?.response?.data?.message || "Failed to update status.");
    }
  };
  

  // ✅ Open Modal for Add/Edit
  const showModal = async (product = null) => {
    setModalVisible(true);
    form.resetFields();

    if (product) {
      setEditingProductId(product._id);
      try {
        const token = localStorage.getItem("sellerToken");
        const { data } = await axios.get(`${API_BASE_URL}/${product._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProductData({
          primaryImagePreview: data.primaryImage,
          secondaryImagePreviews: data.secondaryImages || [],
        });

        form.setFieldsValue(data);
      } catch (error) {
        console.error("Fetch Product Error:", error);
        message.error("Failed to fetch product data.");
      }
    } else {
      setEditingProductId(null);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    form.resetFields();
    setProductData({
      primaryImage: null,
      primaryImagePreview: "",
      secondaryImages: [],
      secondaryImagePreviews: [],
    });
  };

  // ✅ Validate Image Files
  const validateFile = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJpgOrPng) {
      message.error("Only JPG/PNG images are allowed!");
      return false;
    }
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }
    return true;
  };

  // ✅ Handle Primary Image Upload
  const handlePrimaryImageUpload = ({ file }) => {
    if (validateFile(file)) {
      setProductData((prev) => ({
        ...prev,
        primaryImage: file,
        primaryImagePreview: URL.createObjectURL(file),
      }));
    }
  };

  // ✅ Handle Secondary Image Upload
  const handleSecondaryImageUpload = ({ file }) => {
    if (validateFile(file)) {
      setProductData((prev) => ({
        ...prev,
        secondaryImages: [...prev.secondaryImages, file],
        secondaryImagePreviews: [
          ...prev.secondaryImagePreviews,
          URL.createObjectURL(file),
        ],
      }));
    }
  };

  // ✅ Form Submission
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const sellerId = localStorage.getItem("sellerId");
      const token = localStorage.getItem("sellerToken");
  
      if (!sellerId || !token) {
        message.error("Unauthorized. Please login again.");
        return;
      }
  
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      if (productData.primaryImage) {
        formData.append("primaryImage", productData.primaryImage);
      }
  
    // Ensure secondaryImages is always an array
(productData.secondaryImages || []).forEach((file) =>
  formData.append("secondaryImages", file)
);

  
      formData.append("sellerId", sellerId);
  
      const url = editingProductId
        ? `${API_BASE_URL}/update/${editingProductId}`
        : `${API_BASE_URL}/add`;
  
      const method = editingProductId ? "put" : "post";
  
      await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      message.success(editingProductId ? "Product updated!" : "Product added!");
      fetchProducts();
      closeModal();
    } catch (error) {
      console.error("Error:", error);
      message.error(error?.response?.data?.message || "Failed to submit.");
    }
  };
  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("sellerToken");
      await axios.delete(`${API_BASE_URL}/delete/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      message.success("Product deleted successfully!");
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Delete Error:", error);
      message.error(error?.response?.data?.message || "Failed to delete product.");
    }
  };
  
  

  // ✅ Table Columns
  const columns = [
    { title: "Name", dataIndex: "productName", key: "productName" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Company Name", dataIndex: "companyName", key: "companyName" },
    { title: "Original Price", dataIndex: "originalPrice", key: "originalPrice" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch
          checked={status === "Active"}
          onChange={(checked) => handleStatusToggle(record._id, checked)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    
    

    <Layout>
      <SellerSidebar />
          
      <Content>
        <Button type="primary" onClick={() => showModal()} icon={<PlusOutlined />}>
          Add Product
        </Button>
        <Table
          dataSource={products}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />

        {/* ✅ Modal Form */}
        <Modal
          open={modalVisible}
          title={editingProductId ? "Edit Product" : "Add Product"}
          onCancel={closeModal}
          onOk={handleSubmit}
        >
          <Form form={form} layout="vertical">
            <Form.Item label="Product Name" name="productName" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Category" name="category" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Company Name" name="companyName">
              <Input />
            </Form.Item>
            <Form.Item label="Original Price" name="originalPrice">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Price" name="price">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Stock" name="stock">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Specifications" name="specifications">
  <TextArea rows={3} placeholder="Enter detailed product specifications" />
</Form.Item>

<Form.Item label="Shipping Policy" name="shippingPolicy">
  <TextArea rows={2} placeholder="Enter shipping info like delivery time, charges, etc." />
</Form.Item>

<Form.Item label="Return Policy" name="returnPolicy">
  <TextArea rows={2} placeholder="Mention return window, condition, etc." />
</Form.Item>
            <Form.Item label="Status" name="status">
              <Select>
                {STATUS_OPTIONS.map((status) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            </Form.Item>
              {/* ✅ Primary Image Upload */}
              <Form.Item label="Primary Image">
              <Upload
                accept="image/*"
                showUploadList={false}
                customRequest={handlePrimaryImageUpload}
              >
                <Button icon={<UploadOutlined />}>Upload Primary Image</Button>
              </Upload>
              {productData.primaryImagePreview && (
                <Image
                  src={productData.primaryImagePreview}
                  width={150}
                  style={{ marginTop: 10 }}
                />
              )}
            </Form.Item>

            {/* ✅ Secondary Image Upload */}
            <Form.Item label="Secondary Images">
              <Upload
                accept="image/*"
                showUploadList={false}
                customRequest={handleSecondaryImageUpload}
              >
                <Button icon={<UploadOutlined />}>Upload Secondary Images</Button>
              </Upload>
              <Space>
                {productData.secondaryImagePreviews.map((src, index) => (
                  <Image key={index} src={src} width={100} />
                ))}
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ManageProducts;
