import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css"; // Import updated CSS

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Signup Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone || "", // Ensure phone is included
      dob: formData.dob || "",
      gender: formData.gender || "",
      address: formData.address || "",
    };
  
    console.log("Sending signup data:", userData); // Debugging step
  
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", userData);
      sessionStorage.setItem("user", JSON.stringify(res.data));
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create an Account 🚀</h2>
        <p className="subtext">Join us and explore amazing deals</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;