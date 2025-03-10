import React from "react";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  DollarOutlined,
  StarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const SellerSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    navigate("/seller/login");
  };

  return (
    <Sider width={250} style={{ minHeight: "100vh", background: "#fff" }}>
      <Menu mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/seller/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
          <Link to="/seller/products">Manage Products</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ProfileOutlined />}>
          <Link to="/seller/orders">Manage Orders</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<DollarOutlined />}>
          <Link to="/seller/earnings">Earnings</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<StarOutlined />}>
          <Link to="/seller/reviews">Customer Reviews</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SellerSidebar;
