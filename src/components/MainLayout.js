import React, { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  AiOutlineDashboard,
  AiOutlineMenu,
  AiOutlineLogout,
} from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { FaClipboardList, FaPlus, FaListAlt } from "react-icons/fa";
import "./MainLayout.css";

const { Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    navigate("/admin");
  };

  useEffect(() => {
    // Page transition animation
    gsap.fromTo(
      ".content",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [location.pathname]);

  return (
    <Layout>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={200}
        className="glass-sidebar"
      >
        <div className="sidebar-header">
          <Button
            type="text"
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            <AiOutlineMenu className="toggle-icon" />
          </Button>
        </div>

        {/* Sidebar Menu */}
        <Menu mode="vertical" defaultSelectedKeys={["dashboard"]} className="glass-menu">
          <Menu.Item key="dashboard" icon={<AiOutlineDashboard />}>
            <Link to="/admin/dashboard">{collapsed ? "" : "Dashboard"}</Link>
          </Menu.Item>
          <Menu.Item key="customers" icon={<HiOutlineUsers />}>
            <Link to="/admin/customers">{collapsed ? "" : "Customers"}</Link>
          </Menu.Item>
          <Menu.Item key="add-product" icon={<FaPlus />}>
            <Link to="/admin/add-product">{collapsed ? "" : "Add Product"}</Link>
          </Menu.Item>
          <Menu.Item key="product-list" icon={<FaListAlt />}>
            <Link to="/admin/product-list">{collapsed ? "" : "Product List"}</Link>
          </Menu.Item>
          <Menu.Item key="orders" icon={<FaClipboardList />}>
            <Link to="/admin/orders">{collapsed ? "" : "Orders"}</Link>
          </Menu.Item>
        </Menu>

        {/* Sign Out Button */}
        <div className="sign-out">
          <Button type="text" onClick={handleSignOut}>
            <AiOutlineLogout />
            <span>{collapsed ? "" : "Sign Out"}</span>
          </Button>
        </div>
      </Sider>

      {/* Main Content */}
      <Layout>
        <motion.div
          key={location.pathname} // Unique key to trigger animation on route change
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="content"
        >
          <Outlet />
        </motion.div>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
