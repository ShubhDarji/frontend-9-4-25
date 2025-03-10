import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./SellerRegistration.css";

// ✅ Validation Schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Full Name is required").min(3, "Name is too short"),
  email: yup.string().required("Email is required").email("Invalid email format"),
  phone: yup.string().required("Phone number is required").matches(/^\d{10,15}$/, "Invalid phone number"),
  businessName: yup.string().required("Business name is required"),
  gstNumber: yup.string().required("GST/Business License Number is required"),
  address: yup.string().required("Business address is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  proof: yup
    .mixed()
    .required("Business proof document is required")
    .test("fileType", "Only PDF, JPG, PNG files are allowed", (value) => {
      return value && ["application/pdf", "image/jpeg", "image/png"].includes(value.type);
    }),
});

const SellerRegisration = () => {
  const [step, setStep] = useState(1);
  const [previewURL, setPreviewURL] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onBlur" });

  // ✅ Handle File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("proof", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewURL(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle Address Auto-Complete (Debounced API Calls)
  const handleAddressChange = async (e) => {
    const value = e.target.value;
    setValue("address", value);
    if (value.length > 2) {
      try {
        const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
        if (res.data.length > 0) {
          setValue("address", res.data[0].display_name);
        }
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
      }
    }
  };

  // ✅ Submit Form
  const onSubmit = async (data) => {
    setErrorMessage("");
  
    // ✅ Prepare form data
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("businessName", data.businessName);
    formData.append("gstNumber", data.gstNumber);
    formData.append("address", data.address);
    formData.append("password", data.password);
    formData.append("proof", data.proof); // ✅ Fix file upload issue
  
    try {
      // ✅ Send request to Seller Registration API
      const res = await axios.post("http://localhost:5000/api/sellers/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (res.status === 201) {
        alert("Registration successful! Please log in after approval.");
        navigate("/seller-login");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };
  

  return (
    <div className="seller-registration-container">
      <h2>Become a Seller</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div>
            <h3>Step 1: Personal Information</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" {...register("name")} />
              <p className="error-message">{errors.name?.message}</p>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" {...register("email")} />
              <p className="error-message">{errors.email?.message}</p>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" {...register("phone")} />
              <p className="error-message">{errors.phone?.message}</p>
            </div>
            <button type="button" onClick={() => setStep(2)}>Next</button>
          </div>
        )}

        {/* Step 2: Business Details */}
        {step === 2 && (
          <div>
            <h3>Step 2: Business Details</h3>
            <div className="form-group">
              <label>Business Name</label>
              <input type="text" {...register("businessName")} />
              <p className="error-message">{errors.businessName?.message}</p>
            </div>
            <div className="form-group">
              <label>GST / Business License Number</label>
              <input type="text" {...register("gstNumber")} />
              <p className="error-message">{errors.gstNumber?.message}</p>
            </div>
            <div className="form-group">
              <label>Business Address</label>
              <input type="text" {...register("address")} onChange={handleAddressChange} />
              <p className="error-message">{errors.address?.message}</p>
            </div>
            <button type="button" onClick={() => setStep(1)}>Back</button>
            <button type="button" onClick={() => setStep(3)}>Next</button>
          </div>
        )}

        {/* Step 3: Upload Documents */}
        {step === 3 && (
          <div>
            <h3>Step 3: Upload Documents</h3>
            <div className="form-group">
              <label>Password</label>
              <input type="password" {...register("password")} />
              <p className="error-message">{errors.password?.message}</p>
            </div>
            <div className="form-group">
              <label>Upload Proof of Business (PDF, JPG, PNG)</label>
              <input type="file" accept=".pdf,.jpg,.png" onChange={handleFileChange} />
              {previewURL && <img src={previewURL} alt="Preview" className="file-preview" />}
              <p className="error-message">{errors.proof?.message}</p>
            </div>
            <button type="button" onClick={() => setStep(2)}>Back</button>
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SellerRegisration;
