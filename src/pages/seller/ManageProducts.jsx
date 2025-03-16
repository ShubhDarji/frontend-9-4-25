import React, { useState, useEffect, useCallback } from "react";
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
  Steps,
  Upload,
  Image,
  Spin,
  Space
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SellerSidebar from "../../components/seller/SellerSidebar";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;

const STATUS_OPTIONS = ["Active", "Inactive"];

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [imageLoading, setImageLoading] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    productName: "",
    shortDesc: "",
    description: "",
    originalPrice: 0,
    returnPolicy: "",
    category: "",
    companyName: "",
    price: 0,
    stock: 0,
    status: "Active",
    primaryImage: null,
    secondaryImages: [], // ✅ Always initialized as an empty array
  });
  

  // ✅ Fetch products from backend (Optimized with useCallback)
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ Open Modal (For Add or Edit)
  const showModal = (product = null) => {
    setModalVisible(true);
    setCurrentStep(0);
    form.resetFields();
  
    if (product) {
      setEditingProductId(product._id);
      
      // ✅ Ensure only valid JSON values are set
      const cleanProduct = JSON.parse(JSON.stringify(product));
  
      form.setFieldsValue(cleanProduct);
      setProductData({
        ...cleanProduct,
        secondaryImages: cleanProduct.secondaryImages || [], 
      });
    } else {
      setEditingProductId(null);
      setProductData({
        productName: "",
        shortDesc: "",
        description: "",
        originalPrice: 0,
        returnPolicy: "",
        category: "",
        companyName: "",
        price: 0,
        stock: 0,
        status: "Active",
        primaryImage: null,
        secondaryImages: [], 
      });
    }
  };
  
  

  // ✅ Close Modal & Reset Form
  const closeModal = () => {
    setModalVisible(false);
    form.resetFields();
    setEditingProductId(null);
  };

  // ✅ Handle Image Upload
  const handleImageUpload = async ({ file }, type) => {
    const formData = new FormData();
    formData.append("images", file);

    try {
      setImageLoading(true);
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        const { filePaths } = response.data;
        message.success("Image uploaded successfully");

        setProductData((prev) => ({
          ...prev,
          [type === "primary" ? "primaryImage" : "secondaryImages"]:
            type === "primary" ? filePaths[0] : [...prev.secondaryImages, filePaths[0]],
        }));
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      message.error("Image upload failed. Please try again.");
    } finally {
      setImageLoading(false);
    }
  };

  // ✅ Handle Next Step
  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      message.error("Please fill all required fields before proceeding.");
    }
  };

  // ✅ Move to Previous Step
  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // ✅ Handle Add or Edit Product Submission
  const handleSubmit = async () => {
    try {
      if (!productData.primaryImage) {
        return message.error("Primary image is required.");
      }
      if (productData.secondaryImages.length < 3) {
        return message.error("At least 3 secondary images are required.");
      }
  
      // ✅ Ensure `productData` contains only valid JSON-serializable values
      const payload = JSON.parse(JSON.stringify({ 
        ...productData, 
        price: Number(productData.price), 
        stock: Number(productData.stock) 
      }));
  
      if (editingProductId) {
        await axios.put(`http://localhost:5000/api/products/${editingProductId}`, payload);
        message.success("Product updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/products/add", payload);
        message.success("Product added successfully!");
      }
  
      closeModal();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      message.error(error.response?.data?.message || "Failed to save product");
    }
  };
  

  // ✅ Handle Status Change
  const handleStatusChange = async (productId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${productId}`, { status: newStatus });
      message.success("Product status updated!");
      setProducts(products.map(product => product._id === productId ? { ...product, status: newStatus } : product));
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update product status.");
    }
  };

  // ✅ Steps Configuration (Fixed `steps` Not Defined Error)
// ✅ Steps Configuration (Now Matches `productSchema`)
const steps = [
    {
      title: "Basic Details",
      content: (
        <Form form={form} layout="vertical">
<Form.Item name="productName" label="Product Name" rules={[{ required: true }]}>
  <Input onChange={(e) => setProductData(prev => ({ ...prev, productName: e.target.value }))} />
</Form.Item>

          <Form.Item name="shortDesc" label="Short Description" rules={[{ required: true, message: "Short description is required!" }]}>
            <Input onChange={(e) => setProductData({ ...productData, shortDesc: e.target.value })} />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
  <Input.TextArea onChange={(e) => setProductData(prev => ({ ...prev, description: e.target.value }))} />
</Form.Item>

          <Form.Item name="returnPolicy" label="Return Policy" rules={[{ required: true, message: "Return policy is required!" }]}>
            <Input.TextArea rows={2} onChange={(e) => setProductData({ ...productData, returnPolicy: e.target.value })} />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input onChange={(e) => setProductData({ ...productData, category: e.target.value })} />
          </Form.Item>
          <Form.Item name="companyName" label="Company Name" rules={[{ required: true }]}>
            <Input onChange={(e) => setProductData({ ...productData, companyName: e.target.value })} />
          </Form.Item>
          <Form.Item name="originalPrice" label="Original Price" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} onChange={(value) => setProductData({ ...productData, originalPrice: value })} />
          </Form.Item>
          <Form.Item name="price" label="Sale Price" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} onChange={(value) => setProductData({ ...productData, price: value })} />
          </Form.Item>
          <Form.Item name="stock" label="Stock Quantity" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} onChange={(value) => setProductData({ ...productData, stock: value })} />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Images",
      content: (
        <div>
          <Text strong>Primary Image (Required)</Text>
          <Upload
            customRequest={(info) => handleImageUpload(info, "primary")}
            listType="picture-card"
            showUploadList={false}
          >
            {imageLoading ? <Spin /> : (productData.primaryImage ? <Image src={productData.primaryImage} width={100} /> : <Button icon={<UploadOutlined />}>Upload</Button>)}
          </Upload>
          {productData.primaryImage && (
            <Image src={productData.primaryImage} width={100} style={{ display: "block", marginTop: 10 }} />
          )}
  
          <Text strong>Secondary Images (Minimum 3 Required)</Text>
          <Upload
            customRequest={(info) => handleImageUpload(info, "secondary")}
            listType="picture-card"
            multiple
            showUploadList
          >
            {productData.secondaryImages.length < 3 ? <Button icon={<UploadOutlined />}>Upload</Button> : null}
          </Upload>
          {productData.secondaryImages?.length > 0 && (
  <div style={{ marginTop: 10 }}>
    {productData.secondaryImages.map((img, index) => (
      <Image key={index} src={img} width={80} style={{ marginRight: 10 }} />
    ))}
  </div>
)}

        </div>
      ),
    },
  ];
  
  const columns = [
    { title: "Product Name", dataIndex: "productName", key: "productName" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Price", dataIndex: "price", key: "price", render: (text) => `$${text}` },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          value={text}
          style={{ width: 100 }}
          onChange={(value) => handleStatusChange(record._id, value)}
        >
          {STATUS_OPTIONS.map(status => (
            <Option key={status} value={status}>{status}</Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showModal(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];
  

  return (
    <Layout>
      <SellerSidebar />
      <Content>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Add Product</Button>
        <Table columns={columns} dataSource={products} rowKey="_id" loading={loading} pagination={{ pageSize: 5 }} />
        <Modal open={modalVisible} onCancel={closeModal} footer={null} width={700}>
          <Steps current={currentStep}>{steps.map((step) => <Step key={step.title} title={step.title} />)}</Steps>
          <div>{steps[currentStep].content}</div>
          <div>
            {currentStep > 0 && <Button onClick={handlePrev}>Back</Button>}
            <Button type="primary" onClick={currentStep < steps.length - 1 ? handleNext : handleSubmit}>
              {currentStep < steps.length - 1 ? "Next" : "Submit"}
            </Button>
          </div>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ManageProducts;