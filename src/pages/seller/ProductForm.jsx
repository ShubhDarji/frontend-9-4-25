import React from "react";
import { Form, Input, InputNumber, Upload, Button, Typography, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const ProductForm = ({ form, productData, handlePrimaryImageUpload, handleSecondaryImageUpload }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={productData}
    >
      {/* Product Details */}
      <Form.Item name="productName" label="Product Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="shortDesc" label="Short Description" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Description" rules={[{ required: true }]}>
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="companyName" label="Company Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      {/* Pricing */}
      <Form.Item name="originalPrice" label="Original Price" rules={[{ required: true }]}>
        <InputNumber style={{ width: "100%" }} min={0} />
      </Form.Item>

      <Form.Item name="price" label="Sale Price" rules={[{ required: true }]}>
        <InputNumber style={{ width: "100%" }} min={0} />
      </Form.Item>

      <Form.Item name="stock" label="Stock Quantity" rules={[{ required: true }]}>
        <InputNumber style={{ width: "100%" }} min={0} />
      </Form.Item>

      {/* Return Policy */}
      <Form.Item name="returnPolicy" label="Return Policy">
        <TextArea rows={2} />
      </Form.Item>

      {/* Image Upload */}
      <Form.Item label="Primary Image" required>
        <Upload beforeUpload={() => false} onChange={handlePrimaryImageUpload} showUploadList={false}>
          {productData.primaryImagePreview ? (
            <img src={productData.primaryImagePreview} alt="primary" style={{ width: 100 }} />
          ) : (
            <Button icon={<UploadOutlined />}>Upload Primary Image</Button>
          )}
        </Upload>
      </Form.Item>

      <Form.Item label="Secondary Images" required>
        <Upload multiple beforeUpload={() => false} onChange={handleSecondaryImageUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Upload Secondary Images</Button>
        </Upload>
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          {productData.secondaryImagePreviews?.map((preview, index) => (
            <img key={index} src={preview} alt={`secondary-${index}`} style={{ width: 80, height: 80, objectFit: 'cover' }} />
          ))}
        </div>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
