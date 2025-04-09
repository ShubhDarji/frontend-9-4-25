import React, { useEffect, useState, useRef } from "react";
import { Layout, Table, Button, message, Space, Tag, Input, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  SearchOutlined,
  BarChartOutlined,
  MoonOutlined,
  SunOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import Sidebar from "./sidebar";

import StatsCard from "./StatsCard";
import "./AdminDashboard.css"; // Import styles

const { Content } = Layout;

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dashboardRef = useRef(null);
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin/login");
      return;
    }
    fetchAllData();
    gsap.fromTo(dashboardRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
  }, [navigate, adminToken]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${adminToken}` };

      const [usersRes, sellersRes, productsRes, ordersRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/users", { headers }),
        axios.get("http://localhost:5000/api/admin/sellers", { headers }),
        axios.get("http://localhost:5000/api/admin/products", { headers }),
        axios.get("http://localhost:5000/api/orders/admin", { headers }),
      ]);

      setUsers(usersRes.data);
      setSellers(sellersRes.data);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      message.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      message.success("User deleted successfully");
      fetchAllData();
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <Layout className={darkMode ? "dashboard dark-mode" : "dashboard"} ref={dashboardRef}>
      {/* Sidebar with collapse toggle */}
      <Sidebar collapsed={collapsed} />

      <Layout className={collapsed ? "collapsed-content" : "main-content"}>


        <Content className="dashboard-content">
          <div className="top-controls">
            <Button type="text" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Switch
              checked={darkMode}
              className="dark-mode-switch"
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>

          {/* ✅ Stats Cards */}
          <div className="stats-container">
            <StatsCard title="Users" count={users.length} icon={<BarChartOutlined />} />
            <StatsCard title="Sellers" count={sellers.length} icon={<BarChartOutlined />} />
            <StatsCard title="Products" count={products.length} icon={<BarChartOutlined />} />
            <StatsCard title="Orders" count={orders.length} icon={<BarChartOutlined />} />
          </div>

          {/* ✅ Search Bar */}
          <div className="dashboard-controls">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search users, sellers..."
              className="search-bar"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* ✅ Users Table */}
          <Table
            dataSource={users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))}
            columns={[
              { title: "Name", dataIndex: "name" },
              { title: "Email", dataIndex: "email" },
              { title: "Role", dataIndex: "role" },
              {
                title: "Actions",
                render: (_, record) => (
                  <Button icon={<DeleteOutlined />} danger onClick={() => deleteUser(record._id)}>
                    Delete
                  </Button>
                ),
              },
            ]}
            rowKey="_id"
            loading={loading}
            pagination={{ pageSize: 5 }}
            bordered
          />

          {/* ✅ Sellers Table */}
          <Table
            dataSource={sellers.filter(seller => seller.name.toLowerCase().includes(search.toLowerCase()))}
            columns={[
              { title: "Name", dataIndex: "name" },
              { title: "Email", dataIndex: "email" },
              {
                title: "Status",
                render: (_, record) =>
                  record.isApproved ? <Tag color="green">Approved</Tag> : <Tag color="red">Pending</Tag>,
              },
              {
                title: "Actions",
                render: (_, record) => (
                  <Space>
                    {!record.isApproved && (
                      <Button icon={<CheckOutlined />} type="primary">
                        Approve
                      </Button>
                    )}
                    <Button icon={<CloseOutlined />} danger>
                      Reject
                    </Button>
                  </Space>
                ),
              },
            ]}
            rowKey="_id"
            loading={loading}
            pagination={{ pageSize: 5 }}
            bordered
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;