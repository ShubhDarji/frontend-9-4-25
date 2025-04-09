import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchUserProfile();
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data) {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      toast.error("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication error. Please log in again.");
      return;
    }
  
    // Require profile picture if not already uploaded
    if (!user.profilePic && !selectedFile) {
      toast.error("Please upload a profile picture.");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", user.name || "");
    formData.append("phone", user.phone || "");
    formData.append("gender", user.gender || "");
    formData.append("address", user.address || "");
    formData.append("bio", user.bio || "");
    formData.append("dob", user.dob || "");
  
    // Attach new file only if selected
    if (selectedFile) {
      formData.append("profilePicture", selectedFile);
    }
  
    try {
      const res = await axios.put("http://localhost:5000/api/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast.success(res.data.message || "Profile updated successfully!");
      fetchUserProfile();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="profile-container">
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className="profile-card">
          <h2>Your Profile</h2>

          <form onSubmit={updateProfile}>
            <div className="form-group">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="profile-image" />
              ) : user.profilePic ? (
                <img
                  src={`http://localhost:5000${user.profilePic}`}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <p>No Profile Picture</p>
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="form-group">
              <label>Full Name:</label>
              <input type="text" name="name" value={user.name || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={user.email || ""} disabled />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input type="text" name="phone" value={user.phone || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={user.dob ? user.dob.split("T")[0] : ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Gender:</label>
              <select name="gender" value={user.gender || ""} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Address:</label>
              <input type="text" name="address" value={user.address || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Bio:</label>
              <textarea name="bio" value={user.bio || ""} onChange={handleChange}></textarea>
            </div>

            <button className="btn" type="submit">
              Update Profile
            </button>
          </form>
        </div>
      ) : (
        <p>Error loading profile. Please try again.</p>
      )}
    </div>
  );
};

export default Profile;