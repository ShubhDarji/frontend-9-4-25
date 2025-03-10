import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("📡 Sending signup request:", formData);

      const res = await axios.post("http://localhost:5000/api/admin/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });

      alert(res.data.message);
      navigate("/admin-login"); // ✅ Redirect to login after signup
    } catch (err) {
      console.error("❌ Signup error:", err.response?.data);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="admin-signup-container">
      <h2>Admin Signup</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default AdminSignup;
