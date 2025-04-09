import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath !== "/login" && currentPath !== "/signup") {
      localStorage.setItem("lastVisitedPage", currentPath);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Step 1: Login Request
      const response = await axios.post("http://localhost:5000/api/auth/user/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      if (!token || !user) {
        throw new Error("Invalid response. Please try again.");
      }

      // Step 2: Save token separately
      localStorage.setItem("token", token);

      // Step 3: Fetch full user profile
      const profileRes = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const profileData = profileRes.data;

      // Step 4: Save complete profile + token
      localStorage.setItem("user", JSON.stringify({ ...profileData, token }));

      // Step 5: Navigate to last visited or home
      const lastVisitedPage = localStorage.getItem("lastVisitedPage") || "/";
      navigate(lastVisitedPage);
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || error.message || "An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back 👋</h2>
        <p className="subtext">Login to continue shopping</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="signup-link">
          Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;