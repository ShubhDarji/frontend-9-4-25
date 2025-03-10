import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || user.role !== "admin" || !token) {
      setMessage("Access Denied: Admins only.");
      navigate("/admin-login");
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("🔹 API Response:", res.data);

      if (res.data) {
        setUsers(res.data.users || []);
        setSellers(res.data.sellers || []);
        setAdmins(res.data.admins || []);
      }
    } catch (error) {
      console.error("❌ Fetch users error:", error.response?.data || error.message);
      setMessage("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const approveSeller = async (userId) => {
    try {
      setProcessing(userId);
      const token = sessionStorage.getItem("adminToken");

      const res = await axios.put(
        `http://localhost:5000/api/admin/approve-seller/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSellers((prevSellers) =>
        prevSellers.map((seller) =>
          seller._id === userId ? { ...seller, isApproved: true } : seller
        )
      );

      setMessage(res.data.message || "Seller approved successfully!");
    } catch (error) {
      console.error("Approval error:", error.response?.data);
      setMessage("Failed to approve seller.");
    } finally {
      setProcessing(null);
    }
  };

  const deleteSeller = async (userId) => {
    try {
      setProcessing(userId);
      const token = sessionStorage.getItem("adminToken");

      const res = await axios.delete(
        `http://localhost:5000/api/admin/delete-seller/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSellers((prevSellers) =>
        prevSellers.filter((seller) => seller._id !== userId)
      );

      setMessage(res.data.message || "Seller deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error.response?.data);
      setMessage("Failed to delete seller.");
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {message && <p className="message">{message}</p>}

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <h3>Users</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>

          <h3>Sellers</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.length > 0 ? (
                sellers.map((seller) => (
                  <tr key={seller._id}>
                    <td>{seller.name}</td>
                    <td>{seller.email}</td>
                    <td>
                      {seller.isApproved ? "✅ Approved" : "⏳ Pending"}
                    </td>
                    <td>
                      {!seller.isApproved && (
                        <button
                          onClick={() => approveSeller(seller._id)}
                          className="approve-btn"
                          disabled={processing === seller._id}
                        >
                          {processing === seller._id ? "Processing..." : "Approve"}
                        </button>
                      )}
                      <button
                        onClick={() => deleteSeller(seller._id)}
                        className="delete-btn"
                        disabled={processing === seller._id}
                      >
                        {processing === seller._id ? "Processing..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No sellers found.</td>
                </tr>
              )}
            </tbody>
          </table>

          <h3>Admins</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <tr key={admin._id}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No admins found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
