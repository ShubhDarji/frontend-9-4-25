import React from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined, ShoppingOutlined, OrderedListOutlined, DollarOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const SellerSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    navigate("/seller/login");
  };

  return (
    <Sider collapsible style={{ height: "100vh", background: "#001529" }}>
      <Menu theme="dark" mode="vertical" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<DashboardOutlined />} onClick={() => navigate("/seller/dashboard")}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingOutlined />} onClick={() => navigate("/seller/products")}>
          Manage Products
        </Menu.Item>
        <Menu.Item key="3" icon={<OrderedListOutlined />} onClick={() => navigate("/seller/orders")}>
          Manage Orders
        </Menu.Item>
        <Menu.Item key="4" icon={<DollarOutlined />} onClick={() => navigate("/seller/earnings")}>
          Earnings
        </Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SellerSidebar;
