import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { toast } from "react-toastify";

const categories = ["Accessories", "Electronics", "Clothing", "Home & Kitchen"];

const ProductForm = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "",
    companyName: "",
    originalPrice: "",
    price: "",
    stock: "",
    returnPolicy: "",
    primaryImage: null,
    secondaryImages: [],
  });

  const [primaryPreview, setPrimaryPreview] = useState(null);
  const [secondaryPreviews, setSecondaryPreviews] = useState([]);

  // ✅ Initialize Data for Edit Mode
  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        primaryImage: null,
        secondaryImages: [],
      });
      setPrimaryPreview(product.primaryImage);
      setSecondaryPreviews(product.secondaryImages || []);
    }
  }, [product]);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Image Uploads
  const handlePrimaryImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, primaryImage: file }));
      setPrimaryPreview(URL.createObjectURL(file));
    }
  };

  const handleSecondaryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.error("You can upload up to 3 secondary images.");
      return;
    }
    setFormData((prev) => ({ ...prev, secondaryImages: files }));
    setSecondaryPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // ✅ Handle Form Submission (Add / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "secondaryImages") {
          value.forEach((file) => formDataToSend.append("secondaryImages", file));
        } else if (value) {
          formDataToSend.append(key, value);
        }
      });

      // ✅ API Call for Add or Edit
      if (product) {
        await axios.put(`http://localhost:5000/api/products/${product._id}`, formDataToSend, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Product updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/products", formDataToSend, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Product added successfully!");
      }
      onClose(); // Close modal
    } catch (error) {
      console.error("Error submitting product:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to submit product.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{product ? "Edit Product" : "Add Product"}</h2>

      {/* ✅ Product Name */}
      <TextField
        label="Product Name"
        name="productName"
        value={formData.productName}
        onChange={handleChange}
        required
      />

      {/* ✅ Description */}
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        required
      />

      {/* ✅ Category Dropdown */}
      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select name="category" value={formData.category} onChange={handleChange} required>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* ✅ Company Name */}
      <TextField
        label="Company Name"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        required
      />

      {/* ✅ Pricing and Stock */}
      <TextField
        label="Original Price"
        name="originalPrice"
        value={formData.originalPrice}
        onChange={handleChange}
        type="number"
        required
      />
      <TextField
        label="Selling Price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        type="number"
        required
      />
      <TextField
        label="Stock"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        type="number"
        required
      />

      {/* ✅ Return Policy */}
      <TextField
        label="Return Policy"
        name="returnPolicy"
        value={formData.returnPolicy}
        onChange={handleChange}
      />

      {/* ✅ Primary Image Upload */}
      <label>Primary Image</label>
      <input type="file" accept="image/*" onChange={handlePrimaryImageChange} />
      {primaryPreview && <img src={primaryPreview} alt="Primary Preview" width="100" />}

      {/* ✅ Secondary Images Upload */}
      <label>Secondary Images (Up to 3)</label>
      <input type="file" accept="image/*" multiple onChange={handleSecondaryImagesChange} />
      <div>
        {secondaryPreviews.map((preview, index) => (
          <img key={index} src={preview} alt={`Secondary Preview ${index}`} width="100" />
        ))}
      </div>

      {/* ✅ Submit Button */}
      <Button type="submit" variant="contained">
        {product ? "Update Product" : "Add Product"}
      </Button>
    </form>
  );
};

export default ProductForm;
