import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  ShopOutlined,
  BoxPlotOutlined,
  FileTextOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();

  return (
    <Sider collapsible collapsed={collapsed} className="sidebar">
      <Menu theme="dark" mode="vertical" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<DashboardOutlined />} onClick={() => navigate("/admin-dashboard")}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />} onClick={() => navigate("/admin-dashboard/users")}>
          Users
        </Menu.Item>
        <Menu.Item key="3" icon={<ShopOutlined />} onClick={() => navigate("/admin-dashboard/sellers")}>
          Sellers
        </Menu.Item>
        <Menu.Item key="4" icon={<BoxPlotOutlined />} onClick={() => navigate("/admin-dashboard/products")}>
          Products
        </Menu.Item>
        <Menu.Item key="5" icon={<FileTextOutlined />} onClick={() => navigate("/admin-dashboard/order")}>
          Orders
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;